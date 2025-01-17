import express from "express";
import db from "../config/db.js";
import { verifyToken } from "../middlewares/auth.js"; // Middleware para verificar token
import { verifyAdmin } from "../middlewares/roles.js"; // Middleware para verificar administrador

const router = express.Router();

// Obtener todos los productos (ruta pública)
router.get("/", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error al obtener productos" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Obtener productos por categoría (ruta pública)
router.get("/categoria/:categoria", (req, res) => {
  const { categoria } = req.params;

  const query = "SELECT * FROM productos WHERE categoria = ?";
  db.query(query, [categoria], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al filtrar productos" });
    }

    res.status(200).json(results);
  });
});

// Filtrar productos por precio (ruta pública)
router.get("/precio", (req, res) => {
  const { min, max } = req.query;

  const query = "SELECT * FROM productos WHERE precio BETWEEN ? AND ?";
  db.query(query, [min, max], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al filtrar productos" });
    }

    res.status(200).json(results);
  });
});

// Agregar un producto (solo administradores)
router.post("/", verifyToken, verifyAdmin, (req, res) => {
  const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;

  const query =
    "INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [nombre, descripcion, precio, stock, imagen, categoria],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al agregar producto" });
      }

      res
        .status(201)
        .json({ success: "Producto agregado", id: result.insertId });
    }
  );
});

// Eliminar un producto (solo administradores)
router.delete("/:id", verifyToken, verifyAdmin, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM productos WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar producto" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({ success: "Producto eliminado" });
  });
});

export default router;
