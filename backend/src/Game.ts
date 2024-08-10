import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { constansts } from "./Messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;
  private moveCount: number;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.moveCount = 0;

    console.log("game constructor");

    this.player1.send(
      JSON.stringify({
        type: constansts.INIT_GAME,
        payload: { color: "white" },
      }),
    );
    this.player2.send(
      JSON.stringify({
        type: constansts.INIT_GAME,
        payload: { color: "black" },
      }),
    );
  }

  makeMove(player: WebSocket, payload: { move: { from: string; to: string } }) {
    //validate the player's turn.
    console.log("make move", payload.move, this.moveCount);
    if (this.moveCount % 2 === 0 && player !== this.player1) {
      return;
    }
    if (this.moveCount % 2 === 1 && player !== this.player2) {
      return;
    }

    console.log("turn check");
    //validate the chess moves.
    try {
      this.board.move(payload.move);
    } catch (error) {
      console.log(error);
      return;
    }

    console.log("validator");

    //check of the game is over and send the game over message.
    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: constansts.GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? constansts.O : constansts.X,
          },
        }),
      );

      console.log("game over");

      //player2 gamer over sent.
      this.player2.emit(
        JSON.stringify({
          type: constansts.GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? constansts.O : constansts.X,
          },
        }),
      );

      return;
    }

    console.log("game over check");

    //let the players know about the turn.
    if (this.moveCount % 2 === 0) {
      console.log("player2 move");
      this.player2.send(
        JSON.stringify({
          type: constansts.MOVE,
          payload: payload.move,
        }),
      );
    } else {
      console.log("player1 move");
      this.player1.send(
        JSON.stringify({
          type: constansts.MOVE,
          payload: payload.move,
        }),
      );
    }
    this.moveCount++;
  }
}
