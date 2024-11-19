import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:9090/ws";

const client = new Client({
    brokerURL: SOCKET_URL,
    connectHeaders: {},
    debug: function (str) {
        console.log(str);
    },
    reconnectDelay: 5000,
    webSocketFactory: () => new SockJS(SOCKET_URL), // SockJS fallback
});

export default client;
