import { useQuery } from "@tanstack/react-query";
import React from "react";
import AdvertizeCard from "./AdvertizeCard";

const Advertize = () => {
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/product", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {}
    },
  });
  console.log(products);

  return (
    <>
    <h2 className="text-center font-bold text-5xl mt-[70px] mb-[70px] underline">Advertize</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
      {products?.map((product) => {
        return product?.advertize === "advertize" && product?.paid !== true &&
        <div className='mt-10'>
        
            
          <div className="card  shadow-xl">
            <figure>
              <img src={product.img} className="w-72 h-48"  alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Product Name: {product.name}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <h2 className="card-title">
                Seller Name: {product.sellerName}
                
              </h2>
              <p>{product.description}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  {product.conditions}
                </div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        
        
    </div> 
        

      })}
    </div>
    </>
    
  );
};

export default Advertize;
