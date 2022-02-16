// traemos a express
const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validatorHandler');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

//Lista de Productos
router.get('/', async (request, response) => {
  const products = await service.find();

  response.json(products);
});

//Filtro de productos y se pone antes de un prod en especifico para no causar conflictos.
router.get('/filter', (request, response) => {
  response.send('Soy Un Filter');
});

//Obtiene producto en especifico por medio del id
router.get(
  '/:productId',
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
  async (request, response) => {
    const body = request.body;

    const newProduct = await service.create(body);

    response.status(201).json({
      message: 'created',
      data: newProduct,
    });
  }
);

//Update al producto
router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (request, response) => {
    const { id } = request.params;
    const body = request.body;

    const product = await service.update(id, body);

    response.json({
      id,
      message: 'update',
      data: product,
    });
  }
);

//Update parcial a producto (si se le manda solo un prop del json igual funciona)
router.patch(
  '/:id',
  validatorHandler(updateProductSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;

      const product = await service.update(id, body);

      response.json({
        id,
        message: 'partial update',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Eliminar producto
router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const product = await service.delete(id);

  response.json({
    product,
    message: 'deleted',
  });
});

module.exports = router;
