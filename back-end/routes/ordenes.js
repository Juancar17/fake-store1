import express from "express";
import db from "../config/db.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, (req, res) => {
  const { usuario_id, total } = req.body;

  const query = "INSERT INTO ordenes (usuario_id, total) VALUES (?, ?)";
  db.query(query, [usuario_id, total], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear la orden" });
    }

    res.status(201).json({ success: "Orden creada", id: result.insertId });
  });
});

router.get("/usuario/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM ordenes WHERE usuario_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener las órdenes" });
    }

    res.status(200).json(results);
  });
});

export default router;
