import express from "express";
import rotasUsuario from "./rotas/rotasUsuario.js";
import cors from "cors";
import { loginUsuario } from "./controllers/userController.js";

const path = require("path");

const app = express();

function login(req, res) {
    const caminho = path.join(__dirname, "pages", "login.html");
    res.sendFile(caminho)
}

app.get("/login", login)
app.post("/login", loginUsuario)

app.use(express.json());
app.use(cors());

app.use("/user", rotasUsuario);

app.listen(8081);