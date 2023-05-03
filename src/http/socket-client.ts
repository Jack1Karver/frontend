import { io } from 'socket.io-client';

const socketClient = io('http://localhost:9002', { path: '/ws' });

socketClient.on('connect', () => {
  socketClient.send('request_item');
});

export default socketClient;
