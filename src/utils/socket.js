import { io } from 'socket.io-client';

const URL = 'https://mern-shopify.onrender.com';
// const URL = 'http://localhost:5000';

export const socket = io(URL);
