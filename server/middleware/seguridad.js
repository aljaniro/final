const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const producto = require("../models/productos");
exports.seguridad = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("El producto no envio el token", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token", decoded);
    const productoBD = await producto.findOne({ codigo: decoded.codigo });
    req.producto = productoBD;
    next();
  } catch (err) {
    return next(new ErrorResponse("Errores en el proceso del token", 400));
  }
};
