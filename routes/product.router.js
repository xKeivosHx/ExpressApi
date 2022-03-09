// traemos a express
const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validatorHandler');
const {
  getProductSchema,
  queryProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

//Lista de Productos
router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);

      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

//Filtro de productos y se pone antes de un prod en especifico para no causar conflictos.
router.get('/filter', (request, response) => {
  response.send('Soy Un Filter');
});

//Obtiene producto en especifico por medio del id
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
    try {
      const { productId } = request.params;
      const product = await service.findOne(productId);

      response.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Crea producto nuevo
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

//Update al producto
router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const product = await service.update(id, body);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Update parcial a producto (si se le manda solo un prop del json igual funciona)
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const product = await service.update(id, body);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Eliminar producto
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
