"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Article, {
				foreignKey: "article_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.User, {
				foreignKey: "user_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.Magasin, {
				foreignKey: "magasin_id",
				onDelete: "CASCADE",
			});
		}
	}
	Stock.init(
		{
			article_id: DataTypes.INTEGER,
			quantite: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			magasin_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Stock",
		},
	);
	return Stock;
};
