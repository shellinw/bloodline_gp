"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Post, { foreignKey: "UserId" });
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please enter Username",
                    },
                    notEmpty: {
                        msg: "Please enter Username",
                    },
                },
            },
            birthdate: DataTypes.DATE,
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please enter password",
                    },
                    notEmpty: {
                        msg: "Please enter password",
                    },
                    minFive() {
                        if (this.password.length < 5)
                            throw "Minimal 5 characters password";
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    User.beforeCreate((instance) => {
        instance.password = hashPassword(instance.password);
    });
    return User;
};
