"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RotateCcw, ChevronRight, Gift } from "lucide-react";

const demoSteps = [
  { path: "/demo/welcome", label: "ウェルカム", step: 1 },
  { path: "/demo/select", label: "抽選選択", step: 2 },
  { path: "/demo/gacha", label: "ガチャ", step: 3 },
  { path: "/demo/slot", label: "スロット", step: 4 },
  { path: "/demo/speedlot", label: "スピードくじ", step: 5 },
  { path: "/demo/win", label: "当選結果", step: 6 },
  { path: "/demo/lose", label: "ハズレ結果", step: 7 },
  { path: "/demo/coupon", label: "クーポン", step: 8 },
];

const demoInfo = {
  title: "グロースパック for LINE",
  subtitle: "抽選機能 デモ環境",
  primaryColor: "#D4AF37",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = demoSteps.find((s) => s.path === pathname)?.step || 1;

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* 左側: デモコントロール */}
      <div className="w-72 bg-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: demoInfo.primaryColor }}
          >
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              {demoInfo.title}
            </h1>
            <p className="text-xs text-gray-500">{demoInfo.subtitle}</p>
          </div>
        </div>

        {/* ステップ一覧 */}
        <div className="flex-1 mt-6">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
            画面フロー
          </p>
          <nav className="space-y-1.5">
            {demoSteps.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={
                  pathname === item.path
                    ? { backgroundColor: demoInfo.primaryColor }
                    : undefined
                }
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    pathname === item.path
                      ? "bg-white/20"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {item.step}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
                {pathname === item.path && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* コントロールボタン */}
        <div className="border-t pt-4">
          <Link
            href={demoSteps[0]?.path || "/demo"}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">リセット</span>
          </Link>
        </div>

        {/* 進捗表示 */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>進捗</span>
            <span>
              {currentStep} / {demoSteps.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(currentStep / demoSteps.length) * 100}%`,
                backgroundColor: demoInfo.primaryColor,
              }}
            />
          </div>
        </div>
      </div>

      {/* 右側: スマホプレビュー */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* ノッチ */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10" />

          {/* スマホ本体 */}
          <div className="w-[375px] h-[812px] bg-white rounded-[50px] shadow-2xl overflow-hidden border-[12px] border-gray-900">
            {/* ステータスバー */}
            <div className="h-12 bg-[#1A1A2E] flex items-center justify-between px-8 pt-3">
              <span className="text-sm font-semibold text-white">9:41</span>
              <div className="flex items-center gap-1 text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71s.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.73v3.1c0 .4.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.11-.53-.29-.71A16.971 16.971 0 0012 3z" />
                </svg>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 22h20V2z" />
                </svg>
                <svg className="w-6 h-3" viewBox="0 0 24 12" fill="currentColor">
                  <rect x="0" y="0" width="22" height="12" rx="2" stroke="currentColor" fill="none" strokeWidth="1" />
                  <rect x="2" y="2" width="18" height="8" rx="1" />
                  <rect x="23" y="4" width="1" height="4" />
                </svg>
              </div>
            </div>

            {/* コンテンツエリア */}
            <div className="h-[calc(100%-48px-34px)] overflow-y-auto hide-scrollbar">
              {children}
            </div>

            {/* ホームインジケーター */}
            <div className="h-[34px] bg-[#1A1A2E] flex items-center justify-center">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
