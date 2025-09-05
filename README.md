# Susu Savings - Time-Locked Savings DApp

A Next.js TypeScript frontend for a time-locked savings smart contract. Users can deposit ETH for a specified period and withdraw it after the deadline passes.

## Features

- 🔗 **Wallet Integration**: Connect with MetaMask or other Web3 wallets
- 💰 **Deposit Funds**: Lock ETH for 7, 30, 90, 180, or 365 days
- ⏰ **Time-Locked**: Funds are locked until the deadline you choose
- 🎯 **Withdraw**: Withdraw your funds after the deadline passes
- 📊 **Balance Tracking**: View your locked balance and deadline
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get WalletConnect Project ID**
   - Register for free at [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project and copy your Project ID

3. **Set Environment Variables**
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   ```

4. **Run Development Server**
```bash
npm run dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Smart Contract ABI

The frontend is configured to work with a smart contract that includes the following functions:

- `deposit(uint256 periodSeconds)` - Deposit ETH for a specified period
- `withdraw()` - Withdraw locked funds after deadline
- `balanceOf(address user)` - Get user's locked balance
- `deadlineOf(address user)` - Get user's withdrawal deadline
- `locks(address user)` - Get complete lock information

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask or other Web3 wallet
2. **Deposit**: Enter an amount in ETH and select a lock period (7-365 days)
3. **Wait**: Your funds are locked until the deadline
4. **Withdraw**: After the deadline passes, you can withdraw your funds

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **RainbowKit** - Wallet connection UI
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **WalletConnect** - Multi-wallet support

## Contract Events

The frontend listens for these contract events:
- `Deposited` - Emitted when a user deposits funds
- `Withdrawn` - Emitted when a user withdraws funds

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Security Notes

- Always verify the contract address before connecting
- Test with small amounts first
- Ensure you understand the lock period before depositing
- Funds cannot be withdrawn before the deadline

## License

MIT License