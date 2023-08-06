"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Magasins", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			stock_id: {
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
			},
			quartier: {
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
		await queryInterface.addConstraint("Magasins", {
			fields: ["user_id"],
			type: "foreign key",
			name: "fk_user_magasin_id",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
		await queryInterface.addConstraint("Magasins", {
			fields: ["stock_id"],
			type: "foreign key",
			name: "fk_magasin_stock_id",
			references: {
				table: "Stocks",
				field: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Magasins");
		await queryInterface.removeConstraint("Magasins", "fk_user_magasin_id");
		await queryInterface.removeConstraint("Magasins", "fk_magasin_stock_id");
	},
};
