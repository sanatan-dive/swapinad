import { useState, useEffect } from "react";

interface NFTBadgeRewardProps {
  fromAmount: string;
  toAmount: string;
  fromToken: { symbol: string } | null;
  toToken: { symbol: string } | null;
  onNewSwap: () => void;
}

interface BadgeAttribute {
  trait_type: string;
  value: string | number;
}

interface FloatingElement {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const badgeAttributes: BadgeAttribute[] = [
  { trait_type: "Survival Status", value: "Legendary Survivor" },
  { trait_type: "Comedy Tolerance", value: "Maximum" },
  { trait_type: "Pizza Approval", value: "Witnessed" },
  { trait_type: "Gas Roulette", value: "Spun" },
  { trait_type: "Community Validation", value: "Approved" },
  { trait_type: "Over-Engineering Level", value: "∞" },
  { trait_type: "Elton's Rating", value: "5 Stars" },
  { trait_type: "Completion Date", value: new Date().toLocaleDateString() },
];

export const NFTBadgeReward = ({ onNewSwap }: NFTBadgeRewardProps) => {
  const [mintingStage, setMintingStage] = useState<
    "preparation" | "minting" | "complete"
  >("preparation");
  const [currentAttribute, setCurrentAttribute] = useState(0);
  const [showNFTPreview, setShowNFTPreview] = useState(false);
  const [badgeGenerated, setBadgeGenerated] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(
    []
  );

  // Generate floating celebration elements
  useEffect(() => {
    const celebrationEmojis = [
      "★",
      "✦",
      "✧",
      "◆",
      "◇",
      "●",
      "○",
      "▪",
      "▫",
      "■",
    ];
    const elements: FloatingElement[] = [];

    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        emoji:
          celebrationEmojis[
            Math.floor(Math.random() * celebrationEmojis.length)
          ],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3000,
        duration: 3000 + Math.random() * 2000,
      });
    }

