const { Sequelize } = require("sequelize");
const configs = require("./configs");

const db = new Sequelize({
    host: configs.db.host,
    port: configs.db.port,
    username: configs.db.user,
    password: configs.db.password,
    database: configs.db.name,
    dialect: configs.db.dialect,
    logging: configs.isProduction ? false : console.log,
});

//* JsDoc
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const User = require("./models/User")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Tag = require("./models/Tag")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Article = require("./models/Article")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const TagArticle = require("./models/TagArticle")(db);

User.hasMany(Article, {
    foreignKey: "author_id",
    onDelete: "CASCADE",
});
Article.belongsTo(User, {
    foreignKey: "author_id",
    as: "author",
});

Article.belongsToMany(Tag, {
    through: TagArticle,
    onDelete: "CASCADE",
    foreignKey: "article_id",
});
Tag.belongsToMany(Article, {
    through: TagArticle,
    onDelete: "CASCADE",
    foreignKey: "tag_id",
});

module.exports = { db, User, Article, Tag, TagArticle };
