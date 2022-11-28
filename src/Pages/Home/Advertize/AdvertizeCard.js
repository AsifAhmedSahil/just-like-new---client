import React from 'react'

const AdvertizeCard = ({product}) => {
    const {name,sellerName,location,email,resellPrice,OriginalPrice,img,status} = product
  return (
    // return product?.advertize === "advertize" &&
    <div className='mt-10'>
        
            
          <div className="card  shadow-xl">
            <figure>
              <img src={img} className="w-72 h-48"  alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Shoes!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        
        
    </div>
  )
}

export default AdvertizeCard