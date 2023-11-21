import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*",
    },
});

//listen to the event using ON this is an event listener.
io.on("connection", (socket) => {
    socket.emit("Welcome to Blood Line"); //event that will be fired
    socket.on("msg", () => {
        console.log("msg from client", data);
    }); // listen to the message the client has emitted.
});

//this is the server side.
