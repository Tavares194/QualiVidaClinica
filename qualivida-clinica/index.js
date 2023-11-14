import express from "express";
import cors from "cors";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import routesLogin from "./routes/routesLogin.js";
import routesHome from "./routes/routesHome.js";
import routesCadastro from "./routes/routesCadastro.js";
import routesEspecialidades from "./routes/routesEspecialidades.js";

const app = express();
const port = 8081;

app.use(express.json());

const corsOptions = {
  origin: `http://localhost:${port}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(routesLogin);
app.use(routesHome);
app.use(routesCadastro);
app.use(routesEspecialidades);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
