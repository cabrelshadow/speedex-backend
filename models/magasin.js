"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Magasin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Stock, {
				foreignKey: "magasin_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.User, {
				foreignKey: "user_id",
				onDelete: "CASCADE",
			});
			this.hasMany(models.Commande, {
				foreignKey: "magasin_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.Ville, {
				foreignKey: "ville_id",
			});
		}
	}
	Magasin.init(
		{
			name: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
			stock_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			address: DataTypes.STRING,
			ville_id: DataTypes.INTEGER,
			quartier: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Magasin",
		},
	);
	return Magasin;
};
