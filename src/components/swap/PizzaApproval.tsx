import { useState, useEffect, useCallback, useRef } from "react";
import { SwapExecutionProgress } from "@/services/swapExecution";

interface PizzaApprovalProps {
  progress?: SwapExecutionProgress | null;
  onComplete?: () => void;
  onExecuteSwap?: () => void;
}

interface PizzaBite {
  id: number;
  angle: number;
  eaten: boolean;
}

const eltonDialogue = [
  "Hmm, let me examine this transaction...",
  "*takes a big bite* Mmm...",
  "*chew chew* This swap seems legitimate...",
  "*another bite* The gas fees look reasonable...",
  "*chew chew chew* Token addresses check out...",
  "*nom nom* Slippage tolerance is acceptable...",
  "*chew* Almost done with my analysis...",
  "*final bite* Perfect! Transaction approved! 🎉",
];

export const PizzaApproval = ({
  progress,
  onComplete,
  onExecuteSwap,
}: PizzaApprovalProps) => {
  const [currentBite, setCurrentBite] = useState(0);
  const [eltonThoughts, setEltonThoughts] = useState(
    "Hmm, let me examine this transaction..."
  );
  const [approvalComplete, setApprovalComplete] = useState(false);
  const [showRealStatus, setShowRealStatus] = useState(false);
  const executionStartedRef = useRef(false);

  // Create 8 pizza slices - memoized to prevent re-creation
  const [pizzaBites, setPizzaBites] = useState<PizzaBite[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: i * 45 - 90, // Start from top
      eaten: false,
    }))
  );

  // Memoize the pizza eating function to prevent re-execution
  const eatPizza = useCallback(async () => {
    if (executionStartedRef.current) return;
    executionStartedRef.current = true;

    // Start the real swap execution when pizza eating begins
    onExecuteSwap?.();

    for (let bite = 0; bite < 8; bite++) {
      // Update Elton's thoughts
      setEltonThoughts(eltonDialogue[bite]);
      setCurrentBite(bite);

      // Simulate chewing time
      const chewDuration = Math.random() * 1500 + 1000; // 1-2.5 seconds

      // Wait for bite + chew time
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mark this slice as eaten
      setPizzaBites((prev) =>
        prev.map((slice) =>
          slice.id === bite ? { ...slice, eaten: true } : slice
        )
      );

      // Chewing animation
      await new Promise((resolve) => setTimeout(resolve, chewDuration));
    }

    setApprovalComplete(true);

    // Show real transaction status after approval
    setTimeout(() => {
      setShowRealStatus(true);
      onComplete?.();
    }, 1500);
  }, [onComplete, onExecuteSwap]);

  useEffect(() => {
    if (approvalComplete || executionStartedRef.current) return;

    eatPizza();
  }, [eatPizza, approvalComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      executionStartedRef.current = false;
    };
  }, []);

  const eatenSlices = pizzaBites.filter((bite) => bite.eaten).length;
  const progressPercentage = (eatenSlices / 8) * 100;

  return (
    <div className="glass-card rounded-3xl p-8 relative shadow-2xl max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Elton&apos;s Pizza Approval
        </h2>
        <p className="text-white/70 text-lg">
          Elton must finish his pizza before approving your transaction
        </p>
        <div className="mt-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 glass-dark rounded-full">
            <div
              className={`w-3 h-3 rounded-full ${
                approvalComplete ? "bg-green-300/80" : "bg-orange-300/80"
              }`}
            />
            <span className="text-white text-sm">
              {approvalComplete ? "Approval Complete" : "Analyzing Transaction"}
            </span>
          </div>
        </div>
      </div>

      {/* Elton Character */}
      <div className="text-center mb-8">
        <div className="inline-block relative">
          <div className="text-8xl mb-4 transform transition-all duration-300 hover:scale-110">
            👨‍🍳
          </div>
          <div className="absolute -top-2 -right-2">
            {currentBite < 8 && (
              <div className="text-2xl">
                {currentBite % 2 === 0 ? "😋" : "🤤"}
              </div>
            )}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Chef Elton</h3>
        <p className="text-white/60 text-sm">
          Professional Transaction Taster & Blockchain Chef
        </p>
      </div>

      {/* Elton's Thoughts */}
      <div className="glass-dark rounded-2xl p-6 mb-8 relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-6 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-white text-lg mb-2 italic">
            &ldquo;{eltonThoughts}&rdquo;
          </div>
          {currentBite < 8 && (
            <div className="flex items-center justify-center space-x-1 text-white/50 text-sm">
              <span>Thinking...</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-current rounded-full"></div>
                <div
                  className="w-1 h-1 bg-current rounded-full"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-current rounded-full"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pizza Visual */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Pizza Base */}
          <div className="w-48 h-48 relative">
            {/* Main pizza base with pastel colors */}
            <div className="w-full h-full bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 rounded-full shadow-2xl border-4 border-orange-200/50 relative overflow-hidden">
              {/* Crust texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 via-transparent to-orange-300/20 rounded-full"></div>

              {/* Pizza sauce layer */}
              <div className="absolute inset-3 bg-gradient-to-br from-red-200/70 via-red-300/60 to-red-400/50 rounded-full">
                {/* Sauce texture */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-red-200/20 to-red-300/30 rounded-full"></div>
              </div>

              {/* Cheese layer */}
              <div className="absolute inset-5 bg-gradient-to-br from-yellow-100/80 via-yellow-200/60 to-yellow-300/40 rounded-full">
                {/* Cheese bubbles effect */}
                <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-100/80 rounded-full"></div>
                <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-yellow-50/70 rounded-full"></div>
                <div className="absolute bottom-4 left-6 w-2.5 h-2.5 bg-yellow-200/60 rounded-full"></div>
                <div className="absolute bottom-6 right-4 w-1 h-1 bg-yellow-100/90 rounded-full"></div>
              </div>

              {/* Toppings */}
              <div className="absolute inset-0">
                {/* Pepperoni */}
                <div className="absolute top-8 left-12 w-4 h-4 bg-red-300/70 rounded-full border border-red-400/30"></div>
                <div className="absolute top-16 right-14 w-3.5 h-3.5 bg-red-300/60 rounded-full border border-red-400/25"></div>
                <div className="absolute bottom-12 left-16 w-4 h-4 bg-red-300/75 rounded-full border border-red-400/35"></div>
                <div className="absolute bottom-16 right-12 w-3 h-3 bg-red-300/65 rounded-full border border-red-400/30"></div>

                {/* Mushrooms */}
                <div className="absolute top-12 left-18 w-3 h-2.5 bg-amber-200/60 rounded-full border border-amber-300/30"></div>
                <div className="absolute bottom-14 right-18 w-2.5 h-2 bg-amber-200/70 rounded-full border border-amber-300/25"></div>

                {/* Basil leaves */}
                <div className="absolute top-20 right-20 w-2 h-3 bg-green-200/60 rounded-full transform rotate-12"></div>
                <div className="absolute bottom-20 left-14 w-1.5 h-2.5 bg-green-200/50 rounded-full transform -rotate-12"></div>
              </div>
            </div>

            {/* Pizza Slices */}
            {pizzaBites.map((bite) => (
              <div
                key={bite.id}
                className={`absolute top-1/2 left-1/2 origin-bottom transition-all duration-500 ${
                  bite.eaten ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
                style={{
                  transform: `translate(-50%, -100%) rotate(${bite.angle}deg)`,
                  transformOrigin: "50% 96px",
                }}
              >
                {/* Slice outline with pastel colors */}
                <div
                  className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[96px] border-l-transparent border-r-transparent"
                  style={{ borderBottomColor: "rgba(251, 146, 60, 0.4)" }}
                ></div>
              </div>
            ))}

            {/* Eating Animation */}
            {currentBite < 8 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl filter drop-shadow-lg">
                  {currentBite % 3 === 0
                    ? "🍽️"
                    : currentBite % 3 === 1
                    ? "😋"
                    : "🤤"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold">Pizza Progress:</h3>
          <div className="text-white text-xl font-bold">
            {eatenSlices}/8 slices
            {approvalComplete && (
              <span className="text-green-300/90 ml-2">🎉 APPROVED!</span>
            )}
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-full h-4 mb-2 overflow-hidden">
          <div
            className="h-4 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-orange-200 via-orange-300 to-yellow-200 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Progress bar shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>

        <div className="text-center text-white/60 text-sm">
          {approvalComplete
            ? "🏁 Analysis Complete - Transaction Approved!"
            : `${Math.round(progressPercentage)}% analyzed`}
        </div>
      </div>

      {/* Approval Stats */}
      {approvalComplete && (
        <div className="glass-dark rounded-2xl p-6 mb-6 animate-fadeIn">
          <h3 className="text-white font-semibold mb-4 text-center">
            🏆 Chef&apos;s Analysis Results
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300/90 mb-1">
                A+
              </div>
              <div className="text-white/70 text-sm">Transaction Grade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300/90 mb-1">
                8/8
              </div>
              <div className="text-white/70 text-sm">Pizza Slices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-200/90 mb-1">
                100%
              </div>
              <div className="text-white/70 text-sm">Satisfaction</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-200/10 rounded-lg border border-green-300/20 text-center">
            <p className="text-green-300/90 text-sm">
              Delicious transaction! Elton approves with 5 stars and extra
              cheese!
            </p>
          </div>
        </div>
      )}

      {/* Real Transaction Status */}
      {showRealStatus && progress && (
        <div className="glass-dark rounded-2xl p-6 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Blockchain Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Transaction Status:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-green-400">Completed</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Chef Approval:</span>
              <span className="text-green-400">
                <svg
                  className="w-4 h-4 inline mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Approved
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Taste Rating:</span>
              <div className="flex items-center justify-center gap-1">
                <svg
                  className="w-5 h-5 text-orange-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-orange-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-orange-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-orange-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-orange-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Message */}
      <div className="text-center">
        <p className="text-white/50 text-sm">
          {approvalComplete && showRealStatus
            ? "🎊 Chef Elton has finished his pizza and approved your transaction!"
            : approvalComplete
            ? "⏳ Pizza analysis complete, finalizing approval..."
            : "Elton is carefully tasting each aspect of your transaction..."}
        </p>
      </div>
    </div>
  );
};
