import React, { useContext } from "react";
import { toast, useToast } from "react-toastify";
// import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";


const BookingModal = ({product,setProduct,refetch}) => {
    const {name,resellPrice,img,_id} = product

    const {user} = useContext(AuthContext)

    const handleBooking = event =>{
        event.preventDefault()
        const form = event.target;
        const name = form.name.value
        const email = form.email.value
        const phone = form.phone.value
        const location = form.location.value

        const booking = {
            product:product.name,
            productID:product._id,
            user:name,
            email,
            phone,
            location,
            img:product.img,
            price:product.resellPrice
        }

        console.log(booking);
        fetch("https://assignment-12-final-server.vercel.app/bookings",{
      method:"POST",
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify(booking)
      
      
    })
    .then(res => res.json())
      .then(data => {
        // console.log("from booking modal",data);
        
        if(data.acknowledged){
          setProduct(null)
          // refetch();
          toast.success("booking Successfull")
         
        // }
        // else{
         
          
        }
      })
        
    }
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            {name}
          </h3>

          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-5 mt-10">
          <input type="text" placeholder="Type here" disabled value={name} className="input w-full input-bordered" />
          <input type="text" placeholder="Type here" disabled value={_id} className="input w-full input-bordered" />
          <input type="text" placeholder="Type here" disabled value={resellPrice} className="input w-full input-bordered" />
          <input type="text" placeholder="Type here" disabled value={img} className="input w-full input-bordered" />
          <input name="name" type="text" placeholder="name" defaultValue={user?.displayName} disabled  className="input w-full input-bordered" />
          <input name="email" type="text" placeholder="Email" defaultValue={user?.email} disabled  className="input w-full input-bordered" />
          <input name="phone" type="text" placeholder="Phone" className="input w-full input-bordered" />
          <input name="location" type="text" placeholder="Your Location" className="input w-full input-bordered" />
          <br />
          <input className="btn w-full btn-primary" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
