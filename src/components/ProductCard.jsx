import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product, addToCart, onProductClick }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between h-[420px] cursor-pointer hover:shadow-2xl transition duration-300"
      onClick={onProductClick}
    >
      {/* Imagen */}
      <div className="h-40 w-full flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Información */}
      <div className="flex-1 text-center mt-4">
        <h2 className="font-bold text-gray-800 text-lg line-clamp-2">
          {product.title}
        </h2>
        <p className="text-green-600 font-bold mt-2">${product.price}</p>
      </div>

      {/* Botón Add to Cart */}
      <div className="mt-4 flex justify-center">
        <AddToCartButton product={product} addToCart={addToCart} />
      </div>
    </div>
  );
};

export default ProductCard;
