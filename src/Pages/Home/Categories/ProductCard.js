import React from "react";

const ProductCard = ({ product,setProduct }) => {
  const {name,img,OriginalPrice,resellPrice,location,uses} = product;
  return (
    <div>
      <div className="card shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={img}
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Brand: {name}</h2>
          <p>Original Price: {OriginalPrice}</p>
          <p>Resell Price: {resellPrice}</p>
          <p>Location: {location}</p>
          <p>Uses: {uses}</p>
          <div className="card-actions">
            
            <label htmlFor="booking-modal" 
            onClick={()=>setProduct(product)}
            className="btn btn-primary">Book Now</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
