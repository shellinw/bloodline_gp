"use strict";
const { hashPassword } = require("../helper/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const user = require("../users.json");
        user.map((el) => {
            delete el.id;
            el.password = hashPassword(el.password);
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Users", user, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", user, {});
    },
};
