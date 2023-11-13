import express from "express";
import cors from "cors";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import routesLogin from "./routes/routesLogin.js";
import routesHome from "./routes/routesHome.js";
import routesEspecialidades from "./routes/routesEspecialidades.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(routesLogin);
app.use(routesHome);
app.use(routesEspecialidades);

app.listen(8081, () => {
  console.log("Running on port 8081");
});
