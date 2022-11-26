import React, { useContext } from "react";
// import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";


const BookingModal = ({product,setProduct}) => {
    const {name,resellPrice} = product

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
            user:name,
            email,
            phone,
            location,
            price:product.resellPrice
        }

        console.log(booking);
        fetch("http://localhost:5000/bookings",{
      method:"POST",
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify(booking)
      
    })
    .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if(data.acknowledged){
          setProduct(null)
        //   refetch();
         
        // }
        // else{
        //   toast.error(data.message)
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
          <input type="text" placeholder="Type here" disabled value={resellPrice} className="input w-full input-bordered" />
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
