"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Roles",
			[
				{
					name: "Administrateur",
					isAdmin: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Superviseur",
					isAdmin: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Livreur",
					isAdmin: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					name: "CallCenter",
					isAdmin: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					name: "Partenaire",
					isAdmin: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					name: "Client",
					isAdmin: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Roles", null, {});
	},
};
