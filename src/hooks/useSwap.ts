"use client";

import { useState } from "react";
import { SwapStep } from "@/types/swap";

export const useSwap = () => {
  const [fromAmount, setFromAmount] = useState("7,695.89");
  const [toAmount, setToAmount] = useState("83,924.43");
  const [activeTab, setActiveTab] = useState("Swap");
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps: SwapStep[] = [
    {
      id: 1,
      title: "Human Proof-of-Work",
      icon: "👏",
      description: "Clap detector & mouse-draw challenge",
    },
    {
      id: 2,
      title: "Gas Fee Roulette",
      icon: "🎰",
      description: "Spinning the wheel of destiny",
    },
    {
      id: 3,
      title: "Community Validation",
      icon: "🗳️",
      description: "3 random validators deciding...",
    },
    {
      id: 4,
      title: "Elton's Pizza Approval",
      icon: "�",
      description: "Elton is chewing... please wait",
    },
  ];

  const handleStepClick = (stepId: number) => {
    // Only allow going back to previous steps, not forward
    if (stepId <= currentStep && !isProcessing) {
      setCurrentStep(stepId);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      if (currentStep === 3) {
        // Elton's Pizza Approval - random 3-5s delay
        setIsProcessing(true);
        const delay = Math.random() * 2000 + 3000; // 3-5 seconds
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(currentStep + 1);
        }, delay);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleSwap = () => {
    handleNextStep();
  };

  return {
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    activeTab,
    setActiveTab,
    currentStep,
    setCurrentStep,
    isProcessing,
    setIsProcessing,
    steps,
    handleStepClick,
    handleNextStep,
    handleSwap,
  };
};
