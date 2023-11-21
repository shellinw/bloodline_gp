import axios from "axios"; //importing axios for backend use
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react"; //import state
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState(""); //these are variables needed for login.
    const [password, setPassword] = useState("");

    // ???
    const navigate = useNavigate(); //create variable for use Navigate.

    const inputUsernameOnChangeHandler = (evt) => {
        //input Username function
        setUsername(evt.target.value); //changing username with what you receive from front end. target.value path
    };

    const inputPasswordOnChangeHandler = (evt) => {
        //input password function
        setPassword(evt.target.value); //changing password receive from front end. Same as target value path.
    };

    const formOnSubmitHandler = async (evt) => {
        //a form need handle to submit.
        evt.preventDefault(); //prevent the default from refreshing.?
        //all of these process obtain from front end.

        console.log(username, password);

        try {
            const { data } = await axios({
                url: "http://localhost:3000/login",
                method: "post",
                data: {
                    username,
                    password,
                },
            });
            console.log(data.access_token);

            localStorage.setItem("token", data.access_token);
            navigate("/posts");
        } catch (err) {
            console.log(err);
        }
    };

    const handleGoogleLogin = async (codeResponse) => {
        const server_url = "http://localhost:3000";
        try {
            const { data } = await axios.post(
                `${server_url}/google-login`,
                null,
                { headers: { token: codeResponse.credential } }
            );
            console.log(data);
            localStorage.setItem("token", data);
            console.log(localStorage.token);
            navigate("/posts");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form //structure form semua ada pada sini.
                className="flex flex-col gap-4"
                onSubmit={formOnSubmitHandler}
            >
                <input
                    onChange={inputUsernameOnChangeHandler}
                    value={username}
                    type="text"
                    placeholder="Your Email"
                />
                <input
                    value={password}
                    onChange={inputPasswordOnChangeHandler}
                    type="password"
                    placeholder="Your Password"
                />
                <button type="submit">Submit</button>
                <GoogleLogin onSuccess={handleGoogleLogin} />
            </form>
        </>
    );
};
export default LoginPage;
