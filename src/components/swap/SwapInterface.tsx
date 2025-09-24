"use client";

import { TokenSelection } from "./TokenSelection";
import { ReviewConfirm } from "./ReviewConfirm";
import { Processing } from "./Processing";
import { Complete } from "./Complete";
import { TabNavigation } from "./TabNavigation";

import { Token } from "@/types/swap";

import { SwapExecutionProgress } from "@/services/swapExecution";

interface SwapInterfaceProps {
  currentStep: number;
  fromAmount: string;
  toAmount: string;
  fromToken: Token | null;
  toToken: Token | null;
  exchangeRate: string | null;
  isLoadingPrice?: boolean;
  priceError?: string | null;
  isConnected?: boolean;
  fromTokenBalance?: { formatted: string; symbol: string } | null;
  toTokenBalance?: { formatted: string; symbol: string } | null;
  isExecuting?: boolean;
  executionProgress?: SwapExecutionProgress | null;
  activeTab: string;
  onFromAmountChange: (amount: string) => void;
  onTabChange: (tab: string) => void;
  onSwap: () => void;
  onNextStep: () => void;
  onBackToStep: (step: number) => void;
}

export const SwapInterface = ({
  currentStep,
  fromAmount,
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
  onFromAmountChange,
  onTabChange,
  onSwap,
  onNextStep,
  onBackToStep,
}: SwapInterfaceProps) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
            <TokenSelection
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
              onFromAmountChange={onFromAmountChange}
              onSwap={onSwap}
              onNextStep={onNextStep}
            />
          </>
        );
      case 2:
        return (
          <ReviewConfirm
            fromAmount={fromAmount}
            toAmount={toAmount}
            onBack={() => onBackToStep(1)}
            onNextStep={onNextStep}
          />
        );
      case 3:
        return <Processing progress={executionProgress} isExecuting={isExecuting} />;
      case 4:
        return (
          <Complete
            fromAmount={fromAmount}
            toAmount={toAmount}
            onNewSwap={() => onBackToStep(1)}
          />
        );
      default:
        return (
          <>
            <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
            <TokenSelection
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
              onFromAmountChange={onFromAmountChange}
              onSwap={onSwap}
              onNextStep={onNextStep}
            />
          </>
        );
    }
  };

  return <div className="w-full max-w-4xl">{renderStepContent()}</div>;
};
