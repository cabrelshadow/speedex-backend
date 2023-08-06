"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Quartier extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasOne(models.Magasin, {
				foreignKey: "quartier_id",
			});
			this.belongsTo(models.Ville, {
				foreignKey: "ville_id",
				onDelete: "CASCADE",
			});
		}
	}
	Quartier.init(
		{
			nomquartier: DataTypes.STRING,
			ville_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Quartier",
		},
	);
	return Quartier;
};
