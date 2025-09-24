"use client";

import { useState } from "react";

export default function Home() {
  const [fromAmount, setFromAmount] = useState("7,695.89");
  const [toAmount, setToAmount] = useState("83,924.43");
  const [activeTab, setActiveTab] = useState("Swap");

  const handleSwap = () => {
    // Logic to swap tokens
    console.log("Swapping tokens");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Progress Steps */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 glass-steps rounded-full px-6 py-3">
          <div className="flex items-center justify-center w-8 h-8 bg-white/30 backdrop-blur rounded-full text-white text-sm font-medium border border-white/20">
            1
          </div>
          <span className="text-white text-sm font-medium">Select tokens</span>
          <div className="flex items-center justify-center w-8 h-8 bg-white/10 backdrop-blur rounded-full text-white/50 text-sm border border-white/10">
            2
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-white/10 backdrop-blur rounded-full text-white/50 text-sm border border-white/10">
            3
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-white/10 backdrop-blur rounded-full text-white/50 text-sm border border-white/10">
            4
          </div>
        </div>
      </div>

      {/* Main Swap Interface */}
      <div className="w-full max-w-lg">
        {/* Tab Navigation */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("Swap")}
            className={`px-6 py-3 font-medium text-lg ${
              activeTab === "Swap"
                ? "text-white border-b-2 border-white"
                : "text-white/50"
            }`}
          >
            Swap
          </button>
          <button
            onClick={() => setActiveTab("Pool")}
            className={`px-6 py-3 font-medium text-lg ${
              activeTab === "Pool"
                ? "text-white border-b-2 border-white"
                : "text-white/50"
            }`}
          >
            Pool
          </button>
        </div>

        {/* Swap Card */}
        <div className="glass-card rounded-3xl p-6 relative shadow-2xl">
          {/* Settings and Refresh Icons */}
          <div className="flex justify-end mb-4 space-x-2">
            <button className="glass-button w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="glass-button w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* From Section */}
          <div className="glass-dark rounded-2xl p-4 mb-1 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">From:</span>
              <span className="text-white/70 text-sm">2er6d...8dfg2 N</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-white/70 text-sm">Token</span>
              <span className="text-white/70 text-sm">Network</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-black">B</span>
                </div>
                <span className="text-white font-medium">BNB</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <span className="text-white font-medium">Binance</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-white/70 text-sm">You send:</span>
                <span className="text-white/70 text-sm ml-2">Available: 23,489.89</span>
                <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded ml-2">MAX</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="text-white text-3xl font-light">{fromAmount}</div>
              <div className="text-white/50 text-sm">≈$24,345</div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-2">
            <button 
              onClick={handleSwap}
              className="glass-button w-12 h-12 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div className="glass-dark rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">To:</span>
              <span className="text-white/70 text-sm">0xe5d...85bde 🦊</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-white/70 text-sm">Token</span>
              <span className="text-white/70 text-sm">Network</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">₮</span>
                </div>
                <span className="text-white font-medium">USDT</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">▲</span>
                </div>
                <span className="text-white font-medium">Avalanche</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-white/70 text-sm">You receive:</span>
                <span className="text-white/70 text-sm ml-2">Balance: 7,575.93</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="text-white text-3xl font-light">{toAmount}</div>
              <div className="text-white/50 text-sm">≈$23,827</div>
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <span className="text-white/70">1 BNB = 35,573989 USDT</span>
            <span className="text-green-400">▲ 5.62% (24H)</span>
          </div>
          <div className="text-white/50 text-xs mt-1">
            Rate is for reference only. Updated just now
          </div>

          {/* Select Route Button */}
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-6 rounded-2xl mt-6 transition-colors">
            Select Route ››
          </button>
        </div>
      </div>
    </div>
  );
}
