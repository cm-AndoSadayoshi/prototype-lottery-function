export type LotteryType = "gacha" | "slot" | "speedlot";

export type LotteryResult = "win" | "lose" | null;

export interface LotteryState {
  isSpinning: boolean;
  result: LotteryResult;
  selectedType: LotteryType | null;
  prize: string | null;
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  discount: string;
  expiryDate: string;
}

export interface DemoStep {
  id: number;
  path: string;
  label: string;
  step: number;
}
