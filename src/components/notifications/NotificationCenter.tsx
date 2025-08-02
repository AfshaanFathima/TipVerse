import { useState } from "react";
import { Bell, DollarSign, Trophy, Zap, Crown, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: string;
  type: "tip" | "battle" | "achievement" | "comment" | "follow";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  amount?: string;
  xp?: number;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "tip",
    title: "New Tip Received!",
    message: "@crypto_whale tipped you 25 USDC",
    timestamp: "2 min ago",
    isRead: false,
    amount: "25 USDC",
    xp: 125
  },
  {
    id: "2",
    type: "battle",
    title: "Battle Victory! 🏆",
    message: "You won the Creator Battle and earned 500 XP",
    timestamp: "1 hour ago",
    isRead: false,
    xp: 500
  },
  {
    id: "3",
    type: "achievement",
    title: "Achievement Unlocked!",
    message: "Early Bird - First to tip 10 times in 24h",
    timestamp: "3 hours ago",
    isRead: true,
    xp: 100
  },
  {
    id: "4",
    type: "comment",
    title: "New Comment",
    message: "@nft_artist commented on your post",
    timestamp: "5 hours ago",
    isRead: true
  },
  {
    id: "5",
    type: "follow",
    title: "New Follower",
    message: "@defi_trader started following you",
    timestamp: "1 day ago",
    isRead: true
  }
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "tip":
        return <DollarSign className="h-4 w-4 text-success" />;
      case "battle":
        return <Trophy className="h-4 w-4 text-warning" />;
      case "achievement":
        return <Crown className="h-4 w-4 text-primary" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-accent" />;
      case "follow":
        return <Users className="h-4 w-4 text-secondary" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 glass-strong border-border/30" align="end">
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="h-96">
          <div className="p-2">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    !notification.isRead ? "bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                        {notification.xp && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            <Zap className="h-3 w-3 mr-1" />
                            +{notification.xp} XP
                          </Badge>
                        )}
                        {notification.amount && (
                          <Badge variant="secondary" className="bg-success/20 text-success">
                            {notification.amount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator className="my-1" />}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border/20">
          <Button variant="ghost" className="w-full justify-center" size="sm">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};