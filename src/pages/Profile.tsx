
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center h-[75vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Profile
          </h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Name
              </label>
              <p className="text-xl font-medium">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Quiz Stats
              </label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quizzes Taken
                  </p>
                </div>
                <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Avg Score
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
