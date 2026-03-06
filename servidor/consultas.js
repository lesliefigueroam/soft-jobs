import { pool } from "./db.js";

export const registrarUsuario = async (email, password, rol, lenguage) => {
  const query = {
    text: "INSERT INTO usuarios (email,password,rol,lenguage) VALUES ($1,$2,$3,$4)",
    values: [email, password, rol, lenguage],
  };
  await pool.query(query);
};

export const obtenerUsuario = async (email) => {
  const query = {
    text: "SELECT * FROM usuarios WHERE email = $1",
    values: [email],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};