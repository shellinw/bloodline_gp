"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "UserId" });
        }
    }
    Post.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please enter Name",
                    },
                    notEmpty: {
                        msg: "Please enter Name",
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please enter Description",
                    },
                    notEmpty: {
                        msg: "Please enter Description",
                    },
                },
            },
            publishDate: DataTypes.DATE,
            bloodType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please enter Blood Type",
                    },
                    notEmpty: {
                        msg: "Please enter Blood Type",
                    },
                },
            },
            location: DataTypes.STRING,
            status: DataTypes.STRING,
            contact: DataTypes.STRING,
            postType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please specify post as DONOR or RECIPIENT",
                    },
                    notEmpty: {
                        msg: "Please specify post as DONOR or RECIPIENT",
                    },
                },
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Require User ID",
                    },
                    notEmpty: {
                        msg: "Require User ID",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    Post.beforeCreate((instance) => {
        instance.publishDate = new Date();
    });
    return Post;
};
