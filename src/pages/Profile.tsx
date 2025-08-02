import { useState } from "react";
import { Edit3, Share, BarChart3, Receipt, Settings, TrendingUp, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const userStats = {
    totalEarnings: "2,450",
    totalTips: "156",
    xp: 12750,
    level: 25,
    rank: 47,
    followers: 1234,
    following: 567,
    streak: 12,
    winRate: 78,
    battlesWon: 23,
    nextLevelXP: 15000,
    currentLevelXP: 12000
  };

  const userProfile = {
    name: "CryptoCreator",
    username: "cryptocreator",
    avatar: "/api/placeholder/120/120",
    level: 15,
    xp: 24750,
    bio: "Passionate about DeFi and creating viral content. Early adopter of prediction markets and gamified tipping systems.",
    stats: {
      totalTips: 1247,
      predictions: 89,
      streak: 12,
      rank: 23
    },
    achievements: [
      { name: "Early Bird", icon: "🐦", color: "bg-yellow-500" },
      { name: "Viral Predictor", icon: "🎯", color: "bg-green-500" },
      { name: "Top Tipper", icon: "💎", color: "bg-blue-500" },
      { name: "Battle Champion", icon: "🏆", color: "bg-orange-500" }
    ]
  };

  const mockStats = [
    {
      title: "Total Value",
      value: "$15,420.5",
      change: "+12.5%",
      period: "24h",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Total Rewards",
      value: "$3,250.75",
      period: "This month",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Active Tips",
      value: "8",
      period: "Pending results",
      icon: Clock,
      trend: "same"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="glass-strong border-border/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="text-2xl">{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground ring-2 ring-background">
                  {userProfile.level}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{userProfile.name}</h1>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Level {userProfile.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-1">@{userProfile.username} • {userProfile.xp.toLocaleString()} XP</p>
                <p className="text-foreground mb-4 max-w-2xl">{userProfile.bio}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{userProfile.stats.totalTips}</p>
                    <p className="text-sm text-muted-foreground">Total Tips</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{userProfile.stats.predictions}</p>
                    <p className="text-sm text-muted-foreground">Predictions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">{userProfile.stats.streak}</p>
                    <p className="text-sm text-muted-foreground">Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gradient-text">{userProfile.stats.rank}</p>
                    <p className="text-sm text-muted-foreground">Rank</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Achievements</h3>
                  <div className="flex items-center space-x-2">
                    {userProfile.achievements.map((achievement, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        <span>{achievement.icon}</span>
                        <span className="text-xs">{achievement.name}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button className="bg-gradient-primary hover:shadow-glow">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full md:w-auto mb-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center space-x-2">
              <Receipt className="h-4 w-4" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockStats.map((stat, index) => (
                <Card key={index} className="glass-strong border-border/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      {stat.change && (
                        <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="bg-success/10 text-success">
                          {stat.change}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.period}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card className="glass-strong border-border/20">
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Portfolio details coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="glass-strong border-border/20">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Activity feed coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="glass-strong border-border/20">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Transaction history coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="glass-strong border-border/20">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};