import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { constansts } from "../constants";

const ChessBoard = ({
  board,
  socket,
  setBoard,
  chess,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);

  return (
    <div className="text-xl text-gray-800">
      {board.map((row, i) => {
        return (
          <div className="flex">
            {row.map((square, j) => {
              const squareRepr = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepr);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: constansts.MOVE,
                          payload: { move: { from, to: squareRepr } },
                        }),
                      );

                      setFrom(null);
                      chess.move({ from, to: squareRepr });
                      setBoard(chess.board());
                    }
                  }}
                  className={`w-16 h-16 ${(i + j) % 2 === 0 ? "bg-slate-300" : "bg-green-700"} `}
                >
                  <div className="w-full flex justify-center h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? (
                        <img
                          className="w-10 h-4/5 "
                          src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()}%20copy`}.png`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
