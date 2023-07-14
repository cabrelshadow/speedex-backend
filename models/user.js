"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Commande, {
				foreignKey: "user_id",
				onDelete: "CASCADE",
			});
			this.hasMany(models.Commande, {
				foreignKey: "user_call_center",
			});
			this.belongsTo(models.Role, {
				foreignKey: "role_id",
				onDelete: "CASCADE",
			});
			this.hasOne(models.Commande, {
				foreignKey: "user_commande_id",
			});
			this.hasMany(models.Magasin, {
				foreignKey: "user_id",
				onDelete: "CASCADE",
			});
		}
	}
	User.init(
		{
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
			lieu_delivrance: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		},
	);
	return User;
};
