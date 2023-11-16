const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');


const Blog = sequelize.define('Blog', 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {  
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_heading: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
       
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
  },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
