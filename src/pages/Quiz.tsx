
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  // Add more questions here
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const score = answers.reduce(
    (acc, answer, index) =>
      answer === questions[index].correct ? acc + 1 : acc,
    0
  );

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-[75vh] space-y-8"
      >
        <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quiz Complete!
          </h2>
          <p className="text-xl mb-6">
            Your score: {score} out of {questions.length}
          </p>
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Back to Home
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[75vh]">
      <div className="w-full max-w-2xl">
        <Progress
          value={(currentQuestion / questions.length) * 100}
          className="mb-8"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
              <h2 className="text-2xl font-bold mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    variant="outline"
                    className="p-6 text-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
