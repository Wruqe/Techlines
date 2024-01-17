const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPost.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed User data
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed Blog Post data
  await Blog.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
