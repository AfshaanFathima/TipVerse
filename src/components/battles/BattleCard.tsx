import { useState } from "react";
import { Timer, Users, DollarSign, Trophy, Flame, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface BattleCardProps {
  battle: {
    id: string;
    type: "tippers" | "creators";
    title: string;
    description: string;
    timeRemaining: string;
    prizePool: string;
    participants: number;
    maxParticipants: number;
    status: "active" | "ended" | "upcoming";
    contestants?: {
      name: string;
      username: string;
      avatar: string;
      votes?: number;
      tips?: string;
    }[];
  };
}

export const BattleCard = ({ battle }: BattleCardProps) => {
  const [hasParticipated, setHasParticipated] = useState(false);
  const { toast } = useToast();

  const handleParticipate = () => {
    setHasParticipated(true);
    toast({
      title: "Joined Battle! ⚔️",
      description: `You're now participating in ${battle.title}`,
    });
  };

  const handleVote = (contestant: any) => {
    toast({
      title: "Vote cast! 🗳️",
      description: `You voted for @${contestant.username}`,
    });
  };

  const getStatusColor = () => {
    switch (battle.status) {
      case "active":
        return "text-success";
      case "ended":
        return "text-muted-foreground";
      case "upcoming":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const participationPercentage = (battle.participants / battle.maxParticipants) * 100;

  return (
    <Card className="glass-strong border-border/20 hover:border-border/40 transition-all duration-300 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              {battle.type === "tippers" ? (
                <DollarSign className="h-5 w-5 text-primary-foreground" />
              ) : (
                <Crown className="h-5 w-5 text-primary-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-foreground">{battle.title}</h3>
              <p className="text-sm text-muted-foreground">{battle.description}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor()} bg-current/10 border-current`}>
            {battle.status.toUpperCase()}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Timer className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">Time Left</span>
            </div>
            <p className="font-bold text-warning">{battle.timeRemaining}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Prize Pool</span>
            </div>
            <p className="font-bold text-primary">{battle.prizePool}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Participants</span>
            </div>
            <p className="font-bold text-foreground">{battle.participants}/{battle.maxParticipants}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Flame className="h-4 w-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Heat</span>
            </div>
            <p className="font-bold text-destructive">
              {participationPercentage > 80 ? "🔥 Hot" : participationPercentage > 50 ? "🌡️ Warm" : "❄️ Cool"}
            </p>
          </div>
        </div>

        {/* Participation Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Battle Slots</span>
            <span className="text-sm font-medium text-foreground">
              {battle.participants}/{battle.maxParticipants}
            </span>
          </div>
          <Progress value={participationPercentage} className="h-2" />
        </div>

        {/* Contestants (for active battles) */}
        {battle.contestants && battle.contestants.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Contestants</h4>
            <div className="space-y-2">
              {battle.contestants.map((contestant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-secondary rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contestant.avatar} />
                      <AvatarFallback>{contestant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{contestant.name}</p>
                      <p className="text-xs text-muted-foreground">@{contestant.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {contestant.votes && (
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">{contestant.votes} votes</p>
                      </div>
                    )}
                    {contestant.tips && (
                      <div className="text-right">
                        <p className="text-sm font-bold text-success">{contestant.tips}</p>
                      </div>
                    )}
                    {battle.status === "active" && (
                      <Button
                        size="sm"
                        variant="castle"
                        onClick={() => handleVote(contestant)}
                      >
                        Vote
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {battle.status === "active" && !hasParticipated && (
          <Button
            onClick={handleParticipate}
            variant="gaming"
            className="w-full"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Join Battle ({battle.prizePool} Prize Pool)
          </Button>
        )}

        {battle.status === "upcoming" && (
          <Button variant="outline" className="w-full" disabled>
            <Timer className="h-4 w-4 mr-2" />
            Battle Starts Soon
          </Button>
        )}

        {battle.status === "ended" && (
          <Button variant="secondary" className="w-full" disabled>
            <Trophy className="h-4 w-4 mr-2" />
            Battle Ended
          </Button>
        )}

        {hasParticipated && battle.status === "active" && (
          <div className="text-center p-3 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-success font-medium">✓ You're participating in this battle!</p>
            <p className="text-sm text-success/80 mt-1">Keep engaging to improve your chances</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};