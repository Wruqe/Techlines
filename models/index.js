const User = require('./user')
const Blog = require('./blog')
module.exports = { User, Blog }


User.hasMany(Blog, {
  foreignKey: 'User_id',
});

Blog.belongsTo(User, {
  foreignKey: 'User_id',
});

module.exports = { User, Blog };