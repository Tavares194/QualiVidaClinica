import express from "express";
import { getPage } from "../controllers/especialidadeController.js";

const routes = express.Router();

routes.get('/especialidade', getPage)

export default routes;