import React from "react";
import { GiShoppingCart } from "react-icons/gi";

const AddToCartButton = ({ product, addToCart }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Evita la propagación del clic
        addToCart(product);
      }}
      className="bg-[#00004d] text-white font-semibold py-2 px-8 rounded-md shadow-md hover:bg-[#000088] transition duration-300 hover:scale-105 active:scale-95"
    >
      <GiShoppingCart /> 
    </button>
  );
};

export default AddToCartButton;
