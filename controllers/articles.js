const slugify = require("slugify");
const { Article, Tag } = require("./../db");

exports.create = async (req, res, next) => {
    let { title, content, tags } = req.body;
    let slug = slugify(title, { lower: true });
    const copyOfSlug = slug;
    const authorId = req.user.id;

    tags = Array.isArray(tags) ? tags : [tags];
    tags = tags.map((tag) => {
        return Tag.findOrCreate({
            where: { title: tag.trim() },
        });
    });
    tags = await Promise.all(tags);

    const coverPath = `/images/covers/${req.file?.filename}`;

    let article;
    let i = 1;

    while (!article) {
        try {
            article = await Article.create({
                title,
                content,
                slug,
                author_id: authorId,
                cover: coverPath,
            });

            await article.addTag(tags.map((tag) => tag[0]));

            return res.status(201).json({
                ...article.dataValues,
                tags: tags.map((tag) => tag[0].title),
            });
        } catch (err) {
            if (err.original.code === "ER_DUP_ENTRY") {
                slug = `${copyOfSlug}-${i++}`;
            } else {
                throw err;
            }
        }
    }
};
