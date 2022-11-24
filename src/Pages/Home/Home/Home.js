import React from 'react'
import Bannar from '../Bannar/Bannar'
import Discount from '../Discount/Discount'
import InfoCards from '../InfoCards/InfoCards'

const Home = () => {
  return (
    <div className='mx-5'>
      <Bannar/>
      <InfoCards/>
      <Discount/>
    </div>
  )
}

export default Home