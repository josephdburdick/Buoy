import DDPClient from 'ddp-client';

let ddpClient = new DDPClient({
  host: "192.168.1.3", // Meteor server ip
  port: 3000,
  ssl: false,
  autoReconnect: true,
  autoReconnectTimer: 500,
  maintainCollections: true,
  ddpVersion: '1',
  socketConstructor: WebSocket
});

export default ddpClient;
