import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token con tu clave secreta
    req.user = decoded; // Agregar los datos del usuario al request
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export default authMiddleware;
