import React from 'react'
import Advertize from '../Advertize/Advertize'
import Bannar from '../Bannar/Bannar'
import Discount from '../Discount/Discount'
import InfoCards from '../InfoCards/InfoCards'

const Home = () => {
  return (
    <div className='mx-5'>
      <Bannar/>
      <InfoCards/>
      <Advertize/>
      <Discount/>
    </div>
  )
}

export default Home