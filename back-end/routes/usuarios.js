import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import { verifyToken } from "../middlewares/auth.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/roles.js";
const router = express.Router();

// Registrar usuario
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  // Validar datos
  if (!nombre || !email || (password && password.length < 6)) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos
    const query =
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
    db.query(query, [nombre, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al registrar usuario" });
      }
      res
        .status(201)
        .json({ success: "Usuario registrado", id: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Iniciar sesión
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son obligatorios" });
  }

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin }, // Información del usuario
      process.env.JWT_SECRET || "mi_clave_secreta", // Clave secreta
      { expiresIn: "1h" } // Tiempo de expiración
    );

    res.status(200).json({ success: "Inicio de sesión exitoso", token });
  });
});

router.get("/", verifyToken, verifyAdmin, (req, res) => {
  const query = "SELECT id, nombre, email, rol FROM usuarios";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }

    res.status(200).json(results);
  });
});

router.put("/perfil", authMiddleware, async (req, res) => {
  const { nombre, password } = req.body;
  const userId = req.user.id; // Obtenemos el ID del usuario autenticado desde el token

  try {
    // Lógica para actualizar los datos del usuario
    let updateFields = { nombre }; // Campos a actualizar
    if (password) {
      // Si el usuario proporciona una nueva contraseña, la encriptamos
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    // Construir la consulta SQL para actualizar el usuario
    const query = `
      UPDATE usuarios 
      SET nombre = ?, ${password ? "password = ?" : ""}
      WHERE id = ?
    `;

    // Valores para la consulta
    const values = password
      ? [updateFields.nombre, updateFields.password, userId]
      : [updateFields.nombre, userId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al actualizar el perfil:", err);
        return res.status(500).json({ error: "Error al actualizar el perfil" });
      }

      res.status(200).json({ message: "Perfil actualizado correctamente" });
    });
  } catch (err) {
    console.error("Error del servidor:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Actualizar un usuario
router.put("/:id", verifyToken, verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body; // Permitir que el admin cambie el rol

  const query =
    "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?";
  db.query(query, [nombre, email, rol, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar usuario" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ success: "Usuario actualizado" });
  });
});

// Eliminar un usuario
router.delete("/:id", verifyToken, verifyAdmin, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM usuarios WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ success: "Usuario eliminado" });
  });
});

router.get("/perfil", authMiddleware, (req, res) => {
  const user = {
    id: req.user.id, // Asumiendo que el middleware asigna el usuario al request
    nombre: req.user.nombre,
    email: req.user.email,
  };
  res.status(200).json(user);
});

export default router;
