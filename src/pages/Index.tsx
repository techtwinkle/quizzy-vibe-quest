
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
          Choose your quiz category to begin
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 w-full max-w-2xl"
      >
        <Card 
          className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg hover:shadow-xl transition-all cursor-pointer"
          onClick={() => navigate("/quiz")}
        >
          <h2 className="text-2xl font-semibold mb-2">General Knowledge Quiz</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Test your knowledge across various topics with our curated questions.
          </p>
          <div className="mt-4 flex justify-end">
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Start Quiz
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
