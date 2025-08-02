// src/lib/oneinch.ts
export const fetchTokenList = async (chainId: number = 1) => {
  try {
    const res = await fetch(`http://localhost:5000/api/tokens/${chainId}`);
    if (!res.ok) throw new Error("Failed to fetch token list from backend");
    const tokens = await res.json();
    return Object.values(tokens); // Array of tokens
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchWalletBalances = async (walletAddress: string, chainId: number = 1) => {
  try {
    const res = await fetch(`http://localhost:5000/api/balance/${chainId}/${walletAddress}`);
    if (!res.ok) throw new Error("Failed to fetch balances from backend");
    const balances = await res.json();
    return balances; // Object with token address as keys
  } catch (error) {
    console.error(error);
    return {};
  }
};
