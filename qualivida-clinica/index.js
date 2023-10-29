import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url'; // Import the 'fileURLToPath' function
import { dirname } from 'path'; // Import the 'dirname' function
import routesLogin from "./rotas/rotasUsuario.js";

// Use the 'fileURLToPath' function to convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Use the 'dirname' function to get the directory path
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

app.use("/pages/login.html", routesLogin);

app.get('/login', (req, res) => {
    const filePath = 'pages/login.html'; // Relative path to the file
    res.sendFile(filePath, { root: __dirname });
})

app.listen(8081);
