// traemos a express
const express = require('express');

const UsersService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validatorHandler');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UsersService();

/*router.get('/', (request, response) => {
  const { limit, offset } = request.query;
  if (limit && offset) {
    response.json({
      limit,
      offset,
    });
  } else {
    response.send('No hay parametros');
  }
});*/

//Obetener usuarios
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();

    res.json(users);
  } catch (error) {
    next(error);
  }
});

//Obtener un usuario
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

//Crear Nuevo Usuario
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

//Update al usuario
router.put(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await service.update(id, body);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

//Update parcial a usuario (si se le manda solo un prop del json igual funciona)
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await service.update(id, body);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

//Eliminar usuario
router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);

      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
