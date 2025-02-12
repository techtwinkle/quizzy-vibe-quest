
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(name, pin)) {
      toast({
        title: "Welcome back!",
        description: `Nice to see you again, ${name}!`,
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Invalid PIN. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-[75vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
          Welcome to QuizVibe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="bg-white/50 dark:bg-gray-700/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">PIN (1234)</label>
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              required
              maxLength={4}
              className="bg-white/50 dark:bg-gray-700/50"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
