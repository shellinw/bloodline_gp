const { decode } = require("../helper/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new Error("Authentication Failed");
        }

        const access_token = authorization.split(" ")[1];
        // console.log(access_token);

        const verified = decode(access_token);
        const account = await User.findByPk(verified.userId);
        if (!account) {
            throw new Error("NotFound");
        }

        req.login = {
            id: verified.userId,
            username: verified.username,
        };
        next();
    } catch (err) {
        next(err);
    }
};
module.exports = authentication;
