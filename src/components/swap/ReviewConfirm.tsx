interface ReviewConfirmProps {
  fromAmount: string;
  toAmount: string;
  onBack: () => void;
  onNextStep: () => void;
}

export const ReviewConfirm = ({
  fromAmount,
  toAmount,
  onBack,
  onNextStep,
}: ReviewConfirmProps) => {
  return (
    <div className="glass-card rounded-3xl p-6 relative shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Review & Confirm</h2>
        <p className="text-white/70">Double-check your swap details</p>
      </div>

      <div className="space-y-6">
        {/* Swap Summary */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Swap Summary</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#6E54FF" }}
              >
                <span className="text-xs font-bold text-white">B</span>
              </div>
              <div>
                <div className="text-white font-medium">BNB</div>
                <div className="text-white/70 text-sm">Binance Smart Chain</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-2xl font-light">{fromAmount}</div>
              <div className="text-white/70 text-sm">≈$24,345</div>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">₮</span>
              </div>
              <div>
                <div className="text-white font-medium">USDT</div>
                <div className="text-white/70 text-sm">Avalanche Network</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-2xl font-light">{toAmount}</div>
              <div className="text-white/70 text-sm">≈$23,827</div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Transaction Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/70">Exchange Rate</span>
              <span className="text-white">1 BNB = 35.573989 USDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Network Fee</span>
              <span className="text-white">~$2.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Slippage Tolerance</span>
              <span className="text-white">0.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Price Impact</span>
              <span className="text-green-400">0.02%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={onBack}
          className="flex-1 text-white/70 font-semibold py-4 px-6 rounded-2xl border border-white/20 hover:bg-white/10 transition-colors"
        >
          ‹ Back
        </button>
        <button
          onClick={onNextStep}
          className="flex-1 text-white font-semibold py-4 px-6 rounded-2xl transition-colors hover:opacity-90"
          style={{ backgroundColor: "#6E54FF" }}
        >
          Confirm Swap
        </button>
      </div>
    </div>
  );
};
