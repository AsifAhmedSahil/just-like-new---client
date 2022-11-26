import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import Loading from '../../Pages/Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation()
    console.log(booking);

    if(navigation.state === "loading"){
        return <Loading/>
    }
  return (
    <div>
        <h3 className='text-4xl'>Payment For {booking.product}</h3>
        <h3 className='text-3xl'>Please Pay ৳{booking.price} For Your Purchase</h3>
        <div className='w-96 my-10 bg-yellow-600 text-black p-6 rounded h-[160px]'>
        <Elements stripe={stripePromise}>
      <CheckoutForm booking={booking} />
    </Elements>
        </div>
    </div>
  )
}

export default Payment