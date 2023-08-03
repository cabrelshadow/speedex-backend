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
			"date_livraison",
			Sequelize.DATE,
		);
		await queryInterface.addColumn("Commandes", "delievred", Sequelize.BOOLEAN);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeColumn("Commandes", "date_livraison");
		await queryInterface.removeColumn("Commandes", "delievred");
	},
};
