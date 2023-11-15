const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');



const Comment = sequelize.define('Comment', 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'blog',
              key: 'id',
            },
          },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;

