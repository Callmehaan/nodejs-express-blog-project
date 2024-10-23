const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const passport = require("passport");

const localStrartegy = require("./strategies/localStrartegy");
const captchaController = require("./controllers/captcha");
const authRoutes = require("./routes/auth");
const articlesRoutes = require("./routes/articles");
const jwtAccessTokenStrategy = require("./strategies/jwtAccessTokenStrategy");
const jwtRefreshTokenStrategy = require("./strategies/jwtRefreshTokenStrategy");
const googleStrategy = require("./strategies/googleStrategy");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

passport.use(localStrartegy);
passport.use("accessToken", jwtAccessTokenStrategy);
passport.use("refreshToken", jwtRefreshTokenStrategy);
passport.use(googleStrategy);

app.get("/", (req, res, next) => {
    return res.render("login.ejs");
});

app.use("/captcha", captchaController.get);
app.use("/auth", authRoutes);
app.use("/articles", articlesRoutes);

module.exports = app;
