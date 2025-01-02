import React from "react";

const AddToCartButton = ({ product, addToCart }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <button
        onClick={(e) => {
          e.stopPropagation(); // Evita la propagación del clic
          addToCart(product);
        }}
        className="mt-4 bg-[#00004d] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#000033] transition duration-300"
      >
        🛒
      </button>
    </div>
  );
};

export default AddToCartButton;
