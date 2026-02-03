"use client";

import { motion } from "framer-motion";
import { Frown, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LoseContentProps {
  basePath: string;
}

export function LoseContent({ basePath }: LoseContentProps) {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col items-center justify-center px-6">
      {/* メインコンテンツ */}
      <div className="text-center">
        {/* アイコン */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center shadow-xl mx-auto">
            <Frown className="w-14 h-14 text-white/60" />
          </div>
        </motion.div>

        {/* タイトル */}
        <motion.h1
          className="text-2xl font-bold text-white/80 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          残念...
        </motion.h1>

        <motion.p
          className="text-white/60 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          今回はハズレでした
        </motion.p>

        {/* メッセージカード */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-white/80 text-sm leading-relaxed">
            また明日挑戦してください！
            <br />
            毎日1回参加できます。
          </p>
        </motion.div>

        {/* 励ましメッセージ */}
        <motion.div
          className="bg-[#D4AF37]/10 rounded-xl px-6 py-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#D4AF37] text-sm">
            次回のキャンペーンもお楽しみに!
          </p>
        </motion.div>

        {/* ボタン */}
        <motion.div
          className="space-y-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href={`${basePath}/select`}>
            <Button variant="gold" size="lg">
              <RefreshCw className="w-5 h-5" />
              もう一度挑戦する
            </Button>
          </Link>
          <Link href={`${basePath}/welcome`}>
            <Button variant="ghost" size="lg" className="text-white/60">
              <Home className="w-5 h-5" />
              トップに戻る
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
