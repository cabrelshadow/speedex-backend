'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livraison extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Livraison.init({
    commande_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    date_livraison: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Livraison',
  });
  return Livraison;
};