export const verifyAdmin = (req, res, next) => {
  const { rol } = req.user; // El rol viene del token JWT decodificado

  if (rol !== "admin") {
    return res
      .status(403)
      .json({ error: "Acceso denegado. Solo administradores" });
  }

  next();
};
