const errorHandler = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error";

    if (err.name === "SequelizeValidationError") {
        status = 400;
        message = err.errors[0].message;
    }

    if (
        err.message === "Please enter correct email format" ||
        err.message === "Please enter correct password format"
    ) {
        status = 400;
        message = `Please enter correct email format`;
    }

    if (err.message === "Image upload fail") {
        status = 400;
        message = "Image upload fail";
    }
    if (err.name == "SequelizeForeignKeyConstraintError") {
        status = 400;
        message = "Category ID is invalid";
    }

    if (err.message == "Field should not be empty") {
        status = 400;
        message = "Please input username and password";
    }

    if (err.name == "SequelizeDatabaseError") {
        status = 400;
        message = "Wrong Datatype";
    }

    if (err.name == "JsonWebTokenError") {
        status = 401;
        message = "Invalid Token";
    }

    if (err.name == "SequelizeUniqueConstraintError") {
        status = 401;
        message = "Data already exist, please enter new data";
    }

    if (
        err.message === "LoginError" ||
        err.message === "Invalid user atau password"
    ) {
        status = 401;
        message = "Incorrect Username/Password";
    }

    if (err.message == "Authentication Failed") {
        status = 401;
        message = "Authentication Failed";
    }

    if (err.message == "No Access Right") {
        status = 401;
        message = "No Access Right";
    }

    if (err.message == "Forbidden, access not allowed") {
        status = 403;
        message = "Forbidden, access not allowed";
    }

    if (err.message == "NotFound") {
        status = 404;
        message = "Data not found";
    }

    res.status(status).json({ message });
};

module.exports = errorHandler;
