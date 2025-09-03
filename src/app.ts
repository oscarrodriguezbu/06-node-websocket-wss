import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {

    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString(),
    })
    console.log('payload desde el ws ', payload);
    
    // ws.send( JSON.stringify(payload) ); // forma sencilla

    //* Todos - incluyente, emite a todos el mensaje
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    // * Todos excluyente, emite a todos menos a la persona que esta mandando el ws
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  });

  // ws.send('Hola desde el servidor!');

  ws.on('close', () => {
    console.log('Client disconnected');
  })
});


console.log('http://localhost:3000');