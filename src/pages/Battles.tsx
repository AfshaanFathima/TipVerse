import { useState } from "react";
import { Sword, Trophy, Clock, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Battles = () => {
  const [selectedBattle, setSelectedBattle] = useState("global");

  const mockBattles = [
    {
      id: 1,
      type: "Global Leaderboard",
      description: "Compete with the best tippers and creators to earn rewards and climb the rankings",
      participants: 1247,
      timeLeft: "2d 14h",
      prizePool: "$5,000",
      topUsers: [
        { name: "CryptoKing", xp: 125840, streak: 47, tier: "Diamond" },
        { name: "TipMaster", xp: 98750, streak: 32, tier: "Diamond" },
        { name: "ViralHunter", xp: 87320, streak: 28, tier: "Diamond" }
      ]
    },
    {
      id: 2,
      type: "Tippers Battle",
      description: "Early prediction contest - tip on content before it goes viral",
      participants: 456,
      timeLeft: "6h 23m",
      prizePool: "$1,500",
      topUsers: [
        { name: "EarlyBird", xp: 76540, streak: 19, tier: "Gold" },
        { name: "TokenTrader", xp: 65890, streak: 15, tier: "Gold" },
        { name: "CryptoPro", xp: 54320, streak: 12, tier: "Silver" }
      ]
    },
    {
      id: 3,
      type: "Creator Battle",
      description: "Content creators compete for most viral posts and tips received",
      participants: 89,
      timeLeft: "1d 8h",
      prizePool: "$2,500",
      topUsers: [
        { name: "ContentKing", xp: 89750, streak: 25, tier: "Diamond" },
        { name: "ViralMaster", xp: 78430, streak: 20, tier: "Gold" },
        { name: "CreatorPro", xp: 67890, streak: 18, tier: "Gold" }
      ]
    }
  ];

  const getCurrentBattle = () => {
    return mockBattles.find(battle => battle.type.toLowerCase().includes(selectedBattle)) || mockBattles[0];
  };

  const battle = getCurrentBattle();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sword className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Leaderboards & Battles</h1>
              <p className="text-muted-foreground">Compete with the best tippers and creators to earn rewards and climb the rankings</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-80 space-y-4">
            <Card className="glass-strong border-border/20">
              <CardContent className="p-4 space-y-3">
                <Button
                  variant={selectedBattle === "global" ? "default" : "ghost"}
                  onClick={() => setSelectedBattle("global")}
                  className="w-full justify-start"
                >
                  <Trophy className="h-4 w-4 mr-3" />
                  Global Leaderboard
                </Button>
                <Button
                  variant={selectedBattle === "tippers" ? "default" : "ghost"}
                  onClick={() => setSelectedBattle("tippers")}
                  className="w-full justify-start"
                >
                  <Sword className="h-4 w-4 mr-3" />
                  Tippers Battle
                </Button>
                <Button
                  variant={selectedBattle === "creator" ? "default" : "ghost"}
                  onClick={() => setSelectedBattle("creator")}
                  className="w-full justify-start"
                >
                  <Users className="h-4 w-4 mr-3" />
                  Creator Battle
                </Button>
                <div className="border-t border-border pt-3 mt-4">
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    <Trophy className="h-4 w-4 mr-3" />
                    My Stats
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    <Badge className="h-4 w-4 mr-3" />
                    Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Battle Info */}
            <Card className="glass-strong border-border/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{battle.type}</CardTitle>
                    <p className="text-muted-foreground mt-1">{battle.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 justify-end mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Time Remaining</span>
                    </div>
                    <p className="text-xl font-bold text-warning">{battle.timeLeft}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Participants</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{battle.participants}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-success" />
                      <span className="text-sm text-muted-foreground">Prize Pool</span>
                    </div>
                    <p className="text-2xl font-bold text-success">{battle.prizePool}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Trophy className="h-5 w-5 text-warning" />
                      <span className="text-sm text-muted-foreground">My Rank</span>
                    </div>
                    <p className="text-2xl font-bold text-warning">#23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Select defaultValue="all-time">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="overall">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overall">Overall</SelectItem>
                    <SelectItem value="tips">Tips</SelectItem>
                    <SelectItem value="streak">Streak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-gradient-primary hover:shadow-glow">
                Join Battle
              </Button>
            </div>

            {/* Leaderboard */}
            <div className="space-y-4">
              {battle.topUsers.map((user, index) => (
                <Card key={index} className={`glass-strong border-border/20 hover:border-border/40 transition-all duration-300 ${
                  index < 3 ? 'ring-1 ring-primary/20' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 w-16">
                          <span className={`text-2xl font-bold ${index < 3 ? 'gradient-text' : 'text-muted-foreground'}`}>
                            #{index + 1}
                          </span>
                          {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                        </div>
                        
                        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                          <AvatarImage src={`/api/placeholder/40/40`} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-foreground">{user.name}</h3>
                            <Badge variant="outline" className={`${
                              user.tier === 'Diamond' ? 'text-cyan-400 border-cyan-400' :
                              user.tier === 'Gold' ? 'text-yellow-500 border-yellow-500' :
                              'text-gray-400 border-gray-400'
                            }`}>
                              {user.tier}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-muted-foreground">
                              {user.streak} day streak
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">
                          {user.xp.toLocaleString()} XP
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={75} className="w-24 h-2" />
                          <span className="text-xs text-muted-foreground">75%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};