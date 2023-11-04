import express from "express";
import { getPage } from "../controllers/homeController.js";

const routes = express.Router();

routes.get('/', getPage)

export default routes;