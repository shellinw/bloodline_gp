const { User, Post } = require("../models/index");
const authorization = async (req, res, next) => {
    try {
        console.log(req.login);
        const { id: UserId } = req.login;
        const { id } = req.params;

        const post = await Post.findOne({
            where: {
                id,
            },
        });
        if (!post) {
            throw new Error("Post not found");
        }
        if (UserId !== post.UserId) {
            throw new Error("Forbidden, access not allowed");
        }

        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = authorization;
