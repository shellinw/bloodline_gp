import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        googleLogout;
        navigate("/login");
    }
    return (
        <>
            <nav className="flex gap-8">
                <div className="w-20">
                    <img
                        className=""
                        src="https://i.ibb.co/WPn83SS/Screen-Shot-2023-11-15-at-23-13-34.png"
                    />
                </div>
                BLOODLINE
                <Link
                    className="text-blue-400 underline hover:text-blue-600"
                    to={"/posts"}
                >
                    Home Page
                </Link>
                <Link
                    className="text-red-400 underline hover:text-blue-600"
                    // to={"/"}
                >
                    MY POST
                </Link>
                <Link
                    className="text-red-400 underline hover:text-blue-600"
                    // to={"/"}
                >
                    REQUEST PAGE
                </Link>
                <Link
                    className="text-red-400 underline hover:text-blue-600"
                    // to={"/"}
                >
                    DONOR PAGE
                </Link>
                <Link
                    className="text-blue-400 underline hover:text-blue-600"
                    to={"../postform"}
                >
                    Create Post
                </Link>
                <Link
                    className="text-blue-400 underline hover:text-blue-600"
                    onClick={handleLogout}
                >
                    Log Out
                </Link>
            </nav>
            <Outlet />
        </>
    );
};
export default MainPage;
