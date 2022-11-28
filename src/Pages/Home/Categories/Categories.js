import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Loading from '../../Shared/Loading/Loading'
import BookingModal from '../BookingModal/BookingModal'
import ProductCard from './ProductCard'


const Categories = () => {
  const data = useLoaderData()
  const[product,setProduct] = useState(null)
 

  const {data:products = [],isLoading,refetch} = useQuery({
    queryKey:['products'],
    queryFn: ()=> fetch(`https://assignment-12-final-server.vercel.app/category/${data[0]?.name}`)
    .then(res => res.json())
    
  })
  if(isLoading){
    return <Loading/>
  }
  // console.log(products)
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {
        products.map(product => 
          
        <ProductCard key={product._id} product={product}
         setProduct={setProduct}/>
         )
      }
    </div>

    {
      product &&
      
      <BookingModal product={product} setProduct={setProduct}/>
      
      }
    </>
  )
}

export default Categories