import { io } from 'socket.io-client';

const URL = 'https://mern-shopify.onrender.com';

export const socket = io(URL);
