"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col">
      {/* ヘッダー装飾 */}
      <div className="relative h-48 overflow-hidden">
        {/* 背景の光エフェクト */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#D4AF37]/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* スター装飾 */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Star className="w-4 h-4 text-[#FFD700]/60" fill="#FFD700" />
          </motion.div>
        ))}

        {/* メインアイコン */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center shadow-xl">
            <Gift className="w-12 h-12 text-white" />
          </div>
        </motion.div>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 px-6 pb-8 flex flex-col">
        {/* タイトル */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-white mb-2">
            新春キャンペーン
          </h1>
          <p className="text-[#D4AF37] font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            豪華景品が当たる抽選会
            <Sparkles className="w-4 h-4" />
          </p>
        </motion.div>

        {/* 景品カード */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm font-medium text-[#D4AF37] mb-3">景品一覧</h2>
          <div className="space-y-3">
            {[
              { rank: "1等", prize: "50%OFF クーポン", color: "text-[#FFD700]" },
              { rank: "2等", prize: "30%OFF クーポン", color: "text-[#C0C0C0]" },
              { rank: "3等", prize: "10%OFF クーポン", color: "text-[#CD7F32]" },
              { rank: "参加賞", prize: "5%OFF クーポン", color: "text-white/60" },
            ].map((item, i) => (
              <motion.div
                key={item.rank}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className={`font-bold ${item.color} w-12`}>{item.rank}</span>
                <span className="text-white text-sm">{item.prize}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* キャンペーン期間 */}
        <motion.div
          className="text-center mb-6 text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p>キャンペーン期間</p>
          <p className="text-white font-medium">2025年1月1日 〜 1月31日</p>
        </motion.div>

        {/* 参加ボタン */}
        <motion.div
          className="mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/demo/select">
            <Button variant="gold" size="lg">
              <Gift className="w-5 h-5" />
              抽選に参加する
            </Button>
          </Link>
          <p className="text-center text-white/40 text-xs mt-3">
            1日1回参加できます
          </p>
        </motion.div>
      </div>
    </div>
  );
}
