"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Phase = "idle" | "pulling" | "dropping" | "bouncing" | "result";

const capsuleColors = [
  "from-red-400 to-red-600",
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-yellow-400 to-yellow-600",
  "from-purple-400 to-purple-600",
];

interface GachaContentProps {
  basePath: string;
}

export function GachaContent({ basePath }: GachaContentProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [capsuleColor] = useState(
    capsuleColors[Math.floor(Math.random() * capsuleColors.length)]
  );

  const handlePull = () => {
    setPhase("pulling");
    setTimeout(() => setPhase("dropping"), 500);
    setTimeout(() => setPhase("bouncing"), 1200);
    setTimeout(() => {
      setPhase("result");
      // 80%の確率で当選
      const isWin = Math.random() < 0.8;
      setTimeout(() => {
        router.push(isWin ? `${basePath}/win` : `${basePath}/lose`);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col">
      {/* ヘッダー */}
      <div className="bg-[#1A1A2E]/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <Link href={`${basePath}/select`} className="p-1 hover:bg-white/10 rounded-full">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="font-bold text-white">ガチャ</h1>
      </div>

      {/* ガチャマシン */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* マシン本体 */}
        <div className="relative w-64 h-80">
          {/* ドーム部分 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-white/20 to-white/5 border-4 border-white/30 overflow-hidden">
            {/* カプセル群（装飾） */}
            <div className="absolute inset-4 flex flex-wrap gap-1 items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${
                    capsuleColors[i % capsuleColors.length]
                  } opacity-60`}
                />
              ))}
            </div>
          </div>

          {/* 排出口 */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-3xl border-4 border-gray-600">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-12 bg-black/50 rounded-b-2xl" />

            {/* 落下するカプセル */}
            <AnimatePresence>
              {(phase === "dropping" || phase === "bouncing" || phase === "result") && (
                <motion.div
                  className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${capsuleColor} shadow-lg`}
                  initial={{ y: -80, opacity: 0 }}
                  animate={
                    phase === "dropping"
                      ? { y: 40, opacity: 1 }
                      : phase === "bouncing"
                      ? { y: [40, 20, 40, 30, 40] }
                      : { y: 40, scale: 1.1 }
                  }
                  transition={
                    phase === "dropping"
                      ? { type: "spring", stiffness: 300, damping: 20 }
                      : phase === "bouncing"
                      ? { duration: 0.6, times: [0, 0.25, 0.5, 0.75, 1] }
                      : { duration: 0.3 }
                  }
                >
                  {/* カプセルの線 */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/40" />

                  {/* 光エフェクト */}
                  {phase === "result" && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(255, 215, 0, 0.5)",
                          "0 0 40px rgba(255, 215, 0, 0.8)",
                          "0 0 20px rgba(255, 215, 0, 0.5)",
                        ],
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* レバー */}
          <motion.div
            className="absolute right-0 top-32 cursor-pointer"
            animate={phase === "pulling" ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-4 h-24 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full origin-top">
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-red-400" />
            </div>
          </motion.div>

          {/* ベース */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-16 bg-gradient-to-b from-[#D4AF37] to-[#B8860B] rounded-b-2xl" />
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
            onClick={handlePull}
            disabled={phase !== "idle"}
          >
            {phase === "idle" ? (
              "レバーを引く"
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
