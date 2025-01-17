import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/productos");
        setProducts(response.data);
      } catch (error) {
        console.error(
          "Error al obtener productos:",
          error.response?.data || error
        );
        setError("No se pudieron cargar los productos.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#4d79ff] p-8">
      <motion.h2
        className="text-4xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Lista de Productos
      </motion.h2>

      {error && (
        <motion.p
          className="text-red-400 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.imagen && (
              <img
                src={product.imagen}
                alt={product.nombre}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4 flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.nombre}
              </h3>
              <p className="text-gray-600">{product.descripcion}</p>
              <p className="text-gray-800 font-bold">
                Precio: ${product.precio}
              </p>
              <p className="text-gray-600">Stock: {product.stock}</p>
              <p className="text-gray-600">Categoría: {product.categoria}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductList;
