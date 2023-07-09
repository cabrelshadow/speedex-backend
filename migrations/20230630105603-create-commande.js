"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Commandes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			numero_commande: {
				type: Sequelize.STRING,
			},
			address_livraison: {
				type: Sequelize.STRING,
			},
			numero_client: {
				type: Sequelize.STRING,
			},
			total: {
				type: Sequelize.INTEGER,
			},
			status_commande: {
				type: Sequelize.BOOLEAN,
			},
			date_validation: {
				type: Sequelize.DATE,
			},
			date_assignation: {
				type: Sequelize.DATE,
			},
			validate: {
				type: Sequelize.BOOLEAN,
			},
			frais_livraison: {
				type: Sequelize.INTEGER,
			},
			frais_emballage: {
				type: Sequelize.INTEGER,
			},
			user_call_center: {
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
			},
			user_commande_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
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
		await queryInterface.addConstraint("Commandes", {
			fields: ["user_id"],
			type: "foreign key",
			name: "fk_user_commande",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
		await queryInterface.addConstraint("Commandes", {
			fields: ["user_call_center"],
			type: "foreign key",
			name: "fk_user_call_center_commande",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
		/* await queryInterface.addConstraint("Commandes", {
			fields: ["user_commande_id"],
			type: "foreign key",
			name: "fk_user_commande_id_commande",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		}); */
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint("Commandes", "fk_user_commande");
		await queryInterface.removeConstraint(
			"Commandes",
			"fk_user_call_center_commande",
		);
		/* await queryInterface.removeConstraint(
			"Commandes",
			"fk_user_commande_id_commande",
		); */
		await queryInterface.dropTable("Commandes");
	},
};
