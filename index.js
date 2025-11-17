// index.js
import { WebSocketServer } from "ws";

// Render te pone el puerto en process.env.PORT
const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({
    port: PORT,
    // Muy importante: permitir conexiones del navegador sin bloqueo
    perMessageDeflate: false,
});

console.log("Servidor WebSocket funcionando en puerto", PORT);

wss.on("connection", ws => {
  console.log("Nuevo cliente conectado");

  ws.on("message", msg => {
    console.log("Mensaje recibido:", msg.toString());

    // reenviar a todos
    wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(msg.toString());
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});
