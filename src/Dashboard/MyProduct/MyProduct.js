import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Loading from "../../Pages/Shared/Loading/Loading";

const MyProduct = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const {
    data: products,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products?email=${user.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {}
    },
  });

  //   if(isLoading){
  //     return <Loading/>
  //   }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products?.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-xl">
                        <img src={product.img} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.email}</td>
                  <td>
                    <button className="btn btn-error btn-sm rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
