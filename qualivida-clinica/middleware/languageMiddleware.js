export const languageMiddleware = function languageMiddleware(req, res, next) {
  const lang = req.headers["accept-language"];
  console.log(lang)

  if (lang.indexOf('ar') !== -1) {
    res.locals.dir = "rtl";
  } else {
    res.locals.dir = "ltr";
  }

  res.locals.lang = lang;
  next();
}