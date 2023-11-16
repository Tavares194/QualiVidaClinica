import express from "express";
import { getPage, loginUsuario } from "../controllers/loginController.js";
import { checkLoggedIn } from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get('/login', checkLoggedIn, getPage)

routes.post("/login", loginUsuario);

export default routes;