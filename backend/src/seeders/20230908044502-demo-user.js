'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'exam@gmail.com',
        password: '123456',
        username: 'example',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        email: 'emi@gmail.com',
        password: '123456',
        username: 'emiple',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
