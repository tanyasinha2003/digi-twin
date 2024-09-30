import { Link } from "react-router-dom";
export default function Dashboard(){
    return (

        <div className="bg-gray-200 flex justify-start p-10 items-start h-screen w-screen">
        <div className="  rounded-lg border-black bg-white px-8 py-10 shadow-2xl w-56 h-fit flex flex-col items-start">
            
         <Link to="/dashboard" className="py-4">Dashboard</Link>
         <Link to="/dashboard" className="py-4">Knowledge Graph</Link>
         <Link to="/dashboard" className="py-4">Simulation</Link>
        </div>
      </div>
    );
}