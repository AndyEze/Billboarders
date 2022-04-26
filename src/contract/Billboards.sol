 // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


interface IERC20Token {
   function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
 
 
contract  TheBillboard {
    
    
    uint public billboardsLength = 0;
    address internal cUsdTokenAddress = 
    0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Billboard {
        address payable owner;
        string url;
        string location;
       string description;
        uint size;
         uint price;
        uint sold;
    }

    // replacing the require with modifier for less code
    modifier checkOwner(uint _index) {
        require (msg.sender == billboards[_index].owner, "Only creator can perform this action");
        _;
    }

    mapping (uint =>  Billboard) internal billboards;

// events triggered with specific function
    event billboardAdded(address indexed sender, uint index);
    event BoughtBillboard(address indexed buyer, address seller, uint price);
    event BillboardRefurbished(address indexed owner, uint index, string url);
    event BillboardRemoved(address indexed owner, uint index);

//  function use to set billboard
    function  addBillboard(
        string memory _url, 
        string memory _location,
         string memory _description,
         uint _size,
        uint _price
    ) public {
         uint _sold = 0;

         billboards [billboardsLength] =  Billboard(
            payable(msg.sender),
            _url,
            _location,
            _description,
             _size,
            _price,
             _sold
        );
        emit billboardAdded(msg.sender, billboardsLength);
        billboardsLength++;
    }
   
    // returns billboards by index
    function getBillboard(uint _index) public view returns (
        address payable,
        string memory,  
        string memory,
        string memory,
        uint,
        uint,
        uint
      
    ) {
        return (  
            billboards[_index].owner,
             billboards[_index].url, 
             billboards[_index].location,
            billboards[_index].description,
             billboards[_index].size,
             billboards[_index].price,
             billboards[_index].sold
        );
    }

    function removeBillboard(uint _index) public checkOwner(_index) {
        delete(billboards[_index]);
        emit BillboardRemoved(msg.sender, _index);
    }

    function refurbish_Billboardurl(uint _index, string memory _url) public checkOwner(_index) {
        billboards[_index].url = _url;
        emit BillboardRefurbished(msg.sender, _index, _url);
    }

// this function is used to buy Billboard
    function buyBillboard(uint _index) public payable {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            billboards[_index].owner,
            billboards[_index].price
          ),
          "Transfer failed."
        );
        emit BoughtBillboard(msg.sender, billboards[_index].owner, billboards[_index].price);
        billboards[_index].owner = payable(msg.sender);
    }

    //  this function returns the total number of billboardss
    function getbillboardsLength() public view returns (uint) {
        return (billboardsLength);
    }
}
