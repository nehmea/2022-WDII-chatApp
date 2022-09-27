import { createContext } from "react";
import io from "socket.io-client";

// const ENDPOINT = "http://localhost:3001";

export const socket = io.connect(process.env.REACT_APP_SERVER_URL);
export const SocketContext = createContext();
