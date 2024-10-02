const yup = require("yup");

const loginSchema = yup.object().shape({
    username: yup
        .string()
        .min(8)
        .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, "username is not valid")
        .max(255)
        .required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")])
        .required(),
    //? captchaId
    captcha: yup.string().max(4).required(),
});

module.exports = loginSchema;
