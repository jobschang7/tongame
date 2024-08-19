'use client'

import Image from 'next/image';
import { mainCharacter } from '@/images';
import IceCube from '@/icons/IceCube';
import Link from 'next/link';
import StartPage from "@/components/game/StartPage";
import SelectPage from "@/components/game/SelectPage";
import EmotionPage from "@/components/game/EmotionPage";
import ResultPage from "@/components/game/ResultPage";
import LoadingScreen from "@/components/Loading";
import { useState } from 'react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  if (!isInitialized) {
      return (
          <LoadingScreen
              setIsInitialized={setIsInitialized}
              setCurrentView={() => {}}
          />
      );
  }
  return (
      <div className="w-full h-screen min-h-[600px]">
          {currentStep === 1 ? (
              <StartPage updateStep={() => setCurrentStep(currentStep + 1)} />
          ) : null}
          {currentStep === 2 ? (
              <SelectPage updateStep={() => setCurrentStep(currentStep + 1)} />
          ) : null}
          {currentStep === 3 ? (
              <EmotionPage
                  update={() => {}}
                  updateStep={() => setCurrentStep(currentStep + 1)}
              />
          ) : null}
          {currentStep === 4 ? <ResultPage /> : null}
      </div>
  );
}
