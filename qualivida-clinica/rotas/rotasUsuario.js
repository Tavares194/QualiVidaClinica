import express from "express";
import { selectUsuarios, insertUsuarios, updateUsuarios, deleteUsuarios, loginUsuario } from "../controllers/userController.js";

const rotas = express.Router();

rotas.get("/", loginUsuario);

rotas.post("/", insertUsuarios);

rotas.put("/:id", updateUsuarios);

rotas.delete("/:id", deleteUsuarios);

export default rotas;