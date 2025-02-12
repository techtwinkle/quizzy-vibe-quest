
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Book, Atom, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quizCategories = [
    {
      id: 'general',
      title: 'General Knowledge',
      description: 'Test your knowledge across various topics',
      icon: Book,
      path: '/quiz',
      active: true
    },
    {
      id: 'science',
      title: 'Science & Tech',
      description: 'Explore the world of science and technology',
      icon: Atom,
      path: '/quiz',
      active: false
    },
    {
      id: 'sports',
      title: 'Sports & Games',
      description: 'Challenge yourself with sports trivia',
      icon: Trophy,
      path: '/quiz',
      active: false
    }
  ];

  return (
    <div className="flex flex-col items-start justify-start min-h-[75vh] p-6 space-y-8 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome, {user?.name}!
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {quizCategories.map((category) => (
          <Card
            key={category.id}
            className={`p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg transition-all ${
              category.active 
                ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => category.active && navigate(category.path)}
          >
            <div className="flex flex-col h-full space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {category.description}
                </p>
              </div>
              {!category.active && (
                <div className="text-sm text-gray-500 mt-auto">
                  Coming soon
                </div>
              )}
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default Index;
