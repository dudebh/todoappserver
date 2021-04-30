'use strict';
const {
  Model
} = require('sequelize');

const { hashStr } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {msg: 'email can not be empty'},
        isEmail: {msg: 'Please fill with correct email format: example@mail.com'},
        notNull: {msg: 'email can not null'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {msg: 'password can not be empty'},
        notNull: {msg: 'password can not null'},
        len: {arg:[[6, 255]], msg:'A password must contains 6 characters'}
      }
    }
  }, {
    hooks :{
      beforeCreate: (instance, options) =>{
        instance.password = hashStr(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};