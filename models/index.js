const User = require('./user');
const Comment = require('./comment');
const Blog = require('./blog');


User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  // In the Blog model
  Blog.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
  });

  Comment.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
  });



module.exports = { User, Blog, Comment}