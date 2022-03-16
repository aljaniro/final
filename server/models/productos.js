const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ProductoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, "Por favor ingrese un codigo"],
    maxlength: 4,
    unique: true,
  },
  nombre: {
    type: String,
    required: [true, "Por favor ingrese el nombre del producto"],
    maxlength: 30,
    unique: true,
  },
  categoria: {
    type: String,
    required: [true, "Por favor ingrese la categoria del producto"],
  },

  valor: Number,
});
ProductoSchema.methods.crearJsonWebToken = function () {
  return jwt.sign({ codigo: this.codigo }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
module.exports = mongoose.model("Productos", ProductoSchema);
