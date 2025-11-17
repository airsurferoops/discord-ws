// index.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: process.env.PORT || 3000 });

wss.on("connection", ws => {
  console.log("Nuevo cliente conectado");

  ws.on("message", msg => {
    console.log("Mensaje recibido:", msg.toString());
    wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(msg.toString());
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});
