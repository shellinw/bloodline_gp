const cors = require("cors");
const express = require("express");
const { createServer } = require("node:http");
const errorHandler = require("./middlewares/errorHandler");

const { Server } = require("socket.io");

const userController = require("./controller/userController");
const postController = require("./controller/postController");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");
const { time } = require("node:console");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//here is all the routes
app.post("/register", userController.register); //register user need to have account first before surfing.
app.post("/login", userController.login); //login
app.post("/google-login", userController.googleLogin); //login

app.use(authentication);

app.get("/posts", postController.readPosts); // showing all posts available
app.get("/posts/:id", postController.postDetail); //showing post detail
app.post("/posts", postController.createPost); //creating new post

//authorization happen here
app.put("/posts/:id", authorization, postController.updatePost); //updating post, but only can be done according to the user who created it.
app.delete("/posts/:id", authorization, postController.deletePost);

io.on("connection", (socket) => {
    console.log(`a user connected: ${socket.id}`);
    socket.on("an_event", (msg) => {
        console.log("an_event" + msg);
    });

    socket.on("an_event_with_response", (data) => {
        console.log("an_event" + data);

        socket.emit("response_from_server", {
            len: data.length,
            randNumber: Math.ceil(Math.random() * 100),
        });
    });

    let counter = 1;
    const timer = setInterval(() => {
        counter++;
    }, 1000);

    socket.on("disconnect", () => {
        console.log(`User disconnect ${socket.id}`);
        clearInterval(timer);
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.use(errorHandler);
module.exports = app;
