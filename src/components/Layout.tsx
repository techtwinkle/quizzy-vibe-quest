
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
    <div className="min-h-screen w-full bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[85%] min-h-[85vh] bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-4 right-4 flex items-center gap-4">
          {user && (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
