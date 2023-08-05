"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Ville extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here

			this.hasOne(models.Ville, {
				foreignKey: "ville_id",
			});
			this.belongsTo(models.Pays, {
				foreignKey: "pays_id",
				onDelete: "CASCADE",
			});
		}
	}
	Ville.init(
		{
			nomville: DataTypes.STRING,
			codeville: DataTypes.STRING,
			pays_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Ville",
		},
	);
	return Ville;
};
