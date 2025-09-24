export interface SwapStep {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export interface Token {
  symbol: string;
  name: string;
  icon: string;
  backgroundColor: string;
}

export interface Network {
  name: string;
  icon: string;
  backgroundColor: string;
}

export interface SwapData {
  fromToken: Token;
  toToken: Token;
  fromNetwork: Network;
  toNetwork: Network;
  fromAmount: string;
  toAmount: string;
  exchangeRate: string;
  priceChange: string;
  networkFee: string;
  slippage: string;
  priceImpact: string;
}

export interface SwapContextType {
  fromAmount: string;
  setFromAmount: (amount: string) => void;
  toAmount: string;
  setToAmount: (amount: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  handleStepClick: (stepId: number) => void;
  handleNextStep: () => void;
  handleSwap: () => void;
}
