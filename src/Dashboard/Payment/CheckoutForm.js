import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'

const CheckoutForm = ({booking}) => {
    const [cardError,setCardError] = useState("");
    const [success,setSuccess] = useState("");
    const [processing,setProcessing] = useState(false);
    const [transactionId,setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
const elements = useElements();

const {price,user,email,_id,productID} = booking;

useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://assignment-12-final-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
      authorization: `bearer ${localStorage.getItem("accessToken")}`
    },
      body: JSON.stringify({price}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

const handleSubmit = async(event) =>{
        event.preventDefault();

        if (!stripe || !elements) {
            return;
          }

          const card = elements.getElement(CardElement);
          if (card == null) {
            return;
          }

          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          if (error) {
            // console.log( error); 
            setCardError(error.message);
          }
          else{
            setCardError("");
          }

          setSuccess("")
          setProcessing(true)

          const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user,
                  email:email
                },
              },
            },
          );

          if(confirmError){
            setCardError(confirmError.message);
            return
          }
        //   console.log(paymentIntent);
          if(paymentIntent.status === "succeeded"){
            
            

            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id,
                productID:productID
            }

            fetch("https://assignment-12-final-server.vercel.app/payments",{
              method:"POST",
              headers:{
                "content-type":"application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if(data.insertedId){
                setSuccess("Completed payment compleated")
                setTransactionId(paymentIntent.id)
              }
            })

          }

          setProcessing(false)


    }
  return (
    <>
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
            //   color: '#9e2146',
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" 
      className='btn btn-black btn-sm mt-[60px] rounded'
       disabled={!stripe || !clientSecret || processing}>
        Pay
      </button>
    </form>

    <p className="text-red-500 mt-8">{cardError}</p>

    {
    success && 
    <div>
        <p className='text-green-500'>{success}</p>
        <p className='font-bold'>Your Transasction id: {transactionId}</p>
    </div>
  }
    </>
  )
}

export default CheckoutForm