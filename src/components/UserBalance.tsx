'use client';

import { CONTRACT_ABI } from "@/lib/contract";
import { formatEtherValue, getContractAddress } from "@/lib/util";
import { useAccount, useChainId, useReadContract } from "wagmi";


export default function UserBalance() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const contractAddress = getContractAddress(chainId)
  const {data, isLoading, error, isError, refetch, isRefetching, isRefetchError} = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'locks',
    args: [address as `0x${string}`],
  })


   const formatDate = (timestamp: bigint) => {
    if (!timestamp || timestamp === BigInt(0)) {
      return 'No deadline set';
    }

    const date = new Date(Number(timestamp) * 1000);

    // Check if date is valid
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Check if current time has passed the deadline
  const isDeadlinePassed = (deadline: bigint) => {
    if (!deadline || deadline === BigInt(0)) return false;
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime >= Number(deadline);
  };

  const deadline = data?.[0] || BigInt(0);
  const amount = data?.[1] || BigInt(0);
  const isWithdrawn = data?.[2] || false;
  const canWithdraw = isDeadlinePassed(deadline) && !isWithdrawn;

  if (isLoading || isRefetching) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Your Balance</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (isError || isRefetchError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Your Balance</h2>
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error.message || 'Failed to fetch balance'}
        </div>
        <button
        type="button"
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Your Balance</h2>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">🔗</div>
          <p className="text-black">Please connect your wallet</p>
          <p className="text-sm text-black">Connect to view your locked funds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Your Balance</h2>

      {Number(amount) && Number(amount) > 0 ? (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-black">Locked Amount:</span>
            <span className="font-semibold text-lg text-black">
              {formatEtherValue(amount)} ETH
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-black">Deadline:</span>
            <span className="font-medium text-black">
              {formatDate(deadline)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-black">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isWithdrawn
                ? 'bg-gray-100 text-gray-800' 
                : canWithdraw 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isWithdrawn
                ? 'Withdrawn' 
                : canWithdraw 
                  ? 'Ready to Withdraw' 
                  : 'Locked'
              }
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">💰</div>
          <p className="text-black">No locked funds found</p>
          <p className="text-sm text-black">Deposit some ETH to get started</p>
        </div>
      )}
      
      <button
      type="button"
        onClick={() => refetch()}
        className="mt-4 w-full py-2 px-4 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-colors"
      >
        Refresh
      </button>
    </div>
  );
}
