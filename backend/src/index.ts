import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  gameManager.addPlayer(ws);
  ws.on("disconnect", () => gameManager.removePlayer(ws));

  ws.send("connection established");
});
