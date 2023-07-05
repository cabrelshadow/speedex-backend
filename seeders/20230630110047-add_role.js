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
<<<<<<< HEAD
					isAdmin: false,
=======
>>>>>>> f70819dda687a0c203fa08436888741cb7f2732f
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Livreur",
<<<<<<< HEAD
					isAdmin: false,
=======
>>>>>>> f70819dda687a0c203fa08436888741cb7f2732f
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					name: "CallCenter",
<<<<<<< HEAD
					isAdmin: false,
=======
>>>>>>> f70819dda687a0c203fa08436888741cb7f2732f
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					name: "Partenaire",
<<<<<<< HEAD
					isAdmin: false,
=======
>>>>>>> f70819dda687a0c203fa08436888741cb7f2732f
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					name: "Client",
<<<<<<< HEAD
					isAdmin: false,
=======
>>>>>>> f70819dda687a0c203fa08436888741cb7f2732f
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
