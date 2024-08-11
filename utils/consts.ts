// utils/consts.ts

import { crystal1, crystal2, crystal3, crystal4, crystal5, crystal6, crystal7, crystal8, crystal9, mainCharacter } from "@/images";
import { StaticImageData } from "next/image";

export interface LevelData {
  name: string;
  minPoints: number;
  bigImage: StaticImageData;
  smallImage: StaticImageData;
  color: string;
  friendBonus: number;
  friendBonusPremium: number;
}

export const LEVELS: LevelData[] = [
  {
    name: "Ice Cube Intern",
    minPoints: 0,
    bigImage: mainCharacter,
    smallImage: crystal1,
    color: "#2adaf8",
    friendBonus: 0,
    friendBonusPremium: 0,
  },
  {
    name: "Frosty Freelancer",
    minPoints: 5000,
    bigImage: mainCharacter,
    smallImage: crystal2,
    color: "#d64767",
    friendBonus: 20000,
    friendBonusPremium: 25000,
  },
  {
    name: "Chilly Consultant",
    minPoints: 25000,
    bigImage: mainCharacter,
    smallImage: crystal3,
    color: "#e9c970",
    friendBonus: 30000,
    friendBonusPremium: 50000,
  },
  {
    name: "Glacial Manager",
    minPoints: 100000,
    bigImage: mainCharacter,
    smallImage: crystal4,
    color: "#73e94b",
    friendBonus: 40000,
    friendBonusPremium: 75000,
  },
  {
    name: "Subzero Supervisor",
    minPoints: 1000000,
    bigImage: mainCharacter,
    smallImage: crystal5,
    color: "#4ef0ba",
    friendBonus: 60000,
    friendBonusPremium: 100000,
  },
  {
    name: "Arctic Executive",
    minPoints: 2000000,
    bigImage: mainCharacter,
    smallImage: crystal6,
    color: "#1a3ae8",
    friendBonus: 100000,
    friendBonusPremium: 150000,
  },
  {
    name: "Polar CEO",
    minPoints: 10000000,
    bigImage: mainCharacter,
    smallImage: crystal7,
    color: "#902bc9",
    friendBonus: 250000,
    friendBonusPremium: 500000,
  },
  {
    name: "Tundra Tycoon",
    minPoints: 50000000,
    bigImage: mainCharacter,
    smallImage: crystal8,
    color: "#fb8bee",
    friendBonus: 500000,
    friendBonusPremium: 1000000,
  },
  {
    name: "Iceberg Mogul",
    minPoints: 100000000,
    bigImage: mainCharacter,
    smallImage: crystal9,
    color: "#e04e92",
    friendBonus: 1000000,
    friendBonusPremium: 2000000,
  }
];

export const MAX_ENERGY_REFILLS_PER_DAY = 6;
export const ENERGY_REFILL_COOLDOWN = 3 * 60 * 1000; // 1 hour in milliseconds
export const TASK_WAIT_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export const REFERRAL_BONUS_BASE = 5000;
export const REFERRAL_BONUS_PREMIUM = 25000;


// Multitap
export const multitapUpgradeBasePrice = 1000;
export const multitapUpgradeCostCoefficient = 2;

export const multitapUpgradeBaseBenefit = 1;
export const multitapUpgradeBenefitCoefficient = 1;

// Energy
export const energyUpgradeBasePrice = 1000;
export const energyUpgradeCostCoefficient = 2;

export const energyUpgradeBaseBenefit = 500;
export const energyUpgradeBenefitCoefficient = 1;

// Mine (profit per hour)
export const mineUpgradeBasePrice = 1000;
export const mineUpgradeCostCoefficient = 1.5;

export const mineUpgradeBaseBenefit = 100;
export const mineUpgradeBenefitCoefficient = 1.2;