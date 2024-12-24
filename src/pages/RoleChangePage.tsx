import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, User, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const roles = ["Employee", "Innovation", "Regional"];

export default function RoleChangePage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) navigate("/login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !role) {
      setError(`Please fill all the fields.`);
      return;
    }

    try {
      if (!user?._id) {
        throw new Error("User is not authenticated.");
      }
      const response = await fetch(
        `https://ism-server.onrender.com/api/users/change-role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            userEmailToBeChanged: email,
            newRole: role,
          }),
        }
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }

      console.log("role changed");
      navigate("/");
    } catch (error: unknown) {
      let errorMessage = `Failed to change role for ${email}`;
      if (error instanceof Error) {
        errorMessage = `${errorMessage}, ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage = `${errorMessage}, ${error}`;
      } else {
        errorMessage = `${errorMessage}, ${JSON.stringify(error)}`;
      }
      setError(errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 flex items-center justify-center"
    >
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Admin</h1>
          <p className="text-gray-400">Change role of the user</p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              User Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter user email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              User Role
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((roleOption) => (
                  <option
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                    key={roleOption}
                    value={roleOption}
                  >
                    {roleOption}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all flex items-center justify-center gap-2"
          >
            <ArrowRight className="h-5 w-5" />
            Change Role
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Back to Home?{" "}
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Go Home
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
