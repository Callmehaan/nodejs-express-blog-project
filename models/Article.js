const { DataTypes } = require("sequelize");

const Article = (sequelize) => {
    return sequelize.define(
        "article",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
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
