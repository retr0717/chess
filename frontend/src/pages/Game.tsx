import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import Button from "../components/Button";
import ChessBoard from "../components/Chessboard";
import { constansts as constants } from "../constants";
import useSocket from "../hooks/useSocket";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case constants.INIT_GAME:
          setBoard(chess.board());
          setStart(true);
          console.log("Game initialized");
          break;
        case constants.MOVE:
          console.log("useeffct:", message);
          chess.move(message.payload);
          setBoard(chess.board());
          // setBoard(new Chess(board.fen()));
          break;
        default:
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="flex justify-center h-screen">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 w-full flex justify-center">
            <ChessBoard
              board={board}
              socket={socket}
              setBoard={setBoard}
              chess={chess}
            />
          </div>
          <div className="col-span-2 w-full flex justify-center">
            <div className="pt-8">
              {!start && (
                <Button
                  onClick={() => {
                    socket.send(JSON.stringify({ type: constants.INIT_GAME }));
                  }}
                >
                  Join Room
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
