import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewViews = () => {
    const access = localStorage.getItem("access_token");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchClubs = async () => {
            setClubs(response?.data);
        };
    }, []);
    return <></>;
};

export default NewViews;
