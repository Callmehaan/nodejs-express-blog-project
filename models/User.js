const { DataTypes } = require("sequelize");

const User = (sequelize) => {
    return sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role: {
                type: DataTypes.STRING,
                values: ["user", "admin"],
                allowNull: false,
                defaultValue: "user",
            },
            provider: {
                type: DataTypes.STRING,
                values: ["local", "google"],
                allowNull: false,
                defaultValue: "local",
            },
        },
        {
            tableName: "users",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
};

module.exports = User;
