import jwt from "jsonwebtoken";

export const logger = (req, res, next) => {
  console.log(`
  Fecha: ${new Date()}
  Ruta: ${req.url}
  Método: ${req.method}
  `);
  next();
};

export const verificarCredenciales = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email y password obligatorios");
  }

  next();
};

export const verificarToken = (req, res, next) => {
  const Authorization = req.header("Authorization");

  if (!Authorization) {
    return res.status(401).send("Token no enviado");
  }

  const token = Authorization.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (error) {
    res.status(401).send("Token inválido");
  }
};