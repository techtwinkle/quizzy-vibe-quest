
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-[75vh] space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome, {user?.name}!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Ready to test your knowledge?
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={() => navigate("/quiz")}
          className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          Start Quiz
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;
