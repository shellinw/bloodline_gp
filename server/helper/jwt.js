const jwt = require("jsonwebtoken");
SECRET_KEY = "inirahasia";

const genToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY);
};

// console.log(genToken());
const decode = (genToken) => {
    return jwt.verify(genToken, SECRET_KEY);
};
module.exports = {
    genToken,
    decode,
};
