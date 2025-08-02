# 💡 TipVerse

**TipVerse** is a Web3 tipping protocol that fuses **DeFi mechanics**, **social engagement**, and **prediction rewards** into a gamified creator economy. It allows fans to tip creators using any token, auto-swapped via 1inch Fusion+, while competing to predict viral content and earn rewards.


---

## 🚀 Why TipVerse?

Creators struggle with monetization. Fans lack incentive to support early. TipVerse changes that by making **every tip a prediction**, and **every post an opportunity** to win.

---

## 🧠 Core Idea

> Tip in any token → Swapped to creator's preferred token via 1inch → Earn XP based on timing → Compete in battles → Get rewards.

---

## 🌟 Key Features

### 1. Content & Tipping System
- Creators post content (images, videos, blogs).
- Tipping window open for 24 hours.
- Tippers can use *any* token → swapped using **1inch Fusion+** to creator's accepted token.

### 2. Fusion+ Swap Integration
- Gasless, MEV-protected swaps.
- Seamless UX: no token compatibility issues.
- Built using 1inch Fusion+ & Limit Order API.

### 3. XP & Leaderboard
- Tippers earn XP based on *how early* they tipped.
- Public leaderboard promotes top predictors.

### 4. Tippers’ Battle
- Top XP holders battle based on who predicted viral content.
- Winners earn:
  - Share of the tipping pool
  - NFT badges, mystery boxes, etc.

### 5. Creator Battle
- Top creators enter a final promotion round.
- Winner receives Top Creator Badge + Bonus Tip Boost.

### 6. Limit Order Price Protection
- Creator tokens automatically protected against price drops via 1inch Limit Orders.

### 7. NFT-Based Reputation System
- NFT badges for achievements: Early Tipper, Viral Predictor, Top Creator, etc.

### 8. Mystery Boxes
- Surprise XP, NFT drops, boost multipliers, and access passes.

---

## 🧱 Tech Stack

| Layer          | Tech                         |
|----------------|------------------------------|
| Frontend       | Vite + React + TypeScript    |
| Auth           | Firebase Google Auth         |
| Wallet Connect | RainbowKit + Wagmi + Ethers  |
| Backend        | Node.js / Firebase (planned) |
| APIs Used      | 1inch Fusion+, Limit Order, Wallet Balances, Portfolio, Token Prices |
| Blockchain     | EVM-compatible (Polygon, Base, etc.) |
| NFTs           | ERC-721 / dynamic metadata (planned) |

---

## 🔌 1inch API Integrations

- **Fusion+ Swap API** — Token swaps via limit orders  
- **Limit Order Protocol** — Price protection for tipped tokens  
- **Wallet Balances API** — Display user balances in tipping modal  
- **Portfolio API** — Creator earnings and tipper profiles  
- **Token Metadata & Price API** — Token info, estimated USD values  
- **Transaction Gateway API** — Submit signed transactions  
- **History API** (planned) — Tip history and leaderboard validation

---

## 📦 Setup & Run Locally

```bash
git clone https://github.com/yourusername/tipverse.git
cd tipverse
npm install
npm run dev

