// Instacionamos a faker (generador de datos dummy)
const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { use } = require('../routes/users.router');
class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 20;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        gender: faker.name.gender(),
      });
    }
  }

  async create(data) {
    const newUser = await models.User.create(data);

    return newUser;
  }

  async find() {
    const clients = await models.User.findAll();

    return clients;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('Usuarío no encontrado');
    }

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const userUpdated = await user.update(changes);

    return userUpdated;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();

    return { id };
  }
}

module.exports = UsersService;
