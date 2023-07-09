"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Livraisons", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			commande_id: {
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
			},
			status: {
				type: Sequelize.BOOLEAN,
			},
			date_livraison: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.addConstraint("Livraisons", {
			fields: ["commande_id"],
			type: "foreign key",
			name: "fk_article_livraison",
			references: {
				table: "Commandes",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
		await queryInterface.addConstraint("Livraisons", {
			fields: ["user_id"],
			type: "foreign key",
			name: "fk_user_livraison",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint("Livraisons", "fk_article_livraison");
		await queryInterface.removeConstraint("Livraisons", "fk_user_livraison");
		await queryInterface.dropTable("Livraisons");
	},
};
