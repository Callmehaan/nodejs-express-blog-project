const slugify = require("slugify");
const { Article, Tag, User } = require("./../db");

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

            await article.addTags(tags.map((tag) => tag[0]));

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

exports.findBySlug = async (req, res, next) => {
    const article = await Article.findOne({
        where: {
            slug: req.params.slug,
        },
        attributes: {
            exclude: ["author_id"],
        },
        include: [
            {
                model: User,
                attributes: { exclude: ["password"] },
                as: "author",
            },
            {
                model: Tag,
                attributes: ["title"],
                through: {
                    attributes: [],
                },
            },
        ],
    });

    if (!article) return res.status(404).json({ message: "Article not found" });

    const tags = article.dataValues.tags.map((tag) => tag.title);

    return res.json({ ...article.dataValues, tags });
};

exports.deleteArticle = async (req, res, next) => {
    const { id } = req.params;

    const article = await Article.findByPk(id, {
        raw: true,
    });

    if (!article) return res.status(404).json({ message: "Article not found" });

    if (article.author_id !== req.user.id)
        return res.status(403).json({ message: "Forbidden" });

    await Article.destroy({ where: { id } });

    return res.status(200).json({ message: "Article removed successfully" });
};

exports.findAll = async (req, res, next) => {
    const articles = await Article.findAll({
        include: [
            {
                model: Tag,
                attributes: ["title"],
                through: {
                    attributes: [],
                },
            },
            {
                model: User,
                attributes: {
                    exclude: ["password", "role"],
                },
                as: "author",
            },
        ],
        order: [["created_at", "DESC"]],
    });

    return res.json(articles);
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        let article = await Article.findByPk(id, {
            include: {
                model: Tag,
                through: {
                    attributes: [],
                },
            },
        });

        if (!article)
            return res.status(404).json({ message: "Article not found" });

        if (article.author_id !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

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

        let updatedArticle;
        let i = 1;
        while (!updatedArticle) {
            try {
                updatedArticle = await Article.update(
                    {
                        title,
                        content,
                        slug,
                        author_id: authorId,
                        cover: coverPath,
                    },
                    {
                        where: { id },
                    }
                );
            } catch (err) {
                if (err.original.code === "ER_DUP_ENTRY") {
                    slug = `${copyOfSlug}-${i++}`;
                } else {
                    throw err;
                }
            }

            await article.removeTags(article.tags);
            await article.addTags(tags.map((tag) => tag[0]));

            article = await Article.findByPk(id, {
                attributes: {
                    exclude: ["author_id"],
                },
            });

            return res.status(200).json({
                ...article.dataValues,
                tags: tags.map((tag) => tag[0].title),
            });
        }
    } catch (err) {
        next(err);
    }
};
