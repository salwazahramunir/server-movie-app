'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../Helper/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, { foreignKey: "authorId" });
      User.hasMany(models.Favorite, { foreignKey: "userId" });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username can't be null"
        },
        notEmpty: {
          msg: "username can't be empty"
        }
      }
    },
    email: {
      unique: {
        msg: "e-mail already registered"
      },
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "e-mail can't be null"
        },
        notEmpty: {
          msg: "e-mail can't be empty"
        },
        isEmail: {
          msg: "email format (foo@bar.com)"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password can't be null"
        },
        notEmpty: {
          msg: "password can't be empty"
        },
        len: {
          args: [5],
          msg: "minimum password length is 5"
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password)
  });

  return User;
};