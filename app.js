const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const passport = require("passport");

const localStrartegy = require("./strategies/localStrartegy");
const captchaController = require("./controllers/captcha");
const authRoutes = require("./routes/auth");
const articlesRoutes = require("./routes/articles");

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

app.use(localStrartegy);

app.get("/captcha", captchaController.get);
// app.get("/auth", authRoutes);
// app.get("/articles", articlesRoutes);

module.exports = app;
