'use client'

import Image from 'next/image';
import { mainCharacter } from '@/images';
import IceCube from '@/icons/IceCube';
import Link from 'next/link';
import StartPage from "@/components/game/StartPage";
import SelectPage from "@/components/game/SelectPage";
import EmotionPage from "@/components/game/EmotionPage";

export default function Home() {
  return (
      <div className="w-full h-screen min-h-[600px]">
          {/* <StartPage /> */}
          {/* <SelectPage /> */}
          <EmotionPage />
      </div>
  );
}
