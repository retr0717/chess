import { Color, PieceSymbol, Square } from "chess.js";

const ChessBoard = ({
  board,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}) => {
  return (
    <div className="text-xl text-gray-800">
      {board.map((row, i) => {
        return (
          <div className="flex">
            {row.map((square, j) => {
              return (
                <div
                  className={`w-16 h-16 ${(i + j) % 2 === 0 ? "bg-slate-300" : "bg-green-700"} p-10`}
                >
                  <div className="w-full flex justify-center h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? square.type : ""}
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
