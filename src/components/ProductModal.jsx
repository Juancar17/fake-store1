import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductModal = ({ product, onClose, addToCart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain mb-4"
        />
        <p className="text-gray-600">{product.description}</p>
        <p className="text-green-600 font-bold text-lg mt-2">
          ${product.price}
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <AddToCartButton product={product} addToCart={addToCart} />
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
