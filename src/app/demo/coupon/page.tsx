"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Gift, Calendar, Clock, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CouponPage() {
  const couponCode = "LOTTERY2025";
  const expiryDate = "2025年1月31日";

  return (
    <div className="min-h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col">
      {/* ヘッダー */}
      <div className="bg-[#1A1A2E]/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <Link href="/demo/win" className="p-1 hover:bg-white/10 rounded-full">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="font-bold text-white">クーポン詳細</h1>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 px-5 py-6">
        {/* クーポンカード */}
        <motion.div
          className="bg-gradient-to-br from-white to-gray-100 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 上部（金色） */}
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] p-6 text-center relative overflow-hidden">
            {/* 背景装飾 */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-16 rounded-full bg-white"
                  style={{
                    left: `${(i % 3) * 40}%`,
                    top: `${Math.floor(i / 3) * 50}%`,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <motion.p
              className="text-white/80 text-sm mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              新春キャンペーン 2等
            </motion.p>

            <motion.h2
              className="text-white font-black text-4xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              30%OFF
            </motion.h2>
          </div>

          {/* 切り取り線風 */}
          <div className="relative h-6 bg-white">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1A1A2E] -ml-3" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1A1A2E] -mr-3" />
            <div className="absolute left-8 right-8 top-1/2 border-t-2 border-dashed border-gray-300" />
          </div>

          {/* 下部（白） */}
          <div className="p-6">
            {/* クーポンコード */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gray-500 text-sm mb-2">クーポンコード</p>
              <div className="bg-gray-100 rounded-xl py-3 px-6">
                <span className="text-2xl font-mono font-bold text-gray-800 tracking-widest">
                  {couponCode}
                </span>
              </div>
            </motion.div>

            {/* バーコード（ダミー） */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-end gap-0.5">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-black"
                    style={{
                      width: `${2 + Math.random() * 2}px`,
                      height: `${40 + Math.random() * 20}px`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* 詳細情報 */}
            <motion.div
              className="space-y-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>有効期限: {expiryDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Store className="w-4 h-4" />
                <span>全店舗でご利用可能</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>お会計時にご提示ください</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 注意事項 */}
        <motion.div
          className="mt-6 bg-white/5 rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white/40 text-xs leading-relaxed">
            ※ 他のクーポンとの併用はできません
            <br />
            ※ 一部対象外商品がございます
            <br />
            ※ このクーポンは1回限り有効です
          </p>
        </motion.div>

        {/* ボタン */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/demo/welcome">
            <Button variant="outline" size="lg">
              トップに戻る
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
