import React from 'react'

import { useState } from "react";


const Newbillboards = (props) => {


 const [url, setUrl] = useState('');
 const [location, setLocation] = useState('');
 const [description, setDescription] = useState('');
 const [size, setSize] = useState('');
 const [price, setPrice] = useState('');
  
 const submitHandler = (e) => {
  e.preventDefault();

  if(!url || !location || !description || !size || !price  ) {
    alert('Please fill up all fields')
    return
  }
  props.addBillboard(url, location, description, size, price);

  setUrl('')
  setLocation('')
  setDescription('')
  setSize('')
  setPrice('')
  
  

   
};

return (
  <div className="container mt-3">
  <form onSubmit={submitHandler}>
    <div className="row">
      <div class="col">
        <input type="text" className="form-control" placeholder="Enter image url" name="Billboard Url" value={url}
               onChange={(e) => setUrl(e.target.value)}/>
         
      </div>
      <div class="col">
        <input type="location" className="form-control" placeholder="Enter location" name="location"  value={location}
               onChange={(e) => setLocation(e.target.value)}/>
        
      </div>
      <div class="col">
      <input type="description" className="form-control" placeholder="Enter descriptiion" name="description"  value={description}
               onChange={(e) => setDescription(e.target.value)}/>
      
    </div>
    <div class="col">
      <input type="size" className="form-control" placeholder="Enter size" name="size"  value={size}
               onChange={(e) => setSize(e.target.value)}/>
      
    </div>
    <div class="col">
      <input type="price" className="form-control" placeholder="Enter price" name="price" value={price}
               onChange={(e) => setPrice(e.target.value)}/>
       
    </div>
    </div>
    <button type="submit" className="btn btn-outline-success bot">Add Billboard</button>
  </form>
</div>
   
   
               
        )
    }
    export default Newbillboards;

  
 
