'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    ville: DataTypes.STRING,
    street_address: DataTypes.STRING,
    type: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    cni: DataTypes.STRING,
    date_delivrance: DataTypes.DATE,
    lieu_delivrance: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};