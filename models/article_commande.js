'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article_commande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article_commande.init({
    article_id: DataTypes.INTEGER,
    commande_id: DataTypes.INTEGER,
    quantite: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article_commande',
  });
  return Article_commande;
};