const { User } = require("../db");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = new LocalStrategy(async (username, password, done) => {
    console.log(username, password);

    const user = await User.findOne({
        where: {
            username,
        },
        raw: true,
    });

    if (!user) done(null, false);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return done(null, false);
    }

    return done(null, user);
});
