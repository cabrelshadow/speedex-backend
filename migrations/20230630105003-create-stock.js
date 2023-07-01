"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Stocks", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			article_id: {
				type: Sequelize.INTEGER,
			},
			quantite: {
				type: Sequelize.INTEGER,
			},
			user_id: {
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
		await queryInterface.addConstraint("Stocks", {
			fields: ["article_id"],
			type: "foreign key",
			name: "fk_stock_articles",
			references: {
				table: "Articles",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
		await queryInterface.addConstraint("Stocks", {
			fields: ["user_id"],
			type: "foreign key",
			name: "fk_user_stocks",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Stocks");
		await queryInterface.removeConstraint("Stocks", "fk_stock_articles");
		await queryInterface.removeConstraint("Stocks", "fk_user_stocks");
	},
};
