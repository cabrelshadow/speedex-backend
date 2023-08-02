'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ville extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ville.init({
    nomville: DataTypes.STRING,
    codeville: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ville',
  });
  return Ville;
};