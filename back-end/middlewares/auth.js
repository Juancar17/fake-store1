export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Leer el token del header "Authorization"

  if (!authHeader) {
    console.error("Acceso denegado: no se proporcionó el token");
    return res.status(403).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1]; // Eliminar la palabra "Bearer"

  if (!token) {
    console.error("Acceso denegado: token no proporcionado");
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  console.log("Token recibido:", token); // Verificar qué token se está enviando

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "mi_clave_secreta" // Verificar el token
    );
    req.user = decoded; // Almacenar la información del usuario en la solicitud
    console.log("Token decodificado:", decoded); // Verificar los datos decodificados
    next(); // Continuar con la siguiente función
  } catch (err) {
    console.error("Error al verificar el token:", err.message);
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};
