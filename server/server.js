const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const connectDatabase = require("./config/db");
const usuario = require("./rutas/usuario");
const productos = require("./rutas/productos");

const app = express();
app.use(express.json());
app.use(cors());
connectDatabase();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/productos", productos);
app.use("/usuario", usuario);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Errores", err.message);
  server.close(() => process.exit(1));
});
