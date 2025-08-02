import { TipModal } from "@/components/modals/TipModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";

interface ContentCardProps {
  author: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: {
    text?: string;
    image?: string;
    timestamp: string;
    timeRemaining: string;
  };
  stats: {
    tips: number;
    tipAmount: string;
    comments: number;
    timeRemaining: string;
    viralPotential: "High" | "Medium" | "Low";
    estimatedReach: number;
    estimatedEarnings: string;
  };
}

export const ContentCard = ({ author, content, stats }: ContentCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);

  const viralColors = {
    High: "text-success",
    Medium: "text-warning", 
    Low: "text-muted-foreground"
  };

  return (
    <Card className="glass-strong border-border/20 hover:border-border/40 transition-all duration-300 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 ring-2 ring-primary/20">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{author.name}</h3>
                {author.verified && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    ✓
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{author.username} • {content.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Share className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        {content.text && (
          <p className="text-foreground mb-4 leading-relaxed">{content.text}</p>
        )}
        
        {content.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={"/CoverPage.jpg"} // Correct path for public folder
              alt="Content"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{isLiked ? 'Liked' : 'Like'}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="text-sm">{stats.comments}</span>
            </Button>
          </div>

          <Button 
            onClick={() => setShowTipModal(true)}
            variant="gaming"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Tip
          </Button>
        </div>
      </CardContent>
      
      <TipModal
        isOpen={showTipModal}
        onClose={() => setShowTipModal(false)}
        creator={author}
        content={content}
      />
    </Card>
  );
};