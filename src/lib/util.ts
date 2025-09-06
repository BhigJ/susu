import { parseEther, formatEther } from "viem";

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
	sepolia: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA || "",
	base: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE || "",
} as const;

// Helper function to get contract address based on chain ID
export const getContractAddress = (chainId: number): string => {
	switch (chainId) {
		case 11155111: // Sepolia testnet
			return CONTRACT_ADDRESSES.sepolia;
		case 8453: // Base mainnet
			return CONTRACT_ADDRESSES.base;
		case 84532: // Base Sepolia testnet
			return CONTRACT_ADDRESSES.base; // Use same address for Base testnet, or add separate env var
		default:
			return CONTRACT_ADDRESSES.sepolia; // Default fallback
	}
};

// Utility functions
export const formatEtherValue = (value: bigint) => {
	return formatEther(value);
};

export const parseEtherValue = (value: string) => {
	return parseEther(value);
};
