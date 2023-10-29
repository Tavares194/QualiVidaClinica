import express from "express";
import { getPage, loginUsuario } from "../controllers/loginController.js";

const routes = express.Router();

routes.get('/login', getPage)

routes.post("/login", loginUsuario);

// routes.put("/:id", updateUsuarios);

// routes.delete("/:id", deleteUsuarios);

export default routes;