const express = require("express");
const controller = require("./../controllers/articles");
const validate = require("./../middlewares/validate");
const createArticleSchema = require("./../validators/createArticle");
const passport = require("passport");

const router = express.Router();

router
    .route("/")
    .post(
        validate(createArticleSchema),
        passport.authenticate("accessToken", { session: false }),
        controller.create
    );

module.exports = router;
