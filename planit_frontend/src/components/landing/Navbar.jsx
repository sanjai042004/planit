import { Link } from "react-router-dom";

export const Navbar = ({ onLogin }) => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow px-10 py-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
        ✓ <span>PlanIt</span>
      </Link>

      <div className="hidden md:flex gap-6 text-gray-500">
        <button
          onClick={() =>
            document.getElementById("features")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="text-gray-500 hover:text-teal-500"
        >
          Features
        </button>
        <a href="#">How it works</a>
        <a href="#">Pricing</a>
      </div>

      <button
        onClick={onLogin}
        className="bg-teal-500 text-white px-5 py-2 rounded-lg cursor-pointer"
      >
        Get Started
      </button>
    </nav>
  );
};
