'use client';

import { useState, useEffect } from 'react';
import { CONTRACT_ABI } from '@/lib/contract';
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { getContractAddress, parseEtherValue } from '@/lib/util';

interface DepositFormProps {
  onDepositSuccess: () => void;
}

export default function DepositForm({ onDepositSuccess }: DepositFormProps) {
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('1'); // minutes
  
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { writeContract, data: hash, isPending, isError: isWriteError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, error: confirmError, isError: isConfirmError } = useWaitForTransactionReceipt({
    hash,
  });

  const contractAddress = getContractAddress(chainId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !period || !isConnected) return;

     const amountWei = parseEtherValue(amount);
      const periodSeconds = BigInt(parseInt(period) * 60); // Convert minutes to seconds

      writeContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'deposit',
        args: [periodSeconds],
        value: amountWei,
      });
  };

  // Handle successful transaction
  useEffect(() => {
    if (isSuccess) {
      console.log('Deposit transaction successful!');
      onDepositSuccess();
    }
  }, [isSuccess, onDepositSuccess]);

  const isLoading = isPending || isConfirming;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Deposit Funds</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-black mb-1">
            Amount (ETH)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.0000001"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.0"
            required
          />
        </div>

        <div>
          <label htmlFor="period" className="block text-sm font-medium text-black mb-1">
            Lock Period
          </label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">1 minute</option>
            <option value="3">3 minutes</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
          </select>
        </div>

        {!isConnected && (
          <div className="text-blue-600 text-sm bg-blue-50 p-3 rounded-md">
            Please connect your wallet to deposit funds
          </div>
        )}

        {(isWriteError || isConfirmError) && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {confirmError?.message || 'Deposit failed'}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !amount || !isConnected}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (isPending ? 'Confirming...' : 'Depositing...') : 'Deposit'}
        </button>
      </form>
    </div>
  );
}
