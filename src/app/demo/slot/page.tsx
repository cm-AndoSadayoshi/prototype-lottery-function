"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const symbols = ["7", "BAR", "BELL", "CHERRY", "LEMON"];
const symbolColors: Record<string, string> = {
  "7": "text-red-500",
  BAR: "text-purple-500",
  BELL: "text-yellow-500",
  CHERRY: "text-pink-500",
  LEMON: "text-green-500",
};

type Phase = "idle" | "spinning" | "stopping" | "result";

export default function SlotPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [reels, setReels] = useState([
    { value: "7", spinning: false, stopped: false },
    { value: "BAR", spinning: false, stopped: false },
    { value: "BELL", spinning: false, stopped: false },
  ]);
  const [spinValues, setSpinValues] = useState(["7", "BAR", "BELL"]);

  // スピン中のアニメーション
  useEffect(() => {
    if (phase !== "spinning" && phase !== "stopping") return;

    const interval = setInterval(() => {
      setSpinValues((prev) =>
        prev.map((_, i) => {
          if (reels[i].stopped) return reels[i].value;
          return symbols[Math.floor(Math.random() * symbols.length)];
        })
      );
    }, 80);

    return () => clearInterval(interval);
  }, [phase, reels]);

  const handleSpin = useCallback(() => {
    setPhase("spinning");
    setReels([
      { value: "7", spinning: true, stopped: false },
      { value: "BAR", spinning: true, stopped: false },
      { value: "BELL", spinning: true, stopped: false },
    ]);

    // 80%の確率で当選
    const isWin = Math.random() < 0.8;
    const winSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    // 順番に停止
    setTimeout(() => {
      setPhase("stopping");
      const finalValue = isWin ? winSymbol : symbols[0];
      setReels((prev) => [
        { ...prev[0], value: finalValue, stopped: true },
        prev[1],
        prev[2],
      ]);
    }, 1000);

    setTimeout(() => {
      const finalValue = isWin ? winSymbol : symbols[1];
      setReels((prev) => [
        prev[0],
        { ...prev[1], value: finalValue, stopped: true },
        prev[2],
      ]);
    }, 1500);

    setTimeout(() => {
      const finalValue = isWin ? winSymbol : symbols[2];
      setReels((prev) => [
        prev[0],
        prev[1],
        { ...prev[2], value: finalValue, stopped: true },
      ]);
      setPhase("result");

      setTimeout(() => {
        router.push(isWin ? "/demo/win" : "/demo/lose");
      }, 1500);
    }, 2000);
  }, [router]);

  const isAllStopped = reels.every((r) => r.stopped);
  const isWin = isAllStopped && reels.every((r) => r.value === reels[0].value);

  return (
    <div className="min-h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col">
      {/* ヘッダー */}
      <div className="bg-[#1A1A2E]/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <Link href="/demo/select" className="p-1 hover:bg-white/10 rounded-full">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="font-bold text-white">スロット</h1>
      </div>

      {/* スロットマシン */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* マシン本体 */}
        <div className="relative">
          {/* 外枠 */}
          <div className="bg-gradient-to-b from-[#D4AF37] to-[#B8860B] p-3 rounded-3xl shadow-2xl">
            {/* 内枠 */}
            <div className="bg-gray-900 p-4 rounded-2xl">
              {/* タイトル */}
              <div className="text-center mb-4">
                <span className="text-[#FFD700] font-bold text-lg tracking-wider">
                  LUCKY SLOT
                </span>
              </div>

              {/* リール表示エリア */}
              <div className="bg-white rounded-xl p-2 flex gap-2">
                {reels.map((reel, i) => (
                  <div
                    key={i}
                    className={`w-20 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden ${
                      isWin && phase === "result"
                        ? "ring-4 ring-[#FFD700] animate-pulse"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={
                        !reel.stopped && phase !== "idle"
                          ? { y: [0, -10, 0] }
                          : {}
                      }
                      transition={
                        !reel.stopped && phase !== "idle"
                          ? { duration: 0.1, repeat: Infinity }
                          : {}
                      }
                    >
                      <span
                        className={`text-3xl font-black ${
                          symbolColors[reel.stopped ? reel.value : spinValues[i]]
                        }`}
                      >
                        {reel.stopped ? reel.value : spinValues[i]}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* ペイライン */}
              {phase === "result" && isWin && (
                <motion.div
                  className="absolute top-1/2 left-3 right-3 h-1 bg-[#FFD700]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* 装飾ライト */}
              <div className="flex justify-around mt-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 rounded-full bg-red-500"
                    animate={
                      phase !== "idle"
                        ? {
                            backgroundColor: ["#ef4444", "#22c55e", "#ef4444"],
                            boxShadow: [
                              "0 0 10px #ef4444",
                              "0 0 20px #22c55e",
                              "0 0 10px #ef4444",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* JACKPOT表示 */}
          {phase === "result" && isWin && (
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-[#FFD700] font-black text-2xl drop-shadow-lg">
                JACKPOT!
              </span>
            </motion.div>
          )}
        </div>

        {/* ボタン */}
        <motion.div
          className="mt-8 w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="gold"
            size="lg"
            onClick={handleSpin}
            disabled={phase !== "idle"}
          >
            {phase === "idle" ? (
              "スタート"
            ) : phase === "result" ? (
              "結果を確認中..."
            ) : (
              "回転中..."
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
