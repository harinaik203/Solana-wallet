# Token Blossom

A web application for creating, minting, and managing SPL tokens on the Solana blockchain.

## Features

- Create custom SPL tokens
- Mint tokens to your wallet
- Send tokens to other addresses
- View token balances
- Track transaction history
- Built with Next.js and Solana Web3

## Prerequisites

- Node.js (version 16 or higher)
- Phantom Wallet browser extension
- Basic understanding of Solana blockchain

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd token-blossom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Wallet Setup

1. Install Phantom Wallet browser extension
2. Create a new wallet or import an existing one
3. Switch to Solana Devnet:
   - Open Phantom Wallet
   - Click the gear icon (Settings)
   - Go to "Developer Settings"
   - Select "Devnet" from the network options

## Getting Started

### Getting Devnet SOL

1. Connect your wallet to the application
2. Copy your wallet address (starts with 6AJR81...)
3. Go to https://solfaucet.com/
4. Paste your wallet address
5. Request devnet SOL (1 SOL is enough)

### Creating a Token

1. Click the "Create" tab
2. Fill in the token details:
   - Token Name: (e.g., "haritoken")
   - Token Symbol: (e.g., "abc")
   - Decimals: (e.g., 3)
3. Click "Create Token"
4. Wait for the transaction to complete
5. Note down your token's mint address (starts with 9TD3P8...)

### Minting Tokens

1. Click the "Mint" tab
2. Enter the token details:
   - Token Mint Address: (paste your token's mint address)
   - Amount: (e.g., 100)
   - Leave destination address empty (it will mint to your wallet)
3. Click "Mint Tokens"
4. Approve the transaction in your Phantom wallet
5. Wait for the transaction to complete

### Checking Token Balance

1. Look at the "Token Balances" section
2. You should see your token listed with the amount you minted
3. The balance will show as: "100.000" (if you minted 100 tokens with 3 decimals)

### Sending Tokens

1. Click the "Send" tab
2. Fill in the details:
   - Token Mint Address: (your token's mint address)
   - Recipient Wallet Address: (the address to send to)
   - Amount: (how many tokens to send)
3. Click "Send Tokens"
4. Approve the transaction in your Phantom wallet

### Viewing Transaction History

1. Check the "Transaction History" section
2. You'll see all your transactions:
   - Token creation
   - Minting
   - Sending
3. Each transaction shows:
   - Type (Create/Mint/Send)
   - Date
   - Token address
   - Transaction signature

## Important Notes

1. Always work on Devnet for testing
2. Keep your token's mint address safe
3. Make sure you have enough SOL for transactions
4. Transactions may take a few seconds to complete
5. Refresh the page if balances don't update immediately

## Troubleshooting

### Wallet Connection Issues

1. If wallet connection fails:
   - Disconnect and reconnect your wallet
   - Refresh the page
   - Check if Phantom wallet is on Devnet

### Transaction Issues

1. If transactions fail:
   - Check your SOL balance
   - Verify you're using the correct mint address
   - Make sure you're the token authority

### Balance Update Issues

1. If balances don't update:
   - Click the refresh button in the Token Balances section
   - Wait a few seconds for blockchain confirmation
   - Refresh the page if needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.







