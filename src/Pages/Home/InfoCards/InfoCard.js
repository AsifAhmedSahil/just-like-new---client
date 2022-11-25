import React from "react";
import { Link } from "react-router-dom";

const InfoCard = ({card}) => {
    const {_id,name,brand,img} = card;
    console.log(brand)
  return (
    <div className="mt-9">
        
      <div className="card card-compact  shadow-xl">
        <figure>
          <img src={img} sizes="" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Brand: {brand}</h2>
          
          <div className="card-actions justify-end">
            <Link to={`/category/${brand}`}><button className="btn btn-primary">Explore</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
