import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { io } from "socket.io-client";

const DetailedPostPage = () => {
    const socket = io();
    const { id } = useParams();
    const server_url = "http://localhost:3000";

    const [post, setPost] = useState({});

    const [username, setUsername] = useState("");
    const [chat, setChat] = useState("");
    const [message, setMessage] = useState("");

    const socketRef = useRef();

    const inputChatChangeHandle = (evt) => {
        setChat(evt.target.value);
    };

    const chatSubmitHandler = async (evt) => {
        evt.preventDefault();
        console.log(chat);
        if (chat) {
            socket.emit("chat message", chat);
            setChat("");
        }
        socket.on("chat message", (msg) => {
            console.log(msg, `THIS IS MESSAGE HERE`);
        });
    };

    const settingMessage = (evt) => {
        setMessage(chat);
    };

    const fetchPostById = async () => {
        try {
            const { data } = await axios.get(`${server_url}/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            });

            setPost(data.postDetail);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPostById();
    }, [id]);

    return (
        //setelah return itu process render.
        <>
            <div className="min-h-screen p-6 bg-gray-300 flex space-x-4 flex-cols">
                <div className="text-left bg-gray-100 rounded shadow-lg p-4 px-4 md:p-8 mb-6  max-w-lg">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg text-red-500">
                                Post Details {post.name}
                            </p>
                        </div>

                        <div className="text-gray-600">
                            <p className="text-lg">Full Name: {post.name}</p>
                        </div>

                        <div className="text-gray-600">
                            <p className=" text-lg">
                                Description: {post.description}
                            </p>
                        </div>

                        <div className="text-gray-600">
                            <p className=" text-lg">
                                BloodType: {post.bloodType}
                            </p>
                        </div>

                        <div className="text-gray-600">
                            <p className=" text-lg">Status:{post.status}</p>
                        </div>

                        <div className="text-gray-600">
                            <p className=" text-lg">
                                Published Date:{post.publishDate}
                            </p>
                        </div>

                        <div className="text-gray-600">
                            <p className=" text-lg">Location:{post.location}</p>
                        </div>

                        <div className="text-gray-600">
                            <p className=" text-lg">Contact:{post.contact}</p>
                        </div>

                        <div className="text-gray-600">
                            <p className=" text-lg">
                                Post Type:{post.postType}
                            </p>
                        </div>

                        <Link to={" "}>
                            <button className="float-left bg-blue-400 rounded px-2 py-1 text-white">
                                Location
                            </button>
                        </Link>
                        <Link to={" "}>
                            <button className="float-left bg-blue-400 rounded px-2 py-1 text-white">
                                Chat Now
                            </button>
                        </Link>
                    </div>
                </div>
                {/* {API SECTION HERE} */}
                <div>
                    {/* {this is geolocation popup} */}
                    <div className="text-left bg-gray-100 rounded shadow-lg p-4 px-4 md:p-8 mb-6  max-w-lg">
                        GeoLocation
                    </div>

                    {/* {this is chat popup} */}
                    <div className="text-left bg-gray-100 rounded shadow-lg p-4 px-4 md:p-8 mb-6  max-w-lg">
                        {/* {this is ChatScreen} */}
                        <div className="bg-gray-300 rounded p-4 px-4 md:p-8 mb-6  max-w-lg">
                            {chat}
                        </div>
                        <div className=" text-right bg-gray-500 rounded p-4 px-4 md:p-8 mb-6  max-w-lg">
                            hello
                        </div>
                        {/* {this is textarea} */}
                        <form onClick={chatSubmitHandler}>
                            <label>Message</label>
                            <input
                                type="text"
                                onChange={inputChatChangeHandle}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailedPostPage;
