import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Susu Savings',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID', // Replace with your WalletConnect Project ID
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
  ssr: true, // Enable if using server-side rendering
});
