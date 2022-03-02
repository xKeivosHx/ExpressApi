// traemos a express
const express = require('express');

//Rutas
const productsRouter = require('./product.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./category.router');

function routerApi(app) {
  const router = express.Router();

  //Ruta Maestra
  app.use('/api/v1', router);
  //Rutas
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/category', categoriesRouter);
}

module.exports = routerApi;
