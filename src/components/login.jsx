import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Button({ value }) {
  return (
    <button
      onClick={(e) => e.preventDefault()}
      className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-black to-black hover:from-black-800 hover:to-black-800 focus:bg-black-900 transform hover:-translate-y-1 hover:shadow-lg"
    >
      {value}
    </button>
  );
}

function Input({ type, id, name, label, placeholder, autofocus }) {
  return (
    <label className="text-gray-500 block mt-3 text-left">
      {label}
      <input
        autoFocus={autofocus}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
      />
    </label>
  );
}

export default function LoginForm() {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("hey");
    navigate("/dashboard");
  };
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className=" border-t-8 rounded-sm border-black bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Log In</h1>
        <form>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="me@example.com"
            autofocus={true}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
          />
          {/* <Button value="Submit" onClick={handleClick} /> */}
          <Link to="/dashboard" className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-black to-black hover:from-black-800 hover:to-black-800 focus:bg-black-900 transform hover:-translate-y-1 hover:shadow-lg"
    >
            Submit
          </Link>
        </form>
      </div>
    </div>
  );
}
