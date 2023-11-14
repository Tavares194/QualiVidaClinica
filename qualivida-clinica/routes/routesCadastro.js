import express from "express";
import { getPage, cadastroUsuario } from "../controllers/cadastroController.js";

const routes = express.Router();

routes.get('/cadastro', getPage)

routes.post("/cadastro", cadastroUsuario);

// routes.put("/:id", updateUsuarios);

// routes.delete("/:id", deleteUsuarios);

export default routes;