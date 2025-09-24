export const Processing = () => {
  return (
    <div className="glass-card rounded-3xl p-6 relative shadow-2xl text-center">
      <div className="mb-8">
        <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Processing Swap</h2>
        <p className="text-white/70">
          Your transaction is being processed on the blockchain
        </p>
      </div>

      <div className="glass-dark rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70">Transaction Hash:</span>
          <span className="text-white text-sm font-mono">0x1234...abcd</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70">Status:</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-400">Pending</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/70">Estimated Time:</span>
          <span className="text-white">~30 seconds</span>
        </div>
      </div>

      <div className="text-white/50 text-sm">
        Please do not close this window. The swap will complete automatically.
      </div>
    </div>
  );
};
