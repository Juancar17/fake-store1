import React from "react";

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto mt-8 px-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart 🛒</h2>
      {cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-500">
                  ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <h3 className="text-xl font-bold text-right">
            Total: ${total.toFixed(2)}
          </h3>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
