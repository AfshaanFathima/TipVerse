import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Flame, Shield, TrendingDown, TrendingUp } from "lucide-react";

interface LeaderboardCardProps {
  rank: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    level: number;
    tier: "Diamond" | "Gold" | "Silver" | "Bronze";
  };
  stats: {
    xp: number;
    streak: number;
    trend: "up" | "down" | "same";
  };
  badges: string[];
  hideTier?: boolean;
}

export const LeaderboardCard = ({ rank, user, stats, badges, hideTier }: LeaderboardCardProps) => {
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Shield className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Shield className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getTierColor = () => {
    switch (user.tier) {
      case "Diamond":
        return "text-cyan-400";
      case "Gold":
        return "text-yellow-500";
      case "Silver":
        return "text-gray-400";
      case "Bronze":
        return "text-amber-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = () => {
    switch (stats.trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <span className="w-4 h-4 text-muted-foreground">—</span>;
    }
  };

  return (
    <Card className={`border-2 border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl bg-card transition-all duration-300 ${rank <= 3 ? 'ring-1 ring-primary/20 shadow-glow' : ''} ${hideTier ? 'min-w-[260px] max-w-[340px] w-full' : ''}`}>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 items-stretch">
          <div className="flex gap-4 items-center">
            {/* Rank */}
            <div className="flex flex-col items-center justify-center w-12 shrink-0">
              <span className={`text-2xl font-bold ${rank <= 3 ? 'gradient-text' : 'text-muted-foreground'}`}>#{rank}</span>
              {getRankIcon()}
            </div>
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                {user.level}
              </div>
            </div>
            {/* User Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground break-words">{user.name}</h3>
                {!hideTier && (
                  <Badge variant="outline" className={`${getTierColor()} border-current`}>
                    {user.tier}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground break-words">@{user.username}</p>
              <div className="flex items-center flex-wrap gap-1 mt-1">
                {badges.slice(0, 3).map((badge, index) => (
                  <span key={index} className="text-xs">{badge}</span>
                ))}
                {badges.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{badges.length - 3}</span>
                )}
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="flex flex-row gap-4 items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">{stats.xp.toLocaleString()} XP</span>
              {getTrendIcon()}
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">{stats.streak} day streak</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};