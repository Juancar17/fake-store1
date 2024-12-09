import React from "react";

const AddToCartButton = ({ product, addToCart }) => {
  if (!addToCart) {
    console.error("addToCart no se ha pasado correctamente al botón");
    return null;
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Evita que el clic propague a otros eventos
        addToCart(product); // Llama a la función con el producto
      }}
      className="bg-[#00004d] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#000033] transition duration-300 hover:scale-105 active:scale-95"
    >
      Add to Cart 🛒
    </button>
  );
};

export default AddToCartButton;
