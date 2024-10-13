const configs = require("../configs");
const { User } = require("./../db");
const jwt = require("jsonwebtoken");
const redis = require("./../redis");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            configs.auth.accessTokenSecretKey,
            {
                expiresIn: configs.auth.accessTokenExpiresInSeconds + "s",
            }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            configs.auth.refreshTokenSecretKey,
            {
                expiresIn: configs.auth.refreshTokenExpiresInSeconds + "s",
            }
        );

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

        await redis.set(
            `refreshToken:${user.id}`,
            hashedRefreshToken,
            "EX",
            configs.auth.refreshTokenExpiresInSeconds
        );

        return res.status(201).json({ accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const user = req.user;

    const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        configs.auth.accessTokenSecretKey,
        {
            expiresIn: configs.auth.accessTokenExpiresInSeconds + "s",
        }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        configs.auth.refreshTokenSecretKey,
        {
            expiresIn: configs.auth.refreshTokenExpiresInSeconds + "s",
        }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await redis.set(
        `refreshToken:${user.id}`,
        hashedRefreshToken,
        "EX",
        configs.auth.refreshTokenExpiresInSeconds
    );

    return res.status(200).json({ accessToken, refreshToken });
};

exports.getMe = async (req, res, next) => {
    const user = req.user;

    return res.status(200).json(user);
};
