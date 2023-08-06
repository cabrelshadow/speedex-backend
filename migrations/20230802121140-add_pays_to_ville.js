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
		await queryInterface.addColumn("Villes", "pays_id", Sequelize.INTEGER);
		await queryInterface.addConstraint("Villes", {
			fields: ["pays_id"],
			type: "foreign key",
			name: "fk_pays_to_ville_id",
			references: {
				table: "Pays",
				field: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "RESTRICT",
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeConstraint("Villes", "fk_pays_to_ville_id");
		await queryInterface.removeColumn("Villes", "ville_id");
	},
};
