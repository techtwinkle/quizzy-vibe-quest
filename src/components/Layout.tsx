
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(45deg,#ff9a9e,#fad0c4,#fad0c4,#a18cd1,#fbc2eb)] dark:bg-[linear-gradient(45deg,#434343,#000000,#434343,#000000)] bg-[length:400%_400%] animate-gradient flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[85%] min-h-[85vh] bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-4 right-4 flex items-center gap-4">
          {user && (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
              >
                Logout
              </button>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-600/70 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="p-8 h-full">{children}</div>
      </motion.div>
    </div>
  );
}
