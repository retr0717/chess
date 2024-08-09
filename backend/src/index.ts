import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  const gameManager = new GameManager();
  gameManager.addPlayer(ws);
  ws.on("disconnect", () => gameManager.removePlayer(ws));

  ws.send("connection established");
});
