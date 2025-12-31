# プロトタイプガイドライン - グロースパック for LINE 抽選機能

## 概要

グロースパック for LINE 抽選機能のデモプロトタイプ構築ガイド。

---

## ブランドカラー

### プライマリカラー

| 用途 | カラー | HEX |
|------|--------|-----|
| メインカラー | ゴールド | `#D4AF37` |
| アクセント | ディープゴールド | `#B8860B` |
| サブカラー | クリーム | `#FFF8DC` |
| 背景 | ダークネイビー | `#1A1A2E` |
| 背景グラデーション | パープル | `#16213E` |

### セカンダリカラー

| 用途 | カラー | HEX |
|------|--------|-----|
| 当選（成功） | ゴールド | `#FFD700` |
| ハズレ | シルバー | `#C0C0C0` |
| LINE Green | LINEカラー | `#06C755` |
| テキスト（明） | 白 | `#FFFFFF` |
| テキスト（暗） | グレー | `#666666` |

---

## 画面一覧

### 画面構成

| # | 画面名 | 説明 | 状態 |
|---|--------|------|------|
| 1 | ウェルカム画面 | キャンペーン説明、参加ボタン | 初期状態 |
| 2 | 抽選選択画面 | スピードくじ/ガチャ/スロット選択 | 参加後 |
| 3 | スピードくじ画面 | カードをタップしてめくる | 抽選中 |
| 4 | ガチャ画面 | レバーを引いてカプセル排出 | 抽選中 |
| 5 | スロット画面 | リールを回して揃える | 抽選中 |
| 6 | 当選結果画面 | 当選おめでとう + 景品表示 | 結果表示 |
| 7 | ハズレ結果画面 | 残念 + 次回への誘導 | 結果表示 |
| 8 | クーポン表示画面 | バーコード/QRコード表示 | 特典利用 |

---

## デモシナリオ

### メインシナリオ: ガチャで当選

```
Step 1: ウェルカム画面
  ↓ 「参加する」ボタンをタップ
Step 2: 抽選選択画面
  ↓ 「ガチャ」を選択
Step 3: ガチャ画面
  ↓ レバーをタップ
Step 4: ガチャ演出（カプセル排出）
  ↓ アニメーション完了
Step 5: 当選結果画面（紙吹雪エフェクト）
  ↓ 「クーポンを確認」をタップ
Step 6: クーポン表示画面
```

### サブシナリオ: スロットでハズレ

```
Step 1: ウェルカム画面
  ↓ 「参加する」ボタンをタップ
Step 2: 抽選選択画面
  ↓ 「スロット」を選択
Step 3: スロット画面
  ↓ 「スタート」をタップ
Step 4: スロット演出（リール回転）
  ↓ アニメーション完了
Step 5: ハズレ結果画面
  ↓ 「また挑戦する」で最初に戻る
```

---

## demoSteps設定

demo-builderで直接使用可能な形式。

```typescript
export const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "ウェルカム画面",
    description: "キャンペーン説明と参加ボタンを表示",
    component: "WelcomeScreen",
    state: { isParticipated: false }
  },
  {
    id: 2,
    title: "抽選選択画面",
    description: "3種類の抽選方法から選択",
    component: "LotterySelectScreen",
    state: { selectedType: null }
  },
  {
    id: 3,
    title: "ガチャ画面",
    description: "レバーを引いてガチャを回す",
    component: "GachaScreen",
    state: { isSpinning: false, result: null }
  },
  {
    id: 4,
    title: "ガチャ演出",
    description: "カプセルが排出されるアニメーション",
    component: "GachaScreen",
    state: { isSpinning: true, result: null }
  },
  {
    id: 5,
    title: "当選結果画面",
    description: "当選おめでとう！紙吹雪エフェクト付き",
    component: "WinResultScreen",
    state: { prize: "10%OFFクーポン", showConfetti: true }
  },
  {
    id: 6,
    title: "クーポン表示画面",
    description: "当選したクーポンのバーコードを表示",
    component: "CouponScreen",
    state: { couponCode: "LOTTERY2024", expiryDate: "2024/12/31" }
  }
];
```

---

## 状態シミュレーション要件

### 1. 抽選アニメーション状態

```typescript
interface LotteryState {
  isSpinning: boolean;     // 抽選中フラグ
  result: 'win' | 'lose' | null;  // 結果
  selectedType: 'gacha' | 'slot' | 'speedlot' | null;  // 選択された抽選タイプ
  prize: string | null;    // 当選景品
}
```

### 2. ガチャ演出の状態遷移

```typescript
// 状態遷移
const [phase, setPhase] = useState<'idle' | 'pulling' | 'dropping' | 'opening' | 'result'>('idle');

// フェーズ説明
// idle: レバー待機状態
// pulling: レバーを引く
// dropping: カプセルが落下
// opening: カプセルが開く
// result: 結果表示
```

### 3. スロット演出の状態遷移

```typescript
// リールの状態
const [reels, setReels] = useState([
  { spinning: false, value: '🍒' },
  { spinning: false, value: '🍋' },
  { spinning: false, value: '🍇' }
]);

// 順番に停止するアニメーション
// reel1停止 → 500ms後reel2停止 → 500ms後reel3停止
```

