const sequelize = require('../config/connection');
const Blog = require('../models/blog');
const User = require('../models/user');
const blogData = require('./blog-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Dish.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
