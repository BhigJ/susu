'use client';

import { useState, useEffect } from 'react';
import {  useUserAccount } from '@/lib/wagmi-utils';
import { CONTRACT_ADDRESS } from '@/lib/web3';
import { CONTRACT_ABI } from '@/lib/contract';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

interface WithdrawFormProps {
  onWithdrawSuccess: () => void;
}

export default function WithdrawForm({ onWithdrawSuccess }: WithdrawFormProps) {
  const [error, setError] = useState('');
  
  const { isConnected } = useUserAccount();
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleWithdraw = async () => {
    if (!isConnected) return;

    setError('');

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'withdraw',
      });
    } catch (err: any) {
      console.error('Withdraw failed:', err);
      setError(err.message || 'Withdraw failed');
    }
  };

  // Handle successful transaction
  useEffect(() => {
    if (isSuccess) {
      onWithdrawSuccess();
    }
  }, [isSuccess, onWithdrawSuccess]);

  const isLoading = isPending || isConfirming;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Withdraw Funds</h2>
      <p className="text-black mb-4">
        Withdraw your locked funds after the deadline has passed.
      </p>

      {!isConnected && (
        <div className="text-blue-600 text-sm bg-blue-50 p-3 rounded-md mb-4">
          Please connect your wallet to withdraw funds
        </div>
      )}

      {(error || writeError) && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md mb-4">
          {error || writeError?.message || 'Withdraw failed'}
        </div>
      )}

      <button
        onClick={handleWithdraw}
        disabled={isLoading || !isConnected}
        className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (isPending ? 'Confirming...' : 'Withdrawing...') : 'Withdraw'}
      </button>
    </div>
  );
}
