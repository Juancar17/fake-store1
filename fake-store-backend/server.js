const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la Fake Store API Proxy! 🛍️");
});



// Ruta para obtener todos los productos desde la FakeStoreAPI
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).send({ message: "Error al obtener los productos" });
  }
});

// Ruta para obtener un producto específico
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error al obtener el producto ${id}:`, error.message);
    res.status(404).send({ message: "Producto no encontrado" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
