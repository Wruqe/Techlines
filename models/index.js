const User = require('./user')
const Blog = require('./blog')
const Comment = require('./comment')
module.exports = { User, Blog, Comment }


User.hasMany(Blog, {
  foreignKey: 'User_id',
});

Blog.belongsTo(User, {
  foreignKey: 'User_id',
});

Blog.hasMany(Comment, {
  foreignKey: "Blog_id",
});

Comment.belongsTo(Blog, {
  foreignKey: "Blog_id",
});

module.exports = { User, Blog };