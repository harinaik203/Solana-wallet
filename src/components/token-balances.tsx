"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AccountLayout, TOKEN_PROGRAM_ID, getMint } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Check, Copy, Loader, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TokenAccount {
  mint: string;
  address: string;
  amount: string;
  formattedAmount: string;
}

const TokenBalances = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedState, setCopiedState] = useState<Record<string, boolean>>({});

  const fetchTokenAccounts = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    try {
      const accounts = await connection.getTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      const tokenAccounts = await Promise.all(
        accounts.value.map(async (account) => {
          const accountData = AccountLayout.decode(account.account.data);
          const mintAddress = new PublicKey(accountData.mint);
          const mintInfo = await getMint(connection, mintAddress);
          const decimals = mintInfo.decimals;

          const amountRaw = BigInt(accountData.amount.toString());
          const rawAmount = Number(amountRaw) / Math.pow(10, decimals);
          const formattedAmount =
            rawAmount % 1 === 0
              ? rawAmount.toFixed(0)
              : rawAmount.toFixed(decimals);

          return {
            mint: mintAddress.toString(),
            address: account.pubkey.toString(),
            amount: accountData.amount.toString(),
            formattedAmount,
          };
        }),
      );

      setTokenAccounts(
        tokenAccounts.filter((account) => Number(account.formattedAmount) > 0),
      );
    } catch (error) {
      console.error("Error fetching token accounts:", error);
      toast("Error fetching tokens", {
        description: "Could not fetch your token balances. Please try again.",
        className: "destructive-toast",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      void fetchTokenAccounts();
    } else {
      setTokenAccounts([]);
    }
  }, [publicKey, connection]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedState({ ...copiedState, [text]: true });
        toast("Copied!", {
          description: `${type} address copied to clipboard`,
        });

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopiedState((prev) => ({ ...prev, [text]: false }));
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast("Copy failed", {
          description: "Failed to copy to clipboard",
          className: "destructive-toast",
        });
      },
    );
  };

  return (
    <Card className="bg-card w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-gradient text-2xl font-bold">
            Token Balances
          </CardTitle>
          <CardDescription>Your SPL token balances</CardDescription>
        </div>
        {publicKey && (
          <Button
            variant="outline"
            size="icon"
            onClick={fetchTokenAccounts}
            disabled={isLoading}
            className="ml-auto h-8 w-8"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="text-muted-foreground h-6 w-6 animate-spin" />
          </div>
        ) : !publicKey ? (
          <p className="text-muted-foreground py-6 text-center">
            Connect your wallet to view token balances
          </p>
        ) : tokenAccounts.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center">
            No tokens found in your wallet
          </p>
        ) : (
          <div className="space-y-2">
            {tokenAccounts.map((account, index) => (
              <div
                key={index}
                className="bg-secondary/30 flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium">
                      Mint: {formatAddress(account.mint)}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() =>
                              copyToClipboard(account.mint, "Mint")
                            }
                          >
                            {copiedState[account.mint] ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy mint address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-muted-foreground text-xs">
                      Account: {formatAddress(account.address)}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() =>
                              copyToClipboard(account.address, "Account")
                            }
                          >
                            {copiedState[account.address] ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy account address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <p className="font-bold">{account.formattedAmount}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenBalances;
