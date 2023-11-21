import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { BASE_URL } from "../configs/config";
const CreatePost = () => {
    // declare all the variable that will be receive from front end.

    const [post, setPost] = useState({
        name: "",
        description: "",
        publishDate: "",
        bloodType: "",
        location: "",
        status: "",
        contact: "",
        postType: "",
    });

    //use navigate to redirect to all post.
    const navigate = useNavigate();

    //inputhandler for each variable
    const inputPostOnChangeHandle = (evt) => {
        const { name, value } = evt.target;
        setPost({
            ...post,
            [name]: value,
        });
    };

    //submit form handler
    const formOnSubmitHandler = async (evt) => {
        evt.preventDefault();

        try {
            console.log(data);
            const { data } = await axios({
                url: "http://localhost:3000/posts",
                method: "post",
                data: {
                    name: post.name,
                    description: post.description,
                    publishDate: post.publishDate,
                    bloodType: post.bloodType,
                    location: post.location,
                    status: post.status,
                    contact: post.contact,
                    postType: post.postType,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            });

            navigate("/posts"); //navigate itu untuk pindahke halaman login setelah register
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {/* <!-- component --> */}
            <form onSubmit={formOnSubmitHandler}>
                <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <div>
                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div className="text-gray-600">
                                        <p className="font-medium text-lg">
                                            Personal Details
                                        </p>
                                        <p>Please fill out all the fields.</p>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label for="full_name">
                                                    Full Name
                                                </label>
                                                <input
                                                    onChange={
                                                        inputPostOnChangeHandle
                                                    }
                                                    type="text"
                                                    name="name"
                                                    id="full_name"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={post.name}
                                                />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label for="description">
                                                    Description
                                                </label>
                                                <input
                                                    onChange={
                                                        inputPostOnChangeHandle
                                                    }
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={post.description}
                                                />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label for="bloodType">
                                                    Blood Type
                                                </label>
                                                <input
                                                    onChange={
                                                        inputPostOnChangeHandle
                                                    }
                                                    type="text"
                                                    name="bloodType"
                                                    id="bloodType"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={post.bloodType}
                                                    placeholder=""
                                                />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label for="publishDate">
                                                    Publish Date
                                                </label>
                                                <input
                                                    onChange={
                                                        inputPostOnChangeHandle
                                                    }
                                                    type="date"
                                                    name="publishDate"
                                                    id="publishDate"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={post.publishDate}
                                                    placeholder=""
                                                />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label for="location">
                                                    Location(Hospital)
                                                </label>
                                                <input
                                                    onChange={
                                                        inputPostOnChangeHandle
                                                    }
                                                    type="text"
                                                    name="location"
                                                    id="location"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={post.location}
                                                    placeholder=""
                                                />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label for="contact">
                                                    Contact
                                                </label>
                                                <input
                                                    onChange={
                                                        inputPostOnChangeHandle
                                                    }
                                                    type="text"
                                                    name="contact"
                                                    id="contact"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={post.contact}
                                                    placeholder=""
                                                />
                                            </div>

                                            <div className="md:col-span-3">
                                                <div>
                                                    Post Type
                                                    <select
                                                        onChange={
                                                            inputPostOnChangeHandle
                                                        }
                                                        name="postType"
                                                        id="postType"
                                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    >
                                                        <option
                                                            value={"RECIPIENT"}
                                                        >
                                                            AS RECIPIENT
                                                        </option>
                                                        <option value="DONOR">
                                                            AS DONOR
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="md:col-span-3">
                                                <div>
                                                    Status (Scale of emergency)
                                                    <select
                                                        onChange={
                                                            inputPostOnChangeHandle
                                                        }
                                                        name="status"
                                                        id="status"
                                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    >
                                                        <option value="Urgent">
                                                            Urgent
                                                        </option>
                                                        <option value="Scheduled within 7 days">
                                                            Scheduled within 7
                                                            days
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="md:col-span-5 text-right">
                                                <div className="inline-flex items-end">
                                                    <Link to={"/posts"}>
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                            Submit
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CreatePost;
