const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);

    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll({
      include: ['products'],
    });

    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });

    if (!category) {
      throw boom.notFound('Product Not Found');
    }

    if (category.isBlock) {
      throw boom.conflict('Producto Bloqueado');
    }

    return category;
  }

  async update(id, changes) {
    const category = this.findOne(id);
    const categoryUpdated = await category.update(changes);

    return categoryUpdated;
  }

  async delete(id) {
    const category = this.findOne(id);
    await category.destroy();

    return { id };
  }
}

module.exports = CategoryService;
