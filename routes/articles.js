const express = require("express");
const controller = require("./../controllers/articles");
const validate = require("./../middlewares/validate");
const createArticleSchema = require("./../validators/createArticle");

const router = express.Router();

router.route("/").post(validate(createArticleSchema), controller.create);

module.exports = router;
