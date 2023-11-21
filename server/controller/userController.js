const { User } = require("../models/index");
const { compareHash } = require("../helper/bcrypt");
const { genToken, decode } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");
class userController {
    static async register(req, res, next) {
        try {
            const { username, password, birthdate } = req.body;
            const newUser = await User.create({
                username,
                birthdate,
                password,
            });

            res.status(201).json({
                message: `Success Register`,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            console.log("test", "<<<< masuk");
            const { username, password } = req.body;
            if (!username || !password) {
                throw new Error("Field should not be empty");
            }
            const account = await User.findOne({
                where: {
                    username,
                },
            });
            if (!account) {
                throw new Error("Invalid user atau password");
            }
            //check password disini
            const isValid = compareHash(password, account.password);
            if (!isValid) {
                throw new Error("Invalid user atau password");
            }
            const payload = {
                userId: account.id,
                username: account.username,
            };
            const access_token = genToken(payload);
            res.status(200).json({
                message: "Access Granted",
                access_token,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { token } = req.headers;
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience:
                    "875756828514-tm522htv29n06au6vrrqrjsjo6jteva5.apps.googleusercontent.com",
            });
            console.log(ticket);
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: {
                    username: payload.email,
                },
                defaults: {
                    username: payload.email,
                    password: "Google_Password",
                },
                hooks: false,
            });
            console.log(user);
            const access_token = genToken({ userId: user.id });
            res.status(200).json(access_token);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userController;
