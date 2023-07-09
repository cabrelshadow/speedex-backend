"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Article_commandes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			article_id: {
				type: Sequelize.INTEGER,
			},
			commande_id: {
				type: Sequelize.INTEGER,
			},
			quantite: {
				type: Sequelize.INTEGER,
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
		await queryInterface.addConstraint("Article_commandes", {
			fields: ["article_id"],
			type: "foreign key",
			name: "fk_article_commande",
			references: {
				table: "Articles",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
		await queryInterface.addConstraint("Article_commandes", {
			fields: ["commande_id"],
			type: "foreign key",
			name: "fk_article_commande_commande",
			references: {
				table: "Commandes",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint(
			"Article_commandes",
			"fk_article_commande",
		);
		await queryInterface.removeConstraint(
			"Article_commandes",
			"fk_article_commande_commande",
		);
		await queryInterface.dropTable("Article_commandes");
	},
};
