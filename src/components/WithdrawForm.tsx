'use client';

import { useEffect } from 'react';
import { CONTRACT_ABI } from '@/lib/contract';
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { getContractAddress } from '@/lib/util';

interface WithdrawFormProps {
  onWithdrawSuccess: () => void;
}

export default function WithdrawForm({ onWithdrawSuccess }: WithdrawFormProps) {
  
  const { isConnected } = useAccount();
  const chainId = useChainId();

  const contractAddress = getContractAddress(chainId)

  const { writeContract, data: hash, isPending, isError: isWriteError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, isError: isConfirmError, error: confirmError } = useWaitForTransactionReceipt({
    hash,
  });

  const handleWithdraw = async () => {
    if (!isConnected) return;

    writeContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'withdraw',
      });
  };

  // Handle successful transaction
  useEffect(() => {
    if (isSuccess) {
      console.log('Withdraw transaction successful!');
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

      {(isWriteError || isConfirmError) && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md mb-4">
          {confirmError?.message || 'Withdraw failed'}
        </div>
      )}

      <button
      type='button'
        onClick={handleWithdraw}
        disabled={isLoading || !isConnected}
        className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (isPending ? 'Confirming...' : 'Withdrawing...') : 'Withdraw'}
      </button>
    </div>
  );
}
