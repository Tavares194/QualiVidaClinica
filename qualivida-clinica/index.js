import express from "express";
import cors from "cors";
import session from "express-session";
import i18n from "i18n";
import serveFavicon from "serve-favicon";
import cookieParser from "cookie-parser";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import routesLogin from "./routes/routesLogin.js";
import routesHome from "./routes/routesHome.js";
import routesCadastro from "./routes/routesCadastro.js";
import routesEspecialidades from "./routes/routesEspecialidades.js";
import { languageMiddleware } from "./middleware/languageMiddleware.js";
import { checkCookieAuth } from "./middleware/authMiddleware.js";

const app = express();
const port = 8081;

app.use(express.json());
app.use(cookieParser())

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

const langs = ['ar', 'de', 'en', 'es', 'fr', 'hi', 'ja', 'pt-BR', 'ru', 'zh'];

i18n.configure({
  locales: [...langs],
  defaultLocale: 'pt-BR',
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
});

app.use(i18n.init);

app.use((req, res, next) => {
  const preferredLanguage = req.acceptsLanguages([...langs]);

  res.locals.preferredLanguage = preferredLanguage;

  res.setHeader('X-Preferred-Language', preferredLanguage);
  req.setLocale(preferredLanguage);

  next();
});


const corsOptions = {
  origin: `http://localhost:${port}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  try {
    await checkCookieAuth(req, res);
    next();
  } catch (error) {
    console.error('Error in authCookie:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use(express.static('public'));
app.use('/locales', express.static(path.join('locales')));
app.use(express.urlencoded({ extended: true }));
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(languageMiddleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(routesLogin);
app.use(routesHome);
app.use(routesCadastro);
app.use(routesEspecialidades);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
