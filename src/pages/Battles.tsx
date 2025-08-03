import { useState } from "react";
import { Sword, Trophy, Users, DollarSign, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface Tipper {
  name: string;
  xp: number;
  tips: number;
  viralTips: number;
  streak: number;
  tier: string;
  avatar: string;
}

export const Battles = () => {
  const [selectedBattle, setSelectedBattle] = useState("tippers");

  // Mock data for Tippers' Battle
  const tippersLeaderboard: Tipper[] = [
    { name: "EarlyBird", xp: 76540, tips: 120, viralTips: 15, streak: 19, tier: "Gold", avatar: "/api/placeholder/40/40" },
    { name: "TokenTrader", xp: 65890, tips: 110, viralTips: 12, streak: 15, tier: "Gold", avatar: "/api/placeholder/40/40" },
    { name: "CryptoPro", xp: 54320, tips: 95, viralTips: 10, streak: 12, tier: "Silver", avatar: "/api/placeholder/40/40" },
    { name: "PredictorX", xp: 48000, tips: 80, viralTips: 8, streak: 10, tier: "Silver", avatar: "/api/placeholder/40/40" }
  ];

  // Mock data for Creator Battle
  const creatorBattlePosts = [
    {
      id: 1,
      creator: { name: "ContentKing", avatar: "/api/placeholder/40/40" },
      title: "Will ETH break $4000 this week?",
      tips: 120,
      viral: true,
      badge: "Top Creator"
    },
    {
      id: 2,
      creator: { name: "ViralMaster", avatar: "/api/placeholder/40/40" },
      title: "Solana NFTs: Next Big Thing?",
      tips: 98,
      viral: false,
      badge: ""
    },
    {
      id: 3,
      creator: { name: "CreatorPro", avatar: "/api/placeholder/40/40" },
      title: "DeFi Summer 2.0 Incoming?",
      tips: 85,
      viral: false,
      badge: ""
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Sword className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold gradient-text">Battles & Leaderboards</h1>
        </div>

        {/* Battle Switcher */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={selectedBattle === "tippers" ? "default" : "outline"}
            onClick={() => setSelectedBattle("tippers")}
            className="flex items-center gap-2 px-6 py-2 font-semibold"
          >
            <Sword className="h-5 w-5" />
            Tippers' Battle
          </Button>
          <Button
            variant={selectedBattle === "creator" ? "default" : "outline"}
            onClick={() => setSelectedBattle("creator")}
            className="flex items-center gap-2 px-6 py-2 font-semibold"
          >
            <Trophy className="h-5 w-5" />
            Creator Battle
          </Button>
        </div>

        {/* Tippers' Battle */}
        {selectedBattle === "tippers" && (
          <Card className="glass-strong border border-border/20 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Sword className="h-5 w-5 text-primary" />
                Tippers' Battle (Prediction-Based Rewards)
              </CardTitle>
              <p className="text-muted-foreground mt-2 text-sm">
                Earn XP for every tip. The earlier you tip, the more XP you earn.<br />
                Top XP holders qualify for the Tippers’ Battle. Winners are chosen based on how many of their tips became top viral posts.
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <DollarSign className="h-5 w-5 text-success" />
                <span className="font-semibold text-success">Prize Pool: $1,500 + Mystery Boxes*</span>
                <Gift className="h-5 w-5 text-warning" />
                <span className="text-xs text-muted-foreground">Mystery Boxes may contain rare NFTs, badges, or bonus XP</span>
              </div>
              <div className="mb-2 font-semibold text-lg">Leaderboard</div>
              <div className="space-y-4">
                {tippersLeaderboard.map((user, idx) => (
                  <Card key={user.name} className="border border-border/20 shadow-sm">
                    <CardContent className="flex items-center gap-4 py-4">
                      <span className={`text-xl font-bold ${idx === 0 ? "gradient-text" : "text-muted-foreground"}`}>#{idx + 1}</span>
                      <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                        <AvatarImage src={user.avatar || "/api/placeholder/40/40"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{user.name}</span>
                          <Badge variant="outline" className={`ml-2 ${user.tier === "Gold" ? "text-yellow-500 border-yellow-500" : "text-gray-400 border-gray-400"}`}>{user.tier}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.tips} tips • {user.viralTips} viral tips • {user.streak} day streak
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-primary">{user.xp.toLocaleString()} XP</span>
                        <Progress value={Math.min(100, user.xp / 1000)} className="w-20 h-2 mt-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Creator Battle */}
        {selectedBattle === "creator" && (
          <Card className="glass-strong border border-border/20 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" />
                Creator Battle
              </CardTitle>
              <p className="text-muted-foreground mt-2 text-sm">
                At the end of the 24-hour tipping window, the top “n” most-tipped posts enter a Creator Battle window.<br />
                Creators promote their content for a few hours more. The winner gets a Top Creator Badge and a bonus reward (e.g., higher share of the tipping pool).
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <DollarSign className="h-5 w-5 text-success" />
                <span className="font-semibold text-success">Bonus Reward: Higher share of tipping pool</span>
                <Badge className="bg-warning/20 text-warning ml-2">Top Creator Badge*</Badge>
              </div>
              <div className="mb-2 font-semibold text-lg">Top Creator Posts</div>
              <div className="space-y-4">
                {creatorBattlePosts.map((post, idx) => (
                  <Card key={post.id} className="border border-border/20 shadow-sm">
                    <CardContent className="flex items-center gap-4 py-4">
                      <span className={`text-xl font-bold ${post.viral ? "gradient-text" : "text-muted-foreground"}`}>#{idx + 1}</span>
                      <Avatar className="w-10 h-10 ring-2 ring-warning/20">
                        <AvatarImage src={post.creator.avatar} />
                        <AvatarFallback>{post.creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.creator.name}</span>
                          {post.badge && <Badge className="bg-warning/20 text-warning ml-2">{post.badge}</Badge>}
                        </div>
                        <div className="text-xs text-muted-foreground">{post.title}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-primary">{post.tips} tips</span>
                        {post.viral && <span className="ml-2 text-xs text-success">Viral</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};