### 4. スピードくじの状態遷移

```typescript
// カードの状態
const [cards, setCards] = useState([
  { id: 1, isFlipped: false, isWinner: true },
  { id: 2, isFlipped: false, isWinner: false },
  { id: 3, isFlipped: false, isWinner: false }
]);

// タップでめくる
const handleFlip = (cardId: number) => {
  setCards(prev => prev.map(card =>
    card.id === cardId ? { ...card, isFlipped: true } : card
  ));
};
```

---

## アニメーション要件

### Framer Motion設定

| ユースケース | パターン | 設定 |
|------------|---------|------|
| ページ読み込み | フェードイン + スライドアップ | `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }` |
| ガチャカプセル落下 | バウンス | `type: "spring", stiffness: 300, damping: 20` |
| スロットリール回転 | 無限ループ → 停止 | `transition: { repeat: Infinity, duration: 0.1 }` |
| カードめくり | 3D回転 | `rotateY: 180, transition: { duration: 0.6 }` |
| 紙吹雪 | パーティクル | `canvas-confetti` ライブラリ使用 |
| 当選テキスト | スケールイン | `scale: [0, 1.2, 1], transition: { duration: 0.5 }` |
| ボタンタップ | 縮小 | `whileTap: { scale: 0.95 }` |

### ガチャ演出アニメーション詳細

```typescript
// カプセル落下アニメーション
const capsuleAnimation = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// カプセルバウンス
const bounceAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.5, 1],
      repeat: 2
    }
  }
};

// 光の演出
const glowAnimation = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(255, 215, 0, 0.5)",
      "0 0 40px rgba(255, 215, 0, 0.8)",
      "0 0 20px rgba(255, 215, 0, 0.5)"
    ],
    transition: {
      duration: 1,
      repeat: Infinity
    }
  }
};
```

### 当選エフェクト（紙吹雪）

```typescript
import confetti from 'canvas-confetti';

const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FFA500', '#FF6347', '#00CED1', '#9370DB']
  });
};
```

---

## 魅力的品質機能の詳細

### ガチャ演出

**視覚要素**:
- カプセルマシンのビジュアル（3Dライク）
- カラフルなカプセル（赤、青、金など）
- 透明なドーム部分から中身が見える
- 落下時のバウンドアニメーション

**インタラクション**:
- レバーを引く動作（ドラッグまたはタップ）
- カプセル排出の物理演算風アニメーション
- カプセルが開いて中身が見える演出

### スロット演出

**視覚要素**:
- 3列のリール（フルーツ、数字、または景品アイコン）
- 回転中のブラー効果
- 揃った時の光る枠
- レトロなスロットマシンデザイン

**インタラクション**:
- STARTボタンで一斉回転開始
- 自動停止または手動停止
- 揃った時の効果音想定（実装はオプション）

### スピードくじ演出

**視覚要素**:
- 裏返しのカード3枚
- めくると結果が見える
- 当たりカードは金色の光
- ハズレカードはグレー

**インタラクション**:
- カードをタップしてめくる
- めくる際の3D回転アニメーション
- 1枚選んだら他は無効化

---

## コンポーネント構成

```
src/
├── components/
│   ├── demo/
│   │   ├── DemoContainer.tsx      # デモ環境コンテナ
│   │   ├── PhoneFrame.tsx         # iPhoneフレーム
│   │   └── StepNavigation.tsx     # ステップナビゲーション
│   │
│   ├── screens/
│   │   ├── WelcomeScreen.tsx      # ウェルカム画面
│   │   ├── LotterySelectScreen.tsx # 抽選選択画面
│   │   ├── GachaScreen.tsx        # ガチャ画面
│   │   ├── SlotScreen.tsx         # スロット画面
│   │   ├── SpeedLotScreen.tsx     # スピードくじ画面
│   │   ├── WinResultScreen.tsx    # 当選結果画面
│   │   ├── LoseResultScreen.tsx   # ハズレ結果画面
│   │   └── CouponScreen.tsx       # クーポン表示画面
│   │
│   └── ui/
│       ├── Button.tsx             # ボタンコンポーネント
│       ├── Card.tsx               # カードコンポーネント
│       └── Confetti.tsx           # 紙吹雪エフェクト
│
├── hooks/
│   ├── useLotteryState.ts         # 抽選状態管理
│   └── useAnimation.ts            # アニメーション制御
│
└── types/
    └── lottery.ts                 # 型定義
```

---

## 技術スタック

| カテゴリ | 技術 | 用途 |
|---------|------|------|
| フレームワーク | Next.js 14+ (App Router) | React フレームワーク |
| スタイリング | Tailwind CSS | ユーティリティファースト CSS |
| アニメーション | Framer Motion | リッチなアニメーション |
| 紙吹雪 | canvas-confetti | 当選エフェクト |
| 状態管理 | React useState/useReducer | ローカル状態管理 |
| 型定義 | TypeScript | 型安全性 |

---

## まとめ

このプロトタイプでは、3種類の抽選演出（ガチャ、スロット、スピードくじ）をリッチなアニメーションで実装し、「グロースパック for LINE 抽選機能」の魅力を最大限にアピールできるデモを構築する。
