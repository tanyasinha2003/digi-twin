import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-center gap-3 pt-[2rem]">
      <div className="px-4 py-3 bg-[#ececec] rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <Link to="/dashboard" className="py-4">
          Dashboard
        </Link>
      </div>
      <div className="px-4 py-3 bg-[#ececec] rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <Link to="/knowledge-graph" className="py-4">
          Knowledge Graph
        </Link>
      </div>
      <div className="px-4 py-3 bg-[#ececec] rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <Link to="/dashboard" className="py-4">
          Simulation
        </Link>
      </div>

     
    </div>
  );
}

export default Navbar;
