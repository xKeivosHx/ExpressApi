// Instacionamos a faker (generador de datos dummy)
const faker = require('faker');

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

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.users.push(newUser);

    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find((user) => (user.id = id));
  }

  update(id, changes) {
    const index = this.users.find((user) => user.id == id);

    if (index == -1) {
      throw new Error('User not found.');
    }

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };

    return this.user[index];
  }

  deleteOne(id) {
    const index = this.users.find((user) => user.id == id);

    if (index == -1) {
      throw new Error('User not found.');
    }

    this.users.splice(index, 1);

    return id;
  }
}

module.exports = UsersService;
