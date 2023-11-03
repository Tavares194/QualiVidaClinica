import express from "express";
import { getPage } from "../controllers/homeController.js";

const routes = express.Router();

routes.get('/home', getPage)

export default routes;