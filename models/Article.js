const { DataTypes } = require("sequelize");
const db = require("./../db");

const Article = (sequelize) => {
    return db.define(
        "article",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            cover: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "articles",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
};

module.exports = Article;