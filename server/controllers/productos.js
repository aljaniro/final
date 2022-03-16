const ErrorResponse = require("../helper/errorResponse")
const productos = require("../models/productos");
exports.crearProductos = async (req, res, next) => {
    try {
      const {codigo,nombre,categoria,valor}=req.body
        const productosData = await productos.create(req.body);
        

        const token = productosData.crearJsonWebToken();
        res.status(200).json({
          status:200,
          id:productosData._id,
          codigo,
          nombre,
          categoria,
          valor,
          token
        })
      } catch (err) {
        next(new ErrorResponse('El producto no se pudo crear: ' + err.message, 404));
      }   
}

exports.obtenerProductos = async(req,res,next)=>{
  try {
    const productosData = await productos.find();
    res.status(200).json(productosData);
  } catch (err) {
    next(new ErrorResponse('No se pudo procesar el request: ' +err.message, 404));
  }   
}

exports.actualizarProductos =async (req,res,next)=>{
  try {
    const producto = await productos.findByIdAndUpdate(req.params.id,req.body)
    if(!producto){
      return next(new ErrorResponse('El producto no existe con este id: ' + req.params.id, 404));
    }
    
    res.status(200).json({status:200, data:producto});
  } catch (err) {
    next(new ErrorResponse('El producto no existe con este id: ' + req.params.id, 404));
  }  
}

exports.obtenerProducto = async(req,res,next)=>{
  try {
    const producto = await productos.findById(req.params.id)
    if(!producto){
      return next(new ErrorResponse('El producto no existe en la bd con este id: ' + req.params.id, 404));
  
    }
    res.status(200).json(producto);
  } catch (err) {
   next(new ErrorResponse('El producto no existe con este id: ' + req.params.id, 404));
  }  
}

exports.eliminarProductos = async(req,res,next)=>{
  try {
    const producto = await productos.findByIdAndDelete(req.params.id)
    if(!producto){
      return next(new ErrorResponse('El producto no existe con este id: ' + req.params.id, 404));
    }
    
    res.status(200).json({status:200, data:producto});
  } catch (err) {
    next(new ErrorResponse('El producto no existe con este id: ' + req.params.id, 404));
  }  
}