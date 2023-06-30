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
				},
				{
					name: "Superviseur",
				},
				{
					name: "Livreur",
				},
				,
				{
					name: "CallCenter",
				},
				,
				{
					name: "Partenaire",
				},
				,
				{
					name: "Client",
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
    await queryInterface.bulkDelete('Roles', null, {});
	},
};
