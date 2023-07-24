"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Article extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Categorie, {
				foreignKey: "categorie_id",
				onDelete: "CASCADE",
			});
			this.belongsToMany(models.Commande, {
				foreignKey: "commande_id",
				through: models.Article_commande,
			});
		}
	}
	Article.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
			categorie_id: DataTypes.INTEGER,
			reference: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Article",
		},
	);
	return Article;
};
