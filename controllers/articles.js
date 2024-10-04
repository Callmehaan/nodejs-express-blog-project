const { Article } = require("./../db");

exports.create = async (req, res, next) => {
    console.log(req.body);
    return console.log("[Create function in article controller]");
};
