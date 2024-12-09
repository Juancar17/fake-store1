import React from "react";

const AddToCartButton = ({ product, addToCart }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Evita la propagación del clic
        addToCart(product);
      }}
      className="bg-[#00004d] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#000033] transition duration-300 hover:scale-105 active:scale-95"
    >
      Add to Cart 🛒
    </button>
  );
};

export default AddToCartButton;
