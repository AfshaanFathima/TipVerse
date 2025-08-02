import { TrendingUp, DollarSign, Zap, Users, Trophy, Crown, Target, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProfileStatsProps {
  stats: {
    totalEarnings: string;
    totalTips: string;
    xp: number;
    level: number;
    rank: number;
    followers: number;
    following: number;
    streak: number;
    winRate: number;
    battlesWon: number;
    nextLevelXP: number;
    currentLevelXP: number;
  };
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => {
  const xpProgress = ((stats.xp - stats.currentLevelXP) / (stats.nextLevelXP - stats.currentLevelXP)) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Level & XP */}
      <Card className="glass-strong border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Level</span>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {stats.level}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">
                {stats.xp.toLocaleString()} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {(stats.nextLevelXP - stats.xp).toLocaleString()} XP to level {stats.level + 1}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Rank */}
      <Card className="glass-strong border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">Global Rank</span>
            </div>
          </div>
          <div className="text-2xl font-bold gradient-text">
            #{stats.rank}
          </div>
          <div className="text-xs text-success mt-1">
            ↗ +5 this week
          </div>
        </CardContent>
      </Card>

      {/* Earnings */}
      <Card className="glass-strong border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Total Earned</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-success">
            ${stats.totalEarnings}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            From {stats.totalTips} tips
          </div>
        </CardContent>
      </Card>

      {/* Battle Stats */}
      <Card className="glass-strong border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">Win Rate</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {stats.winRate}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {stats.battlesWon} battles won
          </div>
        </CardContent>
      </Card>

      {/* Social Stats */}
      <Card className="glass-strong border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Network</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-lg font-bold text-foreground">
                {stats.followers.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {stats.following.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak */}
      <Card className="glass-strong border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-muted-foreground">Streak</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-orange-500">
            {stats.streak} days
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Keep it going! 🔥
          </div>
        </CardContent>
      </Card>

      {/* Performance Metric */}
      <Card className="glass-strong border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Performance</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            92%
          </div>
          <div className="text-xs text-success mt-1">
            ↗ Above average
          </div>
        </CardContent>
      </Card>

      {/* XP Rate */}
      <Card className="glass-strong border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">XP/Day</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-warning">
            +485
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            7-day average
          </div>
        </CardContent>
      </Card>
    </div>
  );
};