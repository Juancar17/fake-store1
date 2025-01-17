import mysql from "mysql2";

const db = mysql.createConnection({
  host: "database-1.cbecuw4u0chc.eu-north-1.rds.amazonaws.com", // Reemplaza por tu host
  user: "admin", // Usuario de la base de datos
  password: "Katy0002!", // Contraseña configurada
  database: "tienda", // Nombre de la base de datos creada
  port: 3306, // Puerto predeterminado
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

export default db;
