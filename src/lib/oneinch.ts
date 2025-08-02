import axios from 'axios';

const ONE_INCH_API_BASE_URL = "https://api.1inch.dev/portfolio/v4";
const ONE_INCH_API_KEY = "xRe5RTYRHqyBgEo4HNeoM6SqAQE9vKx1";

export interface Token {
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  name: string;
  price: number;
  // Add other fields if needed from 1inch API response
}

interface WalletBalance {
  balance: string;
  value: number;
  token: {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
    price: number;
  };
}

export const fetchTokenList = async (chainId: number): Promise<Token[]> => {
  try {
    const response = await axios.get(`${ONE_INCH_API_BASE_URL}/tokens`, {
      params: {
        chain_id: chainId
      },
      headers: {
        'Authorization': `Bearer ${ONE_INCH_API_KEY}`
      }
    });
    // 1inch token list API returns an array of tokens
    return response.data as Token[];
  } catch (error) {
    console.error("Error fetching token list from 1inch:", error);
    return [];
  }
};

export const fetchWalletBalances = async (walletAddress: string, chainId: number): Promise<WalletBalance[]> => {
  try {
    const response = await axios.get(`${ONE_INCH_API_BASE_URL}/balances`, {
      params: {
        chain_id: chainId,
        address: walletAddress,
      },
      headers: {
        'Authorization': `Bearer ${ONE_INCH_API_KEY}`
      }
    });
    // 1inch balances API returns an object with balances array
    const data = response.data as { balances: WalletBalance[] };
    return data.balances || [];
  } catch (error) {
    console.error("Error fetching wallet balances from 1inch:", error);
    return [];
  }
};
