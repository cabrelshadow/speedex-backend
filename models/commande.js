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
				foreignKey:"article_id",
				through: models.Article_commande,
			});
			this.belongsTo(models.User, {
				foreignKey: "user_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.User, {
				foreignKey: "user_call_center",
			});
		}
	}
	Commande.init(
		{
			address_livraison: DataTypes.STRING,
			numero_client: DataTypes.STRING,
			total: DataTypes.INTEGER,
			status_commande: DataTypes.BOOLEAN,
			date_validation: DataTypes.DATE,
			date_assignation: DataTypes.DATE,
			validate: DataTypes.BOOLEAN,
			frais_livraison: DataTypes.INTEGER,
			frais_emballage: DataTypes.INTEGER,
			user_call_center: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Commande",
		},
	);
	return Commande;
};
