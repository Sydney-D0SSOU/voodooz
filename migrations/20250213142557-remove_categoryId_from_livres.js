'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('livres', 'categoryId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('livres', 'categoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'idCat'
      },
      allowNull: true
    });
  }
};