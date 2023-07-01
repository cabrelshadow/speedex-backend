"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Articles", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			promoted: {
				type: Sequelize.BOOLEAN,
			},
			promote_price: {
				type: Sequelize.INTEGER,
			},
			categorie_id: {
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
		await queryInterface.addConstraint("Articles", {
			fields: ["categorie_id"],
			type: "foreign key",
			name: "fk_categorie_articles",
			references: {
				table: "Categories",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Articles");
		await queryInterface.removeConstraint("Articles", "fk_categorie_articles");
	},
};
