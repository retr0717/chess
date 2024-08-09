import WebSocket from "ws";
import { constansts } from "./Messages";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private players: WebSocket[];
  private pendingPlayer: WebSocket | null;

  constructor() {
    this.games = [];
    this.pendingPlayer = null;
    this.players = [];
  }

  addPlayer(socket: WebSocket) {
    this.players.push(socket);
    this.addHandler(socket);
  }

  removePlayer(socket: WebSocket) {
    this.players = this.players.filter((player) => player !== socket);
  }

  addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === constansts.INIT_GAME) {
        this.createGame(socket);
      }

      if (message.type === constansts.MOVE) {
        const game = this.games.find(
          (player) => player.player1 === socket || player.player2 === socket,
        );

        if (game) {
          game.makeMove(socket, message.payload);
        }
      }
    });
  }

  createGame(player2: WebSocket) {
    if (this.pendingPlayer) {
      const game = new Game(this.pendingPlayer, player2);
      this.games.push(game);
      this.pendingPlayer = null;
    } else {
      this.pendingPlayer = player2;
    }
  }

  private handleMessage(socket: WebSocket) {}
}
