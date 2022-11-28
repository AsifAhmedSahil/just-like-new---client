import React from "react";
import user1 from "../../../assets/user1.jpg";
import user2 from "../../../assets/user2.jpg";
import user3 from "../../../assets/user3.jpg";

const Discount = () => {
  return (
<div className="mt-[70px] mb-[60px]">
  <h4 className="text-center font-bold text-4xl  ">User Satisfaction</h4>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
     <div className="card bg-red-300  shadow-xl">
      <div className="avatar flex justify-center items-center mt-6">
        <div className="w-24 rounded-full  mt-6">
          <img src={user1} alt="" />
        </div>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Asif Ahmed</h2>
        <p>Awesome Product !  🙂 </p>
      </div>
    </div>

<div className="card bg-green-300 shadow-xl">
<div className="avatar flex justify-center items-center mt-6">
  <div className="w-24 rounded-full  mt-6">
    <img src={user2} alt="" />
  </div>
</div>
<div className="card-body items-center text-center">
  <h2 className="card-title">Sanjana Akhter</h2>
  <p>Awesome Product ! 🎈  </p>
</div>
</div>

<div className="card bg-blue-300 shadow-xl ">
      <div className="avatar flex justify-center items-center mt-6">
        <div className="w-24 rounded-full mt-6">
          <img src={user3} alt="" />
        </div>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Sahil khan</h2>
        <p>Awesome Product ! 🍒  </p>
      </div>
    </div>
 </div>
</div>
  );
};

export default Discount;
