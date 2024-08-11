import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10 flex justify-center">
      <div className="max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div className="p-4 rounded flex justify-center">
            <img src="/chessboard.jpeg" width={600} />
          </div>
          <div className="">
            <div className=" pt-11 flex justify-center">
              <h2 className="text-5xl font-semibold">Welcome to the game</h2>
            </div>
            <div className="pt-8 flex justify-center">
              <Button onClick={() => navigate("/game")}>Play</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
