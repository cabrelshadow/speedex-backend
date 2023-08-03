"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Commande extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsToMany(models.Article, {
				foreignKey: "article_id",
				through: models.Article_commande,
			});
			this.belongsTo(models.User, {
				foreignKey: "user_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.User, {
				foreignKey: "user_call_center",
			});
			this.belongsTo(models.User, {
				foreignKey: "user_commande_id",
			});
			this.belongsTo(models.Magasin, {
				foreignKey: "magasin_id",
				onDelete: "CASCADE",
			});
		}
	}
	Commande.init(
		{
			numero_commande: DataTypes.STRING,
			address_livraison: DataTypes.STRING,
			numero_client: DataTypes.STRING,
			total: DataTypes.INTEGER,
			status_commande: DataTypes.STRING,
			date_validation: DataTypes.DATE,
			date_assignation: DataTypes.DATE,
			date_livraison: DataTypes.DATE,
			validate: DataTypes.BOOLEAN,
			frais_livraison: DataTypes.INTEGER,
			frais_emballage: DataTypes.INTEGER,
			user_call_center: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			user_commande_id: DataTypes.INTEGER,
			partenaire_id: DataTypes.INTEGER,
			magasin_id: DataTypes.INTEGER,
			quartier: DataTypes.STRING,
			comment: DataTypes.TEXT,
			delievred: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Commande",
		},
	);
	return Commande;
};
