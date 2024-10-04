const yup = require("yup");

const createArticleSchema = yup.object().shape({
    title: yup.string().max(255).required(),
    content: yup.string().required(),
    tags: yup
        .mixed()
        .test(
            "is-string-or-array",
            "Tags must be string or array of strings",
            (value) => {
                return (
                    typeof value === "string" ||
                    (Array.isArray(value) &&
                        value.every((item) => typeof item === "string") &&
                        value.length !== 0)
                );
            }
        )
        .required("Tag(s) are required"),
});

module.exports = createArticleSchema;