    setFloatingElements(elements);
  }, []);

  // NFT minting sequence
  useEffect(() => {
    const mintSequence = async () => {
      // Stage 1: Preparation (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMintingStage("minting");

      // Stage 2: Minting with attribute reveal (5 seconds)
      for (let i = 0; i < badgeAttributes.length; i++) {
        setCurrentAttribute(i);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowNFTPreview(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMintingStage("complete");
      setBadgeGenerated(true);
    };

    mintSequence();
  }, []);

  const renderBadgeDesign = () => (
    <div className="relative w-80 h-80 mx-auto">
      {/* Badge Background */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-pastel-purple via-pastel-blue to-pastel-mint shadow-2xl border-8 border-white/20 relative overflow-hidden">
        {/* Inner Ring */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-4 border-white/10 shadow-inner">
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <svg
              className="w-16 h-16 mb-2 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-white font-bold text-lg mb-1">
              SWAP SURVIVOR
            </div>
            <div className="text-pastel-yellow text-sm">
              {new Date().getFullYear()}
            </div>

            {/* Decorative Stars */}
            <div className="absolute top-6 left-6 text-pastel-yellow text-xl animate-spin-slow">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div
              className="absolute top-6 right-6 text-pastel-yellow text-xl animate-spin-slow"
              style={{ animationDelay: "1s" }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div
              className="absolute bottom-6 left-6 text-pastel-yellow text-xl animate-spin-slow"
              style={{ animationDelay: "2s" }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div
              className="absolute bottom-6 right-6 text-pastel-yellow text-xl animate-spin-slow"
              style={{ animationDelay: "3s" }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Achievement Ribbon */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-pastel-purple text-white px-4 py-1 text-xs font-bold rounded-full border-2 border-white/20">
          LEGENDARY
        </div>
      </div>

      {/* Glowing Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pastel-purple/40 to-pastel-blue/40 opacity-30 blur-sm"></div>
    </div>
  );

  return (
    <div className="glass-card rounded-3xl p-8 relative shadow-2xl max-w-4xl mx-auto overflow-hidden min-h-[600px]">
      {/* Floating celebration elements */}
      {badgeGenerated &&
        floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute pointer-events-none text-3xl opacity-80"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}ms`,
              animationDuration: `${element.duration}ms`,
            }}
          >
            {element.emoji}
          </div>
        ))}

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <svg
          className="w-20 h-20 mx-auto mb-4 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-4xl font-bold text-white mb-4">
          {mintingStage === "preparation" && "Preparing Your NFT Badge..."}
          {mintingStage === "minting" && "Minting Your Achievement..."}
          {mintingStage === "complete" && "NFT Badge Minted Successfully!"}
        </h2>
        <p className="text-white/70 text-lg">
          {mintingStage === "complete"
            ? "Congratulations! You now own a legendary 'I Survived The Swap' NFT badge!"
            : "Creating your unique survival certificate..."}
        </p>
      </div>

      {/* Minting Progress */}
      {mintingStage !== "complete" && (
        <div className="mb-8">
          <div className="glass-dark rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 glass-steps rounded-full">
                <div className="w-3 h-3 rounded-full bg-pastel-purple"></div>
                <span className="text-white font-semibold">
                  {mintingStage === "preparation"
                    ? "Preparing NFT..."
                    : "Minting in Progress..."}
                </span>
              </div>
            </div>

            {/* Progress Animation */}
            <div className="w-full bg-white/10 rounded-full h-4 mb-4">
              <div
                className="h-4 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-pastel-purple to-pastel-blue"
                style={{
                  width:
                    mintingStage === "preparation"
                      ? "20%"
                      : `${
                          20 + (currentAttribute / badgeAttributes.length) * 80
                        }%`,
                }}
              />
            </div>

            {/* Current Attribute Being Added */}
            {mintingStage === "minting" && (
              <div className="text-center">
                <p className="text-white/70 text-sm mb-2">Adding attribute:</p>
                <div className="text-white font-semibold">
                  {badgeAttributes[currentAttribute]?.trait_type}:{" "}
                  {badgeAttributes[currentAttribute]?.value}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NFT Badge Preview */}
      {showNFTPreview && (
        <div className="mb-8 animate-fadeIn">{renderBadgeDesign()}</div>
      )}

      {/* NFT Details */}
      {badgeGenerated && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-pastel-yellow/20 to-pastel-orange/10 rounded-lg border border-pastel-yellow/30">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-pastel-yellow"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-pastel-yellow font-bold">Gold Tier</div>
            <div className="text-white/70 text-xs">Legendary Survivor</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-pastel-purple/20 to-pastel-pink/20 rounded-lg border border-pastel-purple/30">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-pastel-purple"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-pastel-purple font-bold">Comedy Master</div>
            <div className="text-white/70 text-xs">Survived All Theatrics</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-pastel-mint/20 to-pastel-blue/10 rounded-lg border border-pastel-mint/30">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-pastel-mint"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-pastel-mint font-bold">DeFi Explorer</div>
            <div className="text-white/70 text-xs">Completed The Journey</div>
          </div>
        </div>
      )}

      {/* Badge Attributes */}
      {badgeGenerated && (
        <div className="glass-dark rounded-2xl p-6 mb-8 animate-fadeIn">
          <h3 className="text-white font-semibold mb-4 text-center">
            Badge Attributes
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {badgeAttributes.map((attr, index) => (
              <div
                key={index}
                className="text-center p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="text-white/70 text-xs mb-1">
                  {attr.trait_type}
                </div>
                <div className="text-white font-semibold text-sm">
                  {attr.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hall of Fame */}
      {badgeGenerated && (
        <div className="glass-dark rounded-2xl p-6 mb-8 animate-fadeIn">
          <h3 className="text-white font-semibold mb-4 text-center">
            Welcome to the Hall of Fame
          </h3>
          <div className="text-center">
            <p className="text-white/80 mb-4">
              You are now officially a member of the exclusive &ldquo;Swap
              Survivors&rdquo; club!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-pastel-yellow/20 to-pastel-orange/10 rounded-lg border border-pastel-yellow/30">
                <div className="text-3xl mb-2">🥇</div>
                <div className="text-pastel-yellow font-bold">Gold Tier</div>
                <div className="text-white/70 text-xs">Legendary Survivor</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-pastel-purple/20 to-pastel-pink/20 rounded-lg border border-pastel-purple/30">
                <div className="text-3xl mb-2">🎭</div>
                <div className="text-pastel-purple font-bold">
                  Comedy Master
                </div>
                <div className="text-white/70 text-xs">
                  Survived All Theatrics
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-pastel-mint/20 to-pastel-blue/10 rounded-lg border border-pastel-mint/30">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-pastel-mint font-bold">DeFi Explorer</div>
                <div className="text-white/70 text-xs">
                  Completed The Journey
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {badgeGenerated && (
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onNewSwap}
            className="flex-1 text-white font-semibold py-4 px-6 rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-5 h-5 inline mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Start New Swap Adventure
          </button>
          <button
            onClick={() => {
              // Simulate downloading NFT
              const link = document.createElement("a");
              link.href =
                "data:application/json;charset=utf-8," +
                encodeURIComponent(
                  JSON.stringify(
                    {
                      name: "I Survived The Swap",
                      description:
                        "A legendary NFT badge awarded to brave souls who completed Elton's Over-Engineered Swap Protocol",
                      image: "https://example.com/nft-badge.png",
                      attributes: badgeAttributes,
                    },
                    null,
                    2
                  )
                );
              link.download = "swap-survivor-nft.json";
              link.click();
            }}
            className="flex-1 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-pastel-purple to-pastel-blue"
          >
            <svg
              className="w-5 h-5 inline mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download NFT Metadata
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "I Survived The Swap!",
                  text: "I just completed the most over-engineered token swap in DeFi history and earned this legendary NFT badge! 🏆",
                  url: window.location.href,
                });
              }
            }}
            className="flex-1 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 bg-pastel-pink"
          >
            <svg
              className="w-5 h-5 inline mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share Achievement
          </button>
        </div>
      )}

      {/* Final Message */}
      {badgeGenerated && (
        <div className="text-center mt-8 animate-fadeIn">
          <div className="glass-dark rounded-2xl p-6 border-2 border-pastel-yellow/30">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-white italic text-lg mb-2">
              &ldquo;Thank you for surviving my over-engineered masterpiece! You
              are now forever part of DeFi comedy history.&rdquo;
            </p>
            <p className="text-white/60 text-sm">
              - Chef Elton, Creator of Theatrical Swaps
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
