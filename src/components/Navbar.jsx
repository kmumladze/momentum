import { Link } from "react-router";
import Momentum from "../assets/momentum.jsx";
import Plus from "../assets/plus.jsx";

export default function Navbar() {
  return (
    <div className="flex justify-between py-8 px-32">
      <Link to="/">
        <div className="flex items-center cursor-pointer">
          <h1 className="text-[31px] text-[#8338EC] font-bold">Momentum</h1>{" "}
          <Momentum />
        </div>
      </Link>

      <div className="flex items-center gap-10">
        <div className="border border-[#8338EC] px-5 py-3 rounded-md">
          <p className="text-[#212529]">თანამშრომლის შექმნა</p>
        </div>

        <Link to="/newtask">
          <div className="flex bg-[#8338EC] text-white text-[16px] px-5 py-3 rounded-md">
            <Plus />
            <p>შექმენი ახალი დავალება</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
