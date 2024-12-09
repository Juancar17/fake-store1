import React from "react";

const CartModal = ({ cart, closeCart, increaseQuantity, decreaseQuantity }) => {
  // Calcular el total de precio del carrito
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Your Cart 🛒</h2>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                     <div className="h-40 w-full flex items-center justify-center">
                        <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full object-contain"
                        />
                    </div>


                  <div className="flex flex-col">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {/* Botón para disminuir */}
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-400"
                    >
                      −
                    </button>
                    {/* Cantidad */}
                    <span className="font-semibold">{item.quantity}</span>
                    {/* Botón para aumentar */}
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mostrar el total de precio */}
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-lg text-green-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Your cart is empty!</p>
        )}

        {/* Botón de cerrar */}
        <button
          onClick={closeCart}
          className="mt-4 bg-[#00004d] text-white py-2 px-4 rounded-md hover:bg-[#000033] transition duration-300 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
