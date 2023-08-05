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
			"Magasins",
			"quartier_id",
			Sequelize.INTEGER,
		);
		await queryInterface.addConstraint("Magasins", {
			fields: ["quartier_id"],
			type: "foreign key",
			name: "fk_magasin_quartier_id",
			references: {
				table: "Quartiers",
				field: "id",
			},
			onDelete: "cascade", // optional, specify the desired onDelete behavior
			onUpdate: "restrict", // optional, specify the desired onUpdate behavior
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeConstraint("Magasins", "fk_magasin_quartier_id");
		await queryInterface.removeColumn("Magasins", "quartier_id");
	},
};
