import express from "express";
import cors from "cors";

import routesLogin from "./routes/routesLogin.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.use(routesLogin);

app.listen(8081, () => {
  console.log("Running on port 8081");
});
