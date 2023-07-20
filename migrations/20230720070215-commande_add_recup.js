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
			"address_recup",
			Sequelize.INTEGER,
		);
		await queryInterface.addColumn(
			"Commandes",
			"quartier_recup",
			Sequelize.INTEGER,
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeColumn("Commandes", "address_recup");
		await queryInterface.removeColumn("Commandes", "quartier_recup");
	},
};
