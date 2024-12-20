const express = require("express");
const controller = require("./../controllers/auth");
const registerSchema = require("./../validators/register");
const loginSchema = require("./../validators/login");
const validate = require("./../middlewares/validate");
const passport = require("passport");
const captcha = require("./../middlewares/captcha");

const router = express.Router();

router.route("/register").post(validate(registerSchema), controller.register);

router
    .route("/login")
    .post(
        validate(loginSchema),
        captcha,
        passport.authenticate("local", { session: false }),
        controller.login
    );

router
    .route("/me")
    .get(
        passport.authenticate("accessToken", { session: false }),
        controller.getMe
    );

router
    .route("/logout")
    .post(
        passport.authenticate("accessToken", { session: false }),
        controller.logout
    );

router
    .route("/refresh")
    .post(
        passport.authenticate("refreshToken", { session: false }),
        controller.refreshToken
    );

router
    .route("/google")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
    .route("/google/callback")
    .get(passport.authenticate("google", { session: false }), controller.login);

module.exports = router;
