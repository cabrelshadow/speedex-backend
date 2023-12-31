"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Pays extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Ville, {
				foreignKey: "pays_id",
				onDelete: "CASCADE",
			});
		}
	}
	Pays.init(
		{
			nomPays: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Pays",
		},
	);
	return Pays;
};
