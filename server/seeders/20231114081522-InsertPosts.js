"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const posts = require("../posts.json");
        posts.map((el) => {
            delete el.id;
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Posts", posts, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Posts", posts, {});
    },
};
