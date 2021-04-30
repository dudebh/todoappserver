'use strict';
const {
  Model
} = require('sequelize');

const getYesterday = require('../helpers/getYesterday')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get formated_date(){
      return this.due_date.toDateString()
    }

    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {msg: 'title can not be empty'},
        notNull: {msg: 'title can not null'}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {msg: 'description can not be empty'},
        notNull: {msg: 'description can not null'}
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {msg: 'description can not be empty'},
        notNull: {msg: 'description can not null'},
        isIn: {
          args: [['Complete', 'Incomplete']],
          msg: 'Must be Complete or Complete'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull:false,
      validate: {
        notEmpty: {msg: 'due date can not be empty'},
        notNull: {msg: 'due date can not null'},
        isAfter: {args: getYesterday(), msg:'date'}
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notEmpty: {msg: 'UserId can not be empty'},
        notNull: {msg: 'UserId can not null'}
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};