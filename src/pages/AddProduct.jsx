import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No se encontró el token en localStorage");
  } else {
    console.log("Token encontrado:", token); // Verifica el token antes de enviarlo
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/productos",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token del administrador
          },
        }
      );
      setMessage("Producto agregado con éxito");
      console.log("Respuesta del servidor:", response.data);

      // Resetear formulario
      setProduct({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoria: "",
        imagen: "",
      });
    } catch (error) {
      console.error(
        "Error al agregar producto:",
        error.response?.data || error
      );
      setError(
        error.response?.data?.error ||
          "Error al agregar producto. Inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#4d79ff]">
      <motion.div
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Añadir Producto
        </h2>
        {message && (
          <motion.p
            className="text-green-500 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}
        {error && (
          <motion.p
            className="text-red-500 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del producto"
              value={product.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              placeholder="Descripción del producto"
              value={product.descripcion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio
              </label>
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={product.precio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <input
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={product.categoria}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Imagen
            </label>
            <input
              type="text"
              name="imagen"
              placeholder="URL de la imagen"
              value={product.imagen}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Añadir Producto
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
