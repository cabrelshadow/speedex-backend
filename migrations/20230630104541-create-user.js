"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fullname: {
				type: Sequelize.STRING,
			},
			username: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			address: {
				type: Sequelize.STRING,
			},
			ville: {
				type: Sequelize.STRING,
			},
			street_address: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
			},
			role_id: {
				type: Sequelize.INTEGER,
			},
			cni: {
				type: Sequelize.STRING,
			},
			date_delivrance: {
				type: Sequelize.DATE,
			},
			lieu_delivrance: {
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
		// Add foreign key constraint
		await queryInterface.addConstraint("Users", {
			fields: ["role_id"],
			type: "foreign key",
			name: "fk_roles_users",
			references: {
				table: "Roles",
				field: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
		await queryInterface.removeConstraint("Users", "fk_roles_users");
	},
};
