import React from "react";

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart 🛒</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <span>
                {item.title} - ${item.price} x {item.quantity}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
      <div className="text-right mt-4">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Cart;
