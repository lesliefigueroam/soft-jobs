import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";


import { registrarUsuario, obtenerUsuario } from "./consultas.js";
import { logger, verificarCredenciales, verificarToken } from "./middlewares.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

app.listen(3000, () => console.log("Servidor ON"));

/* REGISTRO */
app.post("/usuarios", verificarCredenciales, async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    const passwordEncriptada = bcrypt.hashSync(password);

    await registrarUsuario(email, passwordEncriptada, rol, lenguage);

    res.send("Usuario registrado");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* LOGIN */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const usuario = await obtenerUsuario(email)

    if (!usuario) {
      return res.status(404).send("Usuario no existe")
    }

    const passwordValida = bcrypt.compareSync(password, usuario.password)

    if (!passwordValida) {
      return res.status(401).send("Contraseña incorrecta")
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET)

    res.send({ token })

  } catch (error) {
    res.status(500).send(error.message)
  }
})

/* OBTENER USUARIO */
app.get("/usuarios", verificarToken, async (req, res) => {
  try {
 

    const usuario = await obtenerUsuario(req.email)
  

  
    res.send({
      email: usuario.email,
      rol: usuario.rol,
      lenguage: usuario.lenguage
    })

  } catch (error) {
    res.status(500).send(error.message)
  }
})