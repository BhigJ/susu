'use client';

import { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';
import UserBalance from '@/components/UserBalance';
import DepositForm from '@/components/DepositForm';
import WithdrawForm from '@/components/WithdrawForm';

export default function Home() {

  const handleTransactionSuccess = () => {
    // Refresh the entire page
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-black">Susu Savings</h1>
              <span className="ml-2 text-sm text-black">Time-Locked Savings</span>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">Welcome to Susu Savings</h2>
          <p className="text-black">
            Lock your ETH for a specified period and earn the discipline of saving. 
            Your funds will be locked until the deadline you choose.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Balance and Withdraw */}
          <div className="space-y-6">
            <UserBalance />
            <WithdrawForm onWithdrawSuccess={handleTransactionSuccess} />
          </div>

          {/* Right Column - Deposit */}
          <div>
            <DepositForm onDepositSuccess={handleTransactionSuccess} />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-black mb-8 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-black">1. Deposit</h4>
              <p className="text-black">
                Choose an amount and lock period. Your ETH will be locked until the deadline.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-black">2. Wait</h4>
              <p className="text-black">
                Your funds are safely locked. You cannot withdraw until the deadline passes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-black">3. Withdraw</h4>
              <p className="text-black">
                Once the deadline passes, you can withdraw your funds and enjoy your savings.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-black">
            <p>Built with Next.js and Web3 technology</p>
            <p className="mt-2 text-sm">
              Make sure to set your contract address in the environment variables
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
