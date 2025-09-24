"use client";

import { useSwap } from "@/hooks/useSwap";
import { ProgressSteps, SwapInterface } from "@/components/swap";

export default function Home() {
  const {
    fromAmount,
    setFromAmount,
    toAmount,
    activeTab,
    setActiveTab,
    currentStep,
    setCurrentStep,
    steps,
    handleStepClick,
    handleNextStep,
    handleSwap,
  } = useSwap();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Progress Steps */}
      <div className="mb-8">
        <ProgressSteps
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Main Swap Interface */}
      <SwapInterface
        currentStep={currentStep}
        fromAmount={fromAmount}
        toAmount={toAmount}
        activeTab={activeTab}
        onFromAmountChange={setFromAmount}
        onTabChange={setActiveTab}
        onSwap={handleSwap}
        onNextStep={handleNextStep}
        onBackToStep={setCurrentStep}
      />
    </div>
  );
}
