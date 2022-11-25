import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import BookingModal from '../BookingModal/BookingModal'
import ProductCard from './ProductCard'


const Categories = () => {

  const data = useLoaderData()
  console.log(data[0].name);
  

  const[product,setProduct] = useState([])
 

  const {data:products = [],isLoading} = useQuery({
    queryKey:['products'],
    queryFn: ()=> fetch(`http://localhost:5000/category/${data[0]?.name}`)
    .then(res => res.json())
    
  })
  console.log(products)
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {
        products.map(product => <ProductCard key={product._id} product={product} setProduct={setProduct}/>)
      }
    </div>

    {
      product &&
      
      <BookingModal product={product}/>
      
      }
    </>
  )
}

export default Categories