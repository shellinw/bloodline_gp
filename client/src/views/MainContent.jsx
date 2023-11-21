import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainContent = () => {
    const server_url = "http://localhost:3000";
    const [post, setPost] = useState([]);

    const fetchPost = async () => {
        try {
            const { data } = await axios.get(`${server_url}/posts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            });

            setPost(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //otomotis, lifecycle seperti hook tidak perlu di panggil.ini adalah mounting
        fetchPost();
    }, []);

    return (
        <div className="flex space-y-5  flex-row flex-wrap">
            {post.map((el) => {
                return (
                    <div className="bg-white rounded w-2/3 lg:w-1/2 xl:w-1/3 p-4 shadow">
                        <div className="flex">
                            <div className="w-2/3">
                                <h1 className="font-semibold">{el.postType}</h1>
                                <span className="block text-xs uppercase text-red-400">
                                    {el.status}
                                </span>
                            </div>
                            <div className="w-1/3">
                                <Link to={`/detailed/${el.id}`}>
                                    <button className="float-right text-xs bg-blue-400 rounded px-2 py-1 text-white">
                                        Detail
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="py-4 text-sm">{el.description}</div>
                        <div className="flex">
                            <div className="w-1/2 flex-col">
                                <span className="flex justify-center text-2xl font-semibold">
                                    {el.name}
                                </span>
                                <span className="flex justify-center text-gray-500">
                                    Patient Name
                                </span>
                            </div>
                            <div className="w-1/2 flex-col">
                                <span className="flex justify-center text-2xl font-semibold">
                                    {el.bloodType}
                                </span>
                                <span className="flex justify-center text-gray-500">
                                    Blood Type
                                </span>
                            </div>
                        </div>
                        <div className="flex-center">
                            <span className="text-xs text-red-400 font-semibold py-1">
                                Publish Date {el.publishDate}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MainContent;
