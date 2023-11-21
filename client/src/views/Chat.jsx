import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { axios } from "axios";
const server_url = "http://localhost:3000";
function Chat() {
    const [data, setData] = useState("");

    //hhtp pull
    const [axiosResponse, setAxiosResponse] = useState({});
    //http push with connection
    const [socketConnection, setsocketConnection] = useState();

    const [socketResponse, setsocketResponse] = useState()

    const [inputText, setinputText] = useState()

    const [socketCounter, setsocketCounter] = useState()

    useEffect(() => {
        const fetchWithAxios = async () => {
            try {
                const { data } = await axiosResponse.get(server_url);
                console.log(data);
                setAxiosResponse(data);
            } catch (error) {}
        };
        fetchWithAxios();
    }, []);

    useEffect(() => {
        const socket = io("http://localhost:3000");
        setsocketConnection(socket);
        return () => {
            socketConnection?.disconnect();
        };
    }, []);

    useEffect(() => {
        //butuh sebuah handler di argument kedua, tidak perlu sebuah data. 
        const responseTimer = (response)=>{
            setsocketConnection(response)
        }
        socketConnection?.on('an_event_counter',responseTimer)
    }, [socketConnection]);

    // console.log(socketConnection);
    const handleEmitWithoutResponse = () => {
        socketConnection.emit("an_event", "from client");
    };

    const handleEmitWithResponse = ()=>{
        socketConnection.emit('an_event_with_response',(data)=>{
            socket.emit("re")
        })
    }

    return (
        <div>
            <div className="text-left bg-gray-100 rounded shadow-lg p-4 px-4 md:p-8 mb-6  max-w-lg">
                {/* {this is ChatScreen} */}
                <div className="bg-gray-300 rounded p-4 px-4 md:p-8 mb-6  max-w-lg">
                    Chat here
                </div>
                <div className=" text-right bg-gray-500 rounded p-4 px-4 md:p-8 mb-6  max-w-lg">
                    hello
                </div>
                {/* {this is textarea} */}
                <form>
                    <label>Message</label>
                    <input type="text" />
                    <button type="submit">Send</button>
                </form>
            </div>
            {/* {CLIENT REQUEST with AXIOS to SERVER} */}
            <h2>Axios Response</h2>
            <h2>{JSON.stringify(axiosResponse, null, 2)}</h2>

            {/* {CLIENT EMIT WITHOUT RESPONSE FROM SERVER} */}
            <h2>{}</h2>
            <button onClick={handleEmitWithoutResponse}>Emit</button>

            {/* {CLIENT EMIT WITH RESPONSE FROM SERVER} */}
            <h2>Socket With Response</h2>
            <input type="text"
            onChange={} />
            <button></button>
            <p></p>
        </div>
    );
}

export default Chat;
