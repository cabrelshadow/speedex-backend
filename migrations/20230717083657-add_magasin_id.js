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
		await queryInterface.addColumn("Stocks", "magasin_id", Sequelize.INTEGER);
		await queryInterface.addConstraint("Stocks", {
			fields: ["magasin_id"],
			type: "foreign key",
			name: "fk_magasin_stock",
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
		await queryInterface.removeConstraint("Stocks", "fk_magasin_stock");
		await queryInterface.removeColumn("Stocks", "magasin_id");
	},
};
