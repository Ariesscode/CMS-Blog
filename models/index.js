const User = require('./user');
const Comment = require('./comment');
const Blog = require('./blog');


User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})



module.exports = { User, Blog, Comment}