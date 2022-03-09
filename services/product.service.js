// Instacionamos a faker (generador de datos dummy)
const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };

    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }

    const { price } = query;

    if (price) {
      options.where.price = Number(price);
    }

    const { price_min, price_max } = query;

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);

    return products;
  }

  async findOne(id) {
    const product = await models.Product.findOne(id);

    if (!product) {
      throw boom.notFound('Product Not Found');
    }

    if (product.isBlock) {
      throw boom.conflict('Producto Bloqueado');
    }

    return product;
  }

  async update(id, changes) {
    const product = this.findOne(id);
    const productUpdated = await product.update(changes);

    return productUpdated;
  }

  async delete(id) {
    const product = this.findOne(id);
    await product.destroy();

    return { id };
  }
}

module.exports = ProductsService;
