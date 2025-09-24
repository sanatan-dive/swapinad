"use client";

import { TokenSelection } from "./TokenSelection";
import { ReviewConfirm } from "./ReviewConfirm";
import { Processing } from "./Processing";
import { Complete } from "./Complete";
import { TabNavigation } from "./TabNavigation";

interface SwapInterfaceProps {
  currentStep: number;
  fromAmount: string;
  toAmount: string;
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
        return <Processing />;
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
