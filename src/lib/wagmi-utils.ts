import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ABI } from './contract';
import { CONTRACT_ADDRESS } from './web3';
import { parseEther, formatEther } from 'viem';

export const useUserAccount = () => {
  return useAccount();
};

export const useUserBalance = () => {
  const { address } = useAccount();
  
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'locks',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
};

// Utility functions
export const formatEtherValue = (value: bigint) => {
  return formatEther(value);
};

export const parseEtherValue = (value: string) => {
  return parseEther(value);
};
