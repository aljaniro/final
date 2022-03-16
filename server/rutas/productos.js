const express = require("express");
const ruta = express.Router();
const {obtenerProducto,crearProductos,actualizarProductos,obtenerProductos,eliminarProductos}= require('../controllers/productos')
const {seguridad} = require('../middleware/seguridad')
ruta
    .route('/')
    .get(obtenerProductos)
    .post(crearProductos)
ruta
    .route('/:id')
    .put(seguridad,actualizarProductos)
    .get(seguridad,obtenerProducto)
    .delete(seguridad,eliminarProductos)
module.exports = ruta;