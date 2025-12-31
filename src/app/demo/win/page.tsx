"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Gift, ChevronRight } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

export default function WinPage() {
  useEffect(() => {
    // 紙吹雪エフェクト
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#FFD700", "#FFA500", "#FF6347", "#00CED1", "#9370DB"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // クラッカー
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      });
    }, 500);
  }, []);

  return (
    <div className="min-h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 背景のリップルエフェクト */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full border-2 border-[#FFD700]/20"
            animate={{
              scale: [1, 2.5, 2.5],
              opacity: [0.3, 0.1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center">
        {/* トロフィーアイコン */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-28 h-28 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(255, 215, 0, 0.5)",
                  "0 0 60px rgba(255, 215, 0, 0.8)",
                  "0 0 30px rgba(255, 215, 0, 0.5)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Trophy className="w-14 h-14 text-white" />
            </motion.div>
            {/* スパークル */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + (i % 2) * 60}%`,
                  left: i < 2 ? "-20%" : "100%",
                }}
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              >
                <Sparkles className="w-5 h-5 text-[#FFD700]" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* タイトル */}
        <motion.h1
          className="text-3xl font-black text-[#FFD700] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          おめでとうございます!
        </motion.h1>

        <motion.p
          className="text-white/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          2等が当たりました!
        </motion.p>

        {/* 景品カード */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#FFD700]/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <p className="text-[#C0C0C0] text-sm">2等</p>
              <p className="text-white font-bold text-xl">30%OFF クーポン</p>
              <p className="text-white/60 text-sm">有効期限: 2025/01/31</p>
            </div>
          </div>
        </motion.div>

        {/* ボタン */}
        <motion.div
          className="space-y-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/demo/coupon">
            <Button variant="gold" size="lg">
              クーポンを確認する
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/demo/welcome">
            <Button variant="ghost" size="lg" className="text-white/60">
              トップに戻る
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
