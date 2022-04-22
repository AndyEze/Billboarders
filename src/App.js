import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";



import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import IERC from "./contract/IERC.abi.json";
import TheBillboard from  './contract/TheBillboard.abi.json';
import Billboards from './components/Billboards';
import Newbillboards from './components/Newbillboards';
 
 
 
 




const ERC20_DECIMALS = 18;


const contractAddress = "0x394b52D5E9BeDDE0354f0d0A38F662F5088Ec0F8";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";




function App() {

  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [billboards, setBillboards] = useState([]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
     console.log("Error Occurred");
     
    }
  };

  const getBalance = (async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const contract = new kit.web3.eth.Contract(TheBillboard, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  });

  
  const getBillboard = (async () => {
    const billboardsLength = await contract.methods.getbillboardsLength().call();
    const _billboardo = []
    for (let index = 0; index < billboardsLength; index++) {
      console.log(billboardsLength);
      let _billboards = new Promise(async (resolve, reject) => {
      let billboard = await contract.methods.getBillboard(index).call();

        resolve({
          index: index,
          owner: billboard[0],
          url: billboard[1],
          location: billboard[2],
          description: billboard[3],
          size: billboard[4],
         price: billboard[5],
           sold: billboard[6]
         
             
        });
      });
      _billboardo.push(_billboards);
    }

    const billboards = await Promise.all(_billboardo);
    setBillboards(billboards);
    console.log(billboards)
  });

  const addBillboard = async (
    _url,
    _location,
    _description,
    _size,
    price
  ) => {

    const _price = new BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods
        .addBillboard(_url, _location, _description, _size, _price)
        .send({ from: address });
       getBillboard();
    } catch (error) {
      console.log(error);
    }
  };

  const removeBillboard = async (_index) => {
    try {
      await contract.methods.removeBillboard(_index).send({ from: address });
      getBillboard();
      getBalance();
    } catch (error) {
      alert(error);
    }};

     
    const buyBillboard = async (_index,) => {
      try {
        const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
      
        
        await cUSDContract.methods
          .approve(contractAddress, billboards[_index].price)
          .send({ from: address });
        await contract.methods.buyBillboard(_index).send({ from: address });
        getBillboard();
        getBalance();
      } catch (error) {
        console.log(error)
      }};


    useEffect(() => {
      connectToWallet();
    }, []);
  
    useEffect(() => {
      if (kit && address) {
        getBalance();
       
      }
    }, [kit, address]);
  
    useEffect(() => {
      if (contract) {
        getBillboard();
      }
    }, [contract]);  

    return (
      <div>
        <Navbar balance = {cUSDBalance} />
        <Billboards billboards ={billboards}
        buyBillboard = {buyBillboard}
        removeBillboard= {removeBillboard}
         
        />
         <Newbillboards addBillboard = {addBillboard}
         
/>
      </div>
      )


}
export default App;
