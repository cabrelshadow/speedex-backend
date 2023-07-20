"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addColumn(
			"Commandes",
			"partenaire_id",
			Sequelize.INTEGER,
		);
		await queryInterface.addColumn(
			"Commandes",
			"magasin_id",
			Sequelize.INTEGER,
		);
		await queryInterface.addConstraint("Commandes", {
			fields: ["partenaire_id"],
			type: "foreign key",
			name: "fk_partenaire_user",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "cascade", // optional, specify the desired onDelete behavior
			onUpdate: "cascade", // optional, specify the desired onUpdate behavior
		});
		await queryInterface.addConstraint("Commandes", {
			fields: ["magasin_id"],
			type: "foreign key",
			name: "fk_magasin_commande",
			references: {
				table: "Magasins",
				field: "id",
			},
			onDelete: "cascade", // optional, specify the desired onDelete behavior
			onUpdate: "cascade", // optional, specify the desired onUpdate behavior
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeConstraint("Commandes", "fk_partenaire_user");
		await queryInterface.removeConstraint("Commandes", "fk_magasin_commande");
		await queryInterface.removeColumn("Commandes", "partenaire_id");
		await queryInterface.removeColumn("Commandes", "magasin_id");
	},
};
