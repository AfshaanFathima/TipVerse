import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, DollarSign, TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: {
    name: string;
    username: string;
    avatar: string;
  };
  content: {
    text?: string;
    timeRemaining: string;
  };
}

interface Token {
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  price: string;
  // add other fields if needed
}

export const TipModal = ({ isOpen, onClose, creator, content }: TipModalProps) => {
  // Remove backend token/balance logic
  // const [tokenList, setTokenList] = useState<Token[]>([]);
  // const [walletBalances, setWalletBalances] = useState<Record<string, any>>({});
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  // const { address: walletAddress, chainId } = useContext(WalletContext);

  // Use static tokens for demo/frontend
  const tokenList: Token[] = [
    {
      symbol: "USDC",
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      decimals: 6,
      logoURI: "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      price: "1.00"
    },
    {
      symbol: "ETH",
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      decimals: 18,
      logoURI: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      price: "3500.00"
    }
  ];

  // Use static balances for demo/frontend
  const walletBalances: Record<string, any> = {
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { balance: "10000000" }, // 10 USDC
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": { balance: "1000000000000000000" } // 1 ETH
  };

  // Remove all backend-related imports and logic
  // import { fetchWalletBalances, fetchTokenList } from "../../lib/fetchTokenDetails";

  // Fetch tokens and balances
  useEffect(() => {
    if (!isOpen) return;

    // const loadData = async () => {
    //   try {
    //     const [tokens, balances] = await Promise.all([
    //       fetchTokenList(chainId),
    //       fetchWalletBalances(walletAddress, chainId),
    //     ]);
    //     setTokenList(tokens as Token[]);
    //     setWalletBalances(balances);
    //     if ((tokens as Token[]).length > 0) setSelectedToken((tokens as Token[])[0].symbol);
    //   } catch (error) {
    //     setTokenList([]);
    //     setWalletBalances({});
    //     toast({
    //       title: "Error",
    //       description: "Failed to fetch token list or balances.",
    //       variant: "destructive",
    //     });
    //     console.error("Error fetching token data", error);
    //   }
    // };

    // loadData();
  }, [isOpen]);

  const selectedTokenData = tokenList.find(t => t.symbol === selectedToken);
  const balanceData = selectedTokenData ? walletBalances[selectedTokenData.address] : null;
  const balance = balanceData
    ? parseFloat(balanceData.balance) / Math.pow(10, selectedTokenData.decimals)
    : 0;

  const usdValue = selectedTokenData
    ? (parseFloat(amount || "0") * parseFloat(selectedTokenData.price)).toFixed(2)
    : "0.00";

  const earlyBonus = Math.max(1, 24 - parseInt(content.timeRemaining.split('h')[0] || "0")) * 0.1;
  const isInsufficient = parseFloat(amount || "0") > balance;

  const handleTip = async () => {
    if (!amount || parseFloat(amount) <= 0 || isInsufficient) {
      toast({
        title: "Invalid amount",
        description: isInsufficient ? "Insufficient balance" : "Enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    await new Promise(res => setTimeout(res, 2000));
    toast({
      title: "Tip sent successfully! 🎉",
      description: `You tipped ${amount} ${selectedToken} to @${creator.username} and earned ${(parseFloat(amount) * (1 + earlyBonus)).toFixed(0)} XP!`,
    });
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-border/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text text-xl">
            Tip @{creator.username}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Token Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Select Token
            </label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="glass border-border/20">
                <SelectValue placeholder="Choose token" />
              </SelectTrigger>
              <SelectContent className="glass-strong border-border/30 max-h-60 overflow-auto">
                {tokenList.map(token => {
                  const balanceEntry = walletBalances[token.address];
                  const tokenBalance = balanceEntry
                    ? (parseFloat(balanceEntry.balance) / Math.pow(10, token.decimals)).toFixed(4)
                    : "0.0000";
                  return (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center space-x-3">
                        <img src={token.logoURI} alt={token.symbol} className="w-5 h-5 rounded-full" />
                        <div>
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-xs text-muted-foreground">
                            Balance: {tokenBalance}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Amount</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="glass border-border/20 pr-16"
                step="0.01"
                min="0.01"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {selectedToken}
              </div>
            </div>
            {amount && (
              <div className="text-sm text-muted-foreground mt-1">
                ≈ ${usdValue} USD
              </div>
            )}
            {isInsufficient && (
              <div className="text-xs text-red-500 mt-1">
                Insufficient balance
              </div>
            )}
          </div>

          {/* Quick Amounts */}
          <div className="grid grid-cols-4 gap-2">
            {["1", "5", "10", "25"].map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                onClick={() => setAmount(quickAmount)}
                className="glass border-border/20"
              >
                {quickAmount}
              </Button>
            ))}
          </div>

          {/* Tip Info */}
          <div className="bg-gradient-secondary rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-muted-foreground">Time remaining</span>
              </div>
              <span className="text-warning font-medium">{content.timeRemaining}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">Early bonus</span>
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success">
                +{(earlyBonus * 100).toFixed(0)}% XP
              </Badge>
            </div>
            {amount && (
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/20">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">XP earned</span>
                </div>
                <span className="text-primary font-bold">
                  +{(parseFloat(amount) * (1 + earlyBonus)).toFixed(0)} XP
                </span>
              </div>
            )}
          </div>

          {/* Gas Estimation */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Estimated gas</span>
            <span>~$0.15</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 glass border-border/20"
            >
              Cancel
            </Button>
            <Button
              variant="gaming"
              onClick={handleTip}
              disabled={!amount || isProcessing || isInsufficient}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4" />
                  Send Tip
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
