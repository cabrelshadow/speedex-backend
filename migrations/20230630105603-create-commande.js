'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Commandes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address_livraison: {
        type: Sequelize.STRING
      },
      numero_client: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.INTEGER
      },
      status_commande: {
        type: Sequelize.BOOLEAN
      },
      date_validation: {
        type: Sequelize.DATE
      },
      date_assignation: {
        type: Sequelize.DATE
      },
      validate: {
        type: Sequelize.BOOLEAN
      },
      frais_livraison: {
        type: Sequelize.INTEGER
      },
      frais_emballage: {
        type: Sequelize.INTEGER
      },
      user_call_center: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Commandes');
  }
};