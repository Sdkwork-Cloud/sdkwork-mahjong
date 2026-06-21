import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Clock,
  Zap,
  Trophy,
  User,
  Bot,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BrainCircuit,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "sdkwork-mahjong-pc-core";

interface QuizGameProps {
  mode: "stage" | "pk";
  subject: string;
  onExit: () => void;
}

const QUESTIONS = [
  {
    id: 1,
    text: "量子力学中，薛定谔的猫处于什么状态？",
    options: ["�?, "�?, "既生又死", "不确�?],
    answer: 2,
  },
  {
    id: 2,
    text: "光速在真空中的速度大约是多少？",
    options: ["30万公�?�?, "3万公�?�?, "300万公�?�?, "3000公里/�?],
    answer: 0,
  },
  {
    id: 3,
    text: "圆周率π的小数点后第三位数字是？",
    options: ["1", "4", "5", "9"],
    answer: 0,
  },
  {
    id: 4,
    text: "相对论的提出者是谁？",
    options: ["牛顿", "爱因斯坦", "霍金", "伽利�?],
    answer: 1,
  },
  {
    id: 5,
    text: "人类历史上第一个登上月球的人是�?,
    options: ["加加�?, "阿姆斯特�?, "奥尔德林", "科林�?],
    answer: 1,
  },
  {
    id: 6,
    text: "《清明上河图》描绘的是哪个朝代的城市风貌�?,
    options: ["唐朝", "宋朝", "明朝", "清朝"],
    answer: 1,
  },
  {
    id: 7,
    text: "勾股定理中，直角三角形的两条直角边的平方和等于？",
    options: ["斜边的平�?, "斜边的两�?, "面积的平�?, "周长的平�?],
    answer: 0,
  },
  {
    id: 8,
    text: "被称为“万物之理”的物理学理论是�?,
    options: ["经典力学", "量子力学", "弦理�?, "相对�?],
    answer: 2,
  },
  {
    id: 9,
    text: "世界上最长的河流是？",
    options: ["长江", "亚马逊河", "尼罗�?, "密西西比�?],
    answer: 2,
  },
  {
    id: 10,
    text: "计算机科学之父是谁？",
    options: ["冯·诺依曼", "阿兰·图灵", "比尔·盖茨", "乔布�?],
    answer: 1,
  },
  {
    id: 11,
    text: "太阳系中体积最大的行星是？",
    options: ["地球", "火星", "木星", "土星"],
    answer: 2,
  },
  {
    id: 12,
    text: "中国古代四大发明不包括以下哪一项？",
    options: ["造纸�?, "指南�?, "火药", "地动�?],
    answer: 3,
  },
];

export default function QuizGame({ mode, subject, onExit }: QuizGameProps) {
  const { t } = useTranslation();
  const { addPoints, addExp } = useUserStore();
  const [gameState, setGameState] = useState<
    "intro" | "ready" | "playing" | "result" | "game_over"
  >("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  // PK Mode specific
  const [canBuzz, setCanBuzz] = useState(false);
  const [hasBuzzed, setHasBuzzed] = useState(false);
  const [buzzerWinner, setBuzzerWinner] = useState<
    "player" | "opponent" | null
  >(null);
  const [flashColor, setFlashColor] = useState<"emerald" | "red" | null>(null);

  const [quizmasterText, setQuizmasterText] = useState(
    t('quiz_welcome')
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const buzzerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    if (gameState === "intro") {
      setTimeout(() => setGameState("ready"), 2000);
    } else if (gameState === "ready") {
      setQuizmasterText(t('question_number', { number: currentQuestionIndex + 1 }));
      setTimeout(() => {
        setGameState("playing");
        startQuestion();
      }, 2000);
    }
  }, [gameState, currentQuestionIndex, t]);

  const startQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setHasBuzzed(false);
    setBuzzerWinner(null);
    setTimeLeft(10);
    setFlashColor(null);

    if (mode === "pk") {
      setCanBuzz(false);
      setQuizmasterText(t('prepare_buzz'));
      // Random delay before buzzer becomes active
      const delay = Math.random() * 2000 + 1000;
      buzzerTimeoutRef.current = setTimeout(() => {
        setCanBuzz(true);
        setQuizmasterText(t('buzz_start'));

        // AI opponent might buzz
        const aiBuzzDelay = Math.random() * 1500 + 500;
        buzzerTimeoutRef.current = setTimeout(() => {
          if (!hasBuzzed) {
            handleOpponentBuzz();
          }
        }, aiBuzzDelay);
      }, delay);
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBuzz = () => {
    if (!canBuzz || hasBuzzed) return;
    if (buzzerTimeoutRef.current) clearTimeout(buzzerTimeoutRef.current);

    setHasBuzzed(true);
    setBuzzerWinner("player");
    setQuizmasterText(t('you_buzzed'));
    startTimer();
  };

  const handleOpponentBuzz = () => {
    if (hasBuzzed) return;
    setHasBuzzed(true);
    setBuzzerWinner("opponent");
    setQuizmasterText(t('opponent_buzzed'));

    // Simulate opponent answering
    setTimeout(() => {
      const isOpponentCorrect = Math.random() > 0.3; // 70% chance AI is correct
      if (isOpponentCorrect) {
        setOpponentScore((prev) => prev + 10);
        setQuizmasterText(t('opponent_correct'));
        setFlashColor("red");
      } else {
        setOpponentScore((prev) => prev - 5);
        setQuizmasterText(t('opponent_wrong'));
        setFlashColor("emerald");
      }
      setTimeout(nextQuestion, 2000);
    }, 2000);
  };

  const handleTimeOut = () => {
    if (mode === "stage") {
      setGameState("game_over");
      setQuizmasterText(t('time_up_fail'));
    } else {
      setQuizmasterText(t('time_up_nobody'));
      setTimeout(nextQuestion, 2000);
    }
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    if (mode === "pk" && buzzerWinner !== "player") return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOption(index);

    const correct = index === currentQuestion.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 10);
      setQuizmasterText(t('answer_correct'));
      setFlashColor("emerald");
      setTimeout(nextQuestion, 2000);
    } else {
      setFlashColor("red");
      if (mode === "stage") {
        setQuizmasterText(t('answer_wrong_end'));
        setTimeout(() => setGameState("game_over"), 2000);
      } else {
        setScore((prev) => prev - 5);
        setQuizmasterText(t('answer_wrong_penalty'));
        setTimeout(nextQuestion, 2000);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setGameState("ready");
    } else {
      setGameState("game_over");
      if (mode === "stage") {
        setQuizmasterText(t('stage_clear'));
        addPoints(1000); // Reward for clearing stage
        addExp(100);
      } else {
        const isWin = score > opponentScore;
        setQuizmasterText(
          isWin
            ? t('you_win')
            : score < opponentScore
              ? t('you_lose')
              : t('draw')
        );
        if (isWin) {
          addPoints(500); // Reward for winning PK
          addExp(150);
        } else {
          addExp(50);
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (buzzerTimeoutRef.current) clearTimeout(buzzerTimeoutRef.current);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
      {/* Flash Overlay */}
      <AnimatePresence>
        {flashColor && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 z-50 pointer-events-none ${
              flashColor === "emerald" ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <span className="font-bold text-zinc-900 dark:text-white">
            {mode === "stage" ? t('extreme_stage') : t('1v1_pk')}
          </span>
        </div>

        {mode === "stage" && (
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-full">
            <Trophy size={16} className="text-orange-500" />
            <span className="font-mono font-bold text-zinc-900 dark:text-white">
              {currentQuestionIndex + 1} / 12
            </span>
          </div>
        )}
      </div>

      {/* Quizmaster Area */}
      <div className="p-6 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-100 dark:from-zinc-900 to-zinc-50 dark:to-zinc-950 border-b border-zinc-200/50 dark:border-zinc-800/50 z-10">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 p-1 shadow-[0_0_20px_rgba(225,29,72,0.4)]">
            <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
              <BrainCircuit size={32} className="text-rose-500" />
            </div>
          </div>
          {gameState === "playing" &&
            mode === "pk" &&
            canBuzz &&
            !hasBuzzed && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
              </span>
            )}
        </div>
        <div className="mt-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 max-w-md text-center shadow-lg">
          <p className="text-zinc-900 dark:text-white font-medium">{quizmasterText}</p>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="flex-1 p-6 flex flex-col relative z-0">
        {mode === "pk" && (
          <div className="flex justify-between items-center mb-8 px-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border-2 border-rose-500">
                <User size={20} className="text-rose-500" />
              </div>
              <span className="font-mono font-black text-2xl text-zinc-900 dark:text-white">
                {score}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border-2 border-blue-500">
                <Bot size={20} className="text-blue-500" />
              </div>
              <span className="font-mono font-black text-2xl text-zinc-900 dark:text-white">
                {opponentScore}
              </span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {gameState === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 flex items-center justify-center z-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm"
            >
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 animate-pulse drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]">
                {t('ready')}
              </h2>
            </motion.div>
          )}

          {gameState === "ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex items-center justify-center z-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm"
            >
              <h2 className="text-7xl font-black text-zinc-900 dark:text-white font-mono drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                {t('question_number_short', { number: currentQuestionIndex + 1 })}
              </h2>
            </motion.div>
          )}

          {(gameState === "playing" || gameState === "result") && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col max-w-3xl mx-auto w-full h-full justify-between pb-8"
            >
              {/* Timer & Question Container */}
              <div className="flex flex-col items-center w-full">
                {!hasBuzzed && mode === "pk" ? null : (
                  <div className="flex justify-center mb-6">
                    <div
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono font-black text-3xl shadow-lg ${
                        timeLeft <= 3
                          ? "bg-red-500 text-white animate-pulse shadow-red-500/50"
                          : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700"
                      }`}
                    >
                      <Clock size={28} />
                      00:{timeLeft.toString().padStart(2, "0")}
                    </div>
                  </div>
                )}

                {/* Question */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 mb-8 shadow-2xl w-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500"></div>
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white leading-relaxed text-center">
                    {currentQuestion.text}
                  </h3>
                </div>
              </div>

              {/* PK Buzzer */}
              {mode === "pk" && !hasBuzzed && (
                <div className="flex-1 flex items-center justify-center">
                  <button
                    onClick={handleBuzz}
                    disabled={!canBuzz}
                    className={`w-64 h-64 rounded-full flex flex-col items-center justify-center gap-4 transition-all duration-100 relative ${
                      canBuzz
                        ? "bg-gradient-to-b from-rose-500 to-rose-700 hover:from-rose-400 hover:to-rose-600 shadow-[0_15px_0_#9f1239,0_20px_40px_rgba(225,29,72,0.6)] active:shadow-[0_0px_0_#9f1239,0_0px_0px_rgba(225,29,72,0.6)] active:translate-y-[15px]"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 shadow-[0_15px_0_#e4e4e7] dark:shadow-[0_15px_0_#27272a]"
                    }`}
                  >
                    {canBuzz && (
                      <div className="absolute inset-0 rounded-full animate-ping bg-rose-500/30"></div>
                    )}
                    <Zap
                      size={64}
                      className={
                        canBuzz ? "text-white drop-shadow-lg" : "text-zinc-400 dark:text-zinc-600"
                      }
                    />
                    <span
                      className={`font-black text-4xl tracking-widest ${canBuzz ? "text-white drop-shadow-lg" : "text-zinc-400 dark:text-zinc-600"}`}
                    >
                      {t('buzz')}
                    </span>
                  </button>
                </div>
              )}

              {/* Options */}
              {(mode === "stage" || (mode === "pk" && hasBuzzed)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {currentQuestion.options.map((option, index) => {
                    let btnClass =
                      "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600";
                    let icon = null;

                    if (selectedOption === index) {
                      if (isCorrect) {
                        btnClass =
                          "bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                        icon = (
                          <CheckCircle2
                            size={24}
                            className="text-emerald-500 dark:text-emerald-400"
                          />
                        );
                      } else {
                        btnClass =
                          "bg-red-50 dark:bg-red-500/20 border-red-500 text-red-600 dark:text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                        icon = <XCircle size={24} className="text-red-500 dark:text-red-400" />;
                      }
                    } else if (
                      selectedOption !== null &&
                      index === currentQuestion.answer
                    ) {
                      // Show correct answer if user was wrong
                      btnClass =
                        "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-500";
                      icon = (
                        <CheckCircle2 size={24} className="text-emerald-500" />
                      );
                    }

                    const isDisabled =
                      selectedOption !== null ||
                      (mode === "pk" && buzzerWinner !== "player");

                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={isDisabled}
                        className={`p-6 rounded-2xl border-2 text-left font-bold text-xl transition-all flex justify-between items-center group ${btnClass} ${isDisabled ? "cursor-not-allowed opacity-90" : "hover:scale-[1.02]"}`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black transition-colors ${
                              selectedOption === index
                                ? "bg-transparent"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </div>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {gameState === "game_over" && (
            <motion.div
              key="game_over"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                <Trophy size={64} className="text-orange-500 mx-auto mb-6" />
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">
                  {t('game_over')}
                </h2>

                {mode === "stage" ? (
                  <div className="my-8">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-2">{t('final_score')}</p>
                    <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 font-mono">
                      {score}
                    </p>
                    <p className="text-zinc-500 mt-4">
                      {t('correct_answers_count', { count: currentQuestionIndex })}
                    </p>
                  </div>
                ) : (
                  <div className="my-8 flex justify-center items-center gap-8">
                    <div className="text-center">
                      <p className="text-zinc-500 dark:text-zinc-400 mb-2">{t('you')}</p>
                      <p
                        className={`text-5xl font-black font-mono ${score >= opponentScore ? "text-rose-500" : "text-zinc-400 dark:text-zinc-500"}`}
                      >
                        {score}
                      </p>
                    </div>
                    <div className="text-2xl font-black text-zinc-300 dark:text-zinc-700">VS</div>
                    <div className="text-center">
                      <p className="text-zinc-500 dark:text-zinc-400 mb-2">{t('opponent')}</p>
                      <p
                        className={`text-5xl font-black font-mono ${opponentScore >= score ? "text-blue-500" : "text-zinc-400 dark:text-zinc-500"}`}
                      >
                        {opponentScore}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={onExit}
                  className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold transition-colors"
                >
                  {t('back_to_lobby')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
