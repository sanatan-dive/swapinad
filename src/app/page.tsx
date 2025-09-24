"use client";

import { useSwap } from "@/hooks/useSwap";
import { ProgressSteps, SwapInterface } from "@/components/swap";
import { Header } from "@/components/layout/Header";

export default function Home() {
  const {
    fromAmount,
    setFromAmount,
    toAmount,
    fromToken,
    toToken,
    exchangeRate,
    isLoadingPrice,
    priceError,
    isConnected,
    fromTokenBalance,
    toTokenBalance,
    isExecuting,
    executionProgress,
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
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
          fromToken={fromToken}
          toToken={toToken}
          exchangeRate={exchangeRate}
          isLoadingPrice={isLoadingPrice}
          priceError={priceError}
          isConnected={isConnected}
          fromTokenBalance={fromTokenBalance}
          toTokenBalance={toTokenBalance}
          isExecuting={isExecuting}
          executionProgress={executionProgress}
          activeTab={activeTab}
          onFromAmountChange={setFromAmount}
          onTabChange={setActiveTab}
          onSwap={handleSwap}
          onNextStep={handleNextStep}
          onBackToStep={setCurrentStep}
        />
      </main>
    </div>
  );
}
