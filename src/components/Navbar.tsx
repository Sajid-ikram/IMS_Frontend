import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lightbulb, Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Lightbulb className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                IdeaShare
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/discover"
                className={`${
                  location.pathname === "/discover"
                    ? "text-white font-bold"
                    : "text-gray-300 font-bold"
                } hover:text-white transition-colors`}
              >
                DISCOVER
              </Link>
              <Link
                to="/share"
                className={`${
                  location.pathname === "/share"
                    ? "text-white font-bold"
                    : "text-gray-300 font-bold"
                } hover:text-white transition-colors`}
              >
                SHARE
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user?._id ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
                  >
                    Logout
                  </button>

                  <p className="text-white text-sm border-2 rounded-full w-10 h-10 p-2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                    {user?.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </p>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all"
                  >
                    Register
                  </Link>
                </>
              )}
              {user?.role === "Admin" && (
                <Link
                  to="/role-change"
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
                >
                  Admin
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <Menu className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
