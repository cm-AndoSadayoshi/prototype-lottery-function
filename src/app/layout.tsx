import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "グロースパック for LINE 抽選機能 | デモ環境",
  description: "LINEキャンペーンの「手間」と「コスト」をゼロにする高機能デジタル抽選アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
