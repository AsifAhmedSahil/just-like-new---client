import React from "react";
import InfoCard from "./InfoCard";
import hp from "../../../assets/hp3.jpg";
import asus from "../../../assets/asus.jpg";
import dell from "../../../assets/dell.jpg";

const InfoCards = () => {
  const cardData = [
    {
      _id: 1,
      brand: "Hp",
      img: hp,
      products:{
        id:1,
        name:"Sahil hp"
      }
    },
    {
      _id: 2,
      brand: "Dell",
      img: dell,
      products:{
        id:1,
        name:"Sahil hp"
      }
    },
    {
      _id: 3,
      brand: "Asus",
      img: asus,
      products:{
        id:1,
        name:"Sahil hp"
      }
    },
  ];
  return (
    <>
    <h2 className="text-5xl mt-10 font-bold text-center">Categories</h2>
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
     "
    >
      {cardData.map((card) => (
        <InfoCard key={card._id} card={card}></InfoCard>
      ))}
    </div>
    </>
  );
};

export default InfoCards;
