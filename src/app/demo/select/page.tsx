"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Dices, CircleDot, Layers } from "lucide-react";
import Link from "next/link";

const lotteryTypes = [
  {
    id: "gacha",
    name: "ガチャ",
    description: "カプセルを回して運試し！",
    icon: CircleDot,
    href: "/demo/gacha",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "slot",
    name: "スロット",
    description: "リールを揃えて大当たり！",
    icon: Dices,
    href: "/demo/slot",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: "speedlot",
    name: "スピードくじ",
    description: "カードをめくって即結果！",
    icon: Layers,
    href: "/demo/speedlot",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function SelectPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col">
      {/* ヘッダー */}
      <div className="bg-[#1A1A2E]/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <Link href="/demo/welcome" className="p-1 hover:bg-white/10 rounded-full">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="font-bold text-white">抽選方法を選択</h1>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 px-5 py-6">
        <motion.p
          className="text-white/60 text-sm text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          お好きな抽選方法をお選びください
        </motion.p>

        <div className="space-y-4">
          {lotteryTypes.map((type, i) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link href={type.href}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 border border-white/10 hover:border-[#D4AF37]/50 transition-colors"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-white font-bold text-lg">{type.name}</h2>
                      <p className="text-white/60 text-sm">{type.description}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ChevronLeft className="w-5 h-5 text-white/60 rotate-180" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* 説明テキスト */}
        <motion.div
          className="mt-8 bg-[#D4AF37]/10 rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#D4AF37] text-sm text-center">
            どの抽選方法を選んでも当選確率は同じです
          </p>
        </motion.div>
      </div>
    </div>
  );
}
