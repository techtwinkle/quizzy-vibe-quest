
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

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
  {
    question: "What is the largest mammal on Earth?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correct: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    correct: 1,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Fe", "Au", "Cu"],
    correct: 2,
  },
  {
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "Brazil"],
    correct: 2,
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correct: 2,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1,
  },
  {
    question: "What is the main component of the Sun?",
    options: ["Helium", "Oxygen", "Hydrogen", "Nitrogen"],
    correct: 2,
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft, showResults]);

  const handleTimeout = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
      setAnswers((prev) => [...prev, -1]);
      toast({
        title: "Time's up!",
        description: "Moving to next question...",
        variant: "destructive",
      });
    } else {
      setShowResults(true);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const isCorrect = optionIndex === questions[currentQuestion].correct;
    
    toast({
      title: isCorrect ? "Correct!" : "Incorrect!",
      description: isCorrect ? "Great job!" : "Better luck next time!",
      variant: isCorrect ? "default" : "destructive",
    });

    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-[75vh] space-y-8"
      >
        <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg w-full max-w-md">
          <motion.h2 
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Quiz Complete!
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-6xl font-bold mb-6 text-center"
          >
            {score} / {questions.length}
          </motion.div>
          <p className="text-xl mb-6 text-center">
            {score === questions.length
              ? "Perfect score! Amazing job! 🎉"
              : score >= questions.length / 2
              ? "Well done! Keep practicing! 👏"
              : "Keep learning and try again! 💪"}
          </p>
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white"
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
        <div className="mb-8 space-y-2">
          <Progress
            value={(currentQuestion / questions.length) * 100}
            className="h-2"
          />
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestion + 1}/{questions.length}</span>
            <span className={`font-medium ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
              Time left: {timeLeft}s
            </span>
          </div>
        </div>
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
                    className="p-6 text-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-purple-600 hover:text-white transition-all"
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
