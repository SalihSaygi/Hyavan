const io = require("socket.io");

const ws = (server) => {

    const socket = io(server,
        { 
            transports: ["websocket"], 
            serveClient: false,
            path: '/server',
            log: false,
            // query: 
            // {
            //     userid: id
            // },
            // withCredentials: true,
            reconnectionAttempts: 50,
            reconnectionDelay: 2000,
            reconnectionDelayMax: 5000,
            randomizationFactor: 0.5
        }
    )
    return socket
}

export default ws