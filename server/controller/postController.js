const { User, Post } = require("../models/index");

class postController {
    static async readPosts(req, res, next) {
        try {
            const { id, username } = req.login; //ini asal dari AUTHENTICATION
            const readPost = await Post.findAll({
                include: [
                    { model: User, attributes: { exclude: ["password"] } },
                ],
            });
            res.status(200).json({
                message: `Post retrieved`,
                data: readPost,
            });
        } catch (err) {
            next(err);
        }
    }

    static async createPost(req, res, next) {
        try {
            const { id, username } = req.login;
            const {
                name,
                description,
                publishDate,
                bloodType,
                location,
                status,
                contact,
                postType,
            } = req.body;
            const newPost = await Post.create({
                name,
                description,
                publishDate,
                bloodType,
                location,
                status,
                contact,
                postType,
                UserId: id,
            });
            res.status(201).json({
                message: `Successfully created new post`,
                newPost,
            });
        } catch (err) {
            next(err);
        }
    }

    static async postDetail(req, res, next) {
        try {
            const { id } = req.params;
            const postDetail = await Post.findOne({
                include: [{ model: User }],
                where: { id },
            });
            if (!postDetail) {
                throw new Error("NotFound");
            }
            res.status(200).json({
                message: `Success Retriving Post ${id}`,
                postDetail,
            });
        } catch (err) {
            next(err);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const { id } = req.params;
            const foundData = await Post.findByPk(id);
            if (!foundData) {
                throw new Error("NotFound");
            }
            const {
                name,
                description,
                publishDate,
                bloodType,
                location,
                status,
                contact,
                postType,
            } = req.body;
            await Post.update(
                {
                    name,
                    description,
                    publishDate,
                    bloodType,
                    location,
                    status,
                    contact,
                    postType,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            res.status(200).json({
                message: `Update post success`,
                data: `Id ${id}`,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id);
            if (!post) {
                throw new Error("NotFound");
            }
            await Post.destroy({
                where: { id },
            });
            res.status(200).json({
                message: `Deletion of post id ${id}`,
                post,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = postController;
