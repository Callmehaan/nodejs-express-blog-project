const { DataTypes } = require("sequelize");

const Tag = (sequelize) =>
    sequelize.define(
        "tag",
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
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "tags",
            timestamps: false,
        }
    );

module.exports = Tag;
