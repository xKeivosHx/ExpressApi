// traemos a express
const express = require('express');

const UsersService = require('./../services/users.service');

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
router.get('/', (req, res) => {
  const user = service.find();

  res.json(user);
});

//Obtener un usuario
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);

  res.json(user);
});

//Crear Nuevo Usuario
router.post('/', (req, res) => {
  const body = req.body;

  const newUser = service.create(body);

  response.status(201).json({
    message: 'created',
    data: newUser,
  });
});

//Update al usuario
router.put('/:id', (request, response) => {
  const { id } = request.params;
  const body = request.body;

  const user = service.update(id, body);

  response.json({
    id,
    message: 'update',
    data: user,
  });
});

//Update parcial a usuario (si se le manda solo un prop del json igual funciona)
router.patch('/:id', (request, response) => {
  const { id } = request.params;
  const body = request.body;

  const user = service.update(id, body);

  response.json({
    id,
    message: 'partial update',
    data: user,
  });
});

//Eliminar usuario
router.delete('/:id', (request, response) => {
  const { id } = request.params;

  const user = service.delete(id);

  response.json({
    user,
    message: 'deleted',
  });
});

module.exports = router;
