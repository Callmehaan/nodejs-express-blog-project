const redis = require("./../redis");

module.exports = async (req, res, next) => {
    const { uuid, captcha } = req.body;

    console.log("uuid -> ", uuid);
    console.log("captcha -> ", captcha);

    const cachedCaptcha = await redis.get(`captcha:${uuid}`);

    if (cachedCaptcha) await redis.del(`captcha:${uuid}`);

    if (cachedCaptcha !== captcha.toLowerCase()) {
        return res.status(401).json({ message: "Invalid Captcha" });
    }

    next();
    console.log("cachedCaptcha -> ", cachedCaptcha);
};
