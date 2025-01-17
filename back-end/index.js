import cors from "cors"; // Importar cors
import dotenv from "dotenv";
import express from "express";
import productosRoutes from "./routes/productos.js";
import usuariosRoutes from "./routes/usuarios.js";

dotenv.config(); // Configurar dotenv

const app = express(); // Declara app solo una vez
const PORT = 5000;

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Habilitar JSON en las solicitudes

// Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/productos", productosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
