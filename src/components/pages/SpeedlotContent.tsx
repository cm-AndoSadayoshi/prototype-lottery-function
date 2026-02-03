"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Star, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Card {
  id: number;
  isFlipped: boolean;
  isWinner: boolean;
}

interface SpeedlotContentProps {
  basePath: string;
}

export function SpeedlotContent({ basePath }: SpeedlotContentProps) {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>(() => {
    // ランダムに1枚を当たりにする
    const winnerIndex = Math.floor(Math.random() * 3);
    return [
      { id: 1, isFlipped: false, isWinner: winnerIndex === 0 },
      { id: 2, isFlipped: false, isWinner: winnerIndex === 1 },
      { id: 3, isFlipped: false, isWinner: winnerIndex === 2 },
    ];
  });
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFlip = (cardId: number) => {
    if (selectedCard !== null) return;

    setSelectedCard(cardId);
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    // 結果表示後に遷移
    setTimeout(() => {
      setShowResult(true);
      const isWin = cards.find((c) => c.id === cardId)?.isWinner;
      setTimeout(() => {
        router.push(isWin ? `${basePath}/win` : `${basePath}/lose`);
      }, 1500);
    }, 800);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col">
      {/* ヘッダー */}
      <div className="bg-[#1A1A2E]/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <Link href={`${basePath}/select`} className="p-1 hover:bg-white/10 rounded-full">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="font-bold text-white">スピードくじ</h1>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.p
          className="text-white/80 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          カードを1枚選んでタップしてください
        </motion.p>

        {/* カード */}
        <div className="flex gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              className="perspective-1000"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <motion.div
                className={`relative w-24 h-36 cursor-pointer preserve-3d ${
                  selectedCard !== null && selectedCard !== card.id
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => handleFlip(card.id)}
                whileTap={selectedCard === null ? { scale: 0.95 } : {}}
              >
                {/* カード裏面 */}
                <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] shadow-lg flex items-center justify-center border-4 border-[#FFD700]/30">
                  <div className="text-center">
                    <div className="text-4xl mb-1">?</div>
                    <div className="text-xs text-white/60">タップ</div>
                  </div>
                </div>

                {/* カード表面 */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-lg flex items-center justify-center border-4">
                  {card.isWinner ? (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex flex-col items-center justify-center border-[#FFD700]"
                      animate={
                        showResult
                          ? {
                              boxShadow: [
                                "0 0 20px rgba(255, 215, 0, 0.5)",
                                "0 0 40px rgba(255, 215, 0, 0.8)",
                                "0 0 20px rgba(255, 215, 0, 0.5)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Star className="w-10 h-10 text-white" fill="white" />
                      <span className="text-white font-bold mt-2">当たり!</span>
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex flex-col items-center justify-center border-gray-400">
                      <X className="w-10 h-10 text-white/60" />
                      <span className="text-white/60 font-bold mt-2">ハズレ</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ヒント */}
        <motion.div
          className="mt-8 bg-white/10 rounded-xl px-6 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/60 text-sm text-center">
            {selectedCard === null
              ? "3枚のうち1枚が当たりです"
              : showResult
              ? "結果を確認中..."
              : "めくり中..."}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
