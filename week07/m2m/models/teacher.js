'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  teacher.init({
    firstname: DataTypes.STRING,
    surname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teacher',
  });
  return teacher;
};