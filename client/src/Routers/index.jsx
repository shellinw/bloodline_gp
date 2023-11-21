import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../views/MainPage";
import MainContent from "../views/MainContent";
import DetailedPostPage from "../views/DetailedPostPage";
import RegistrationPage from "../views/RegistrationPage";
import LoginPage from "../views/LoginPage";
import CreatePost from "../views/CreatePost";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegistrationPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        element: <MainPage />,
        children: [
            {
                path: "/posts",
                element: <MainContent />,
            },
            {
                path: "/detailed/:id",
                element: <DetailedPostPage />,
            },
            {
                path: "/postform",
                element: <CreatePost />,
            },
        ],
    },
]);

export default router;
