import React from 'react';
 
 

const Billboards = (props) => {
  return (
    <div className="row">
  {props.billboards.map((billboard) => (
  <div className= "col-3">
     <div class="card" key={billboard.index}>
<img class="card-img-top toppp" src={billboard.url} alt=" img top"/>
 
    <div class= "card-body">
    <p className="texttt"><i class="fa-solid fa-location-dot"></i> {billboard.location}</p>
    <p class="texttt"> {billboard.description}</p>
    <p class="texttt">Billboard Size: {billboard.size}</p>
    <p class="texttt">Billboard Price: {billboard.price / 1000000000000000000}cUSD</p>
    </div>
    <div>
       <small><button type="button" class="btn btn-outline-dark" onClick={() => props.buyBillboard(billboard.index)}>Buy Billboard</button></small>
<small><button type="button" class="btn btn-outline-danger" onClick={() => props.removeBillboard(billboard.index)}>Remove Billboard</button></small>
    </div>
  </div>
</div>

   
       
       
       



     ))};


  </div>
   


  )

     }
    
  export default Billboards;