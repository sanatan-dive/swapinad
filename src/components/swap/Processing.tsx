import { SwapExecutionProgress } from '@/services/swapExecution';
import { formatTransactionHash, getTransactionUrl } from '@/services/swapExecution';
import { useChainId } from 'wagmi';

interface ProcessingProps {
  progress?: SwapExecutionProgress | null;
  isExecuting?: boolean;
}

export const Processing = ({ progress, isExecuting = false }: ProcessingProps) => {
  const chainId = useChainId();

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'approval':
        return '🔐';
      case 'swap':
        return '🔄';
      case 'complete':
        return '✅';
      default:
        return '⏳';
    }
  };

  const getStepTitle = (step: string) => {
    switch (step) {
      case 'approval':
        return 'Token Approval';
      case 'swap':
        return 'Executing Swap';
      case 'complete':
        return 'Swap Complete';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 relative shadow-2xl text-center">
      <div className="mb-8">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          {progress?.step === 'complete' ? (
            <div className="text-4xl">✅</div>
          ) : (
            <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-white rounded-full"></div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {progress ? getStepTitle(progress.step) : 'Processing Swap'}
        </h2>
        <p className="text-white/70">
          {progress?.message || 'Your transaction is being processed on the blockchain'}
        </p>
      </div>

      {progress && (
        <div className="glass-dark rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70">Current Step:</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getStepIcon(progress.step)}</span>
              <span className="text-white capitalize">{progress.step}</span>
            </div>
          </div>
          
          {progress.transactionHash && (
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70">Transaction Hash:</span>
              <a
                href={getTransactionUrl(progress.transactionHash, chainId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-mono transition-colors"
              >
                {formatTransactionHash(progress.transactionHash)}
              </a>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-white/70">Status:</span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                progress.step === 'complete' 
                  ? 'bg-green-400' 
                  : 'bg-yellow-400 animate-pulse'
              }`}></div>
              <span className={
                progress.step === 'complete' 
                  ? 'text-green-400' 
                  : 'text-yellow-400'
              }>
                {progress.step === 'complete' ? 'Confirmed' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="text-white/50 text-sm">
        {progress?.step === 'complete' 
          ? 'Your swap has been completed successfully!'
          : 'Please do not close this window. The swap will complete automatically.'
        }
      </div>
    </div>
  );
};
