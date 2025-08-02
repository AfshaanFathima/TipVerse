import { Filter, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
// Update the import path if the Card component is located elsewhere, for example:
import { ContentCard } from "../components/feed/ContentCard";
import { LeaderboardCard } from "../components/leaderboard/LeaderboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Header } from "@radix-ui/react-accordion";
// import { Header } from "../components/layout/Header";


// Add custom JSX type for appkit-button web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("hot");
  // const [activeTab, setActiveTab] = useState("home");
  // const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setPhotoURL(user?.photoURL ?? undefined);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const handleTabChange = (tab: string) => {
  //   setActiveTab(tab);
  //   // Example navigation logic for tabs
  //   if (tab === "home") navigate("/home");
  //   if (tab === "battles") navigate("/battles");
  //   if (tab === "profile") navigate("/profile");
  //   if (tab === "create") navigate("/create");
  // };

  const mockPosts = [
    {
      author: {
        name: "Alex Chen",
        username: "alexgamer", 
        avatar: "/api/placeholder/40/40",
        verified: true
      },
      content: {
        text: "The Future of Decentralized Gaming: Why Web3 Will Transform How We Play",
        image: "/api/placeholder/600/300",
        timestamp: "4h 58m",
        timeRemaining: "19h 2m"
      },
      stats: {
        tips: 2450,
        tipAmount: "2,450 USDC",
        comments: 127,
        timeRemaining: "24h",
        viralPotential: "High" as const,
        estimatedReach: 1250,
        estimatedEarnings: "$441"
      }
    }
  ];

  const mockLeaderboard = [
    {
      rank: 1,
      user: {
        name: "CryptoWhale",
        username: "whale_tips",
        avatar: "/api/placeholder/40/40",
        level: 15,
        tier: "Diamond" as const
      },
      stats: {
        xp: 2840,
        streak: 47,
        trend: "up" as const
      },
      badges: ["🎯", "💎", "🔥", "⚡"]
    },
    {
      rank: 2, 
      user: {
        name: "DeFi Master",
        username: "defi_master",
        avatar: "/api/placeholder/40/40",
        level: 12,
        tier: "Diamond" as const
      },
      stats: {
        xp: 2650,
        streak: 32,
        trend: "up" as const
      },
      badges: ["🎯", "💎", "🔥"]
    },
    {
      rank: 3,
      user: {
        name: "NFT Hunter",
        username: "nft_hunter", 
        avatar: "/api/placeholder/40/40",
        level: 10,
        tier: "Diamond" as const
      },
      stats: {
        xp: 2420,
        streak: 28,
        trend: "same" as const
      },
      badges: ["🎯", "💎", "🎨"]
    }
  ];

  const filterTabs = [
    { id: "hot", label: "Hot", icon: "🔥" },
    { id: "new", label: "New", icon: "✨" },
    { id: "following", label: "Following", icon: "👥" },
    { id: "ending", label: "Ending Soon", icon: "⏰" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        photoURL={photoURL}
      /> */}
      <div className="container mx-auto px-4 py-6">
    
        <div className="homepage-main flex flex-col lg:flex-row gap-6">
          {/* Main Feed */}
          <div className="homepage-feed flex-1 space-y-6">
            {/* Search & Filters */}
            <div className="space-y-4">
              <div className="homepage-search">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search creators, content, or topics..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="homepage-filters">
                {filterTabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeFilter === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`whitespace-nowrap ${
                      activeFilter === tab.id 
                        ? "bg-primary text-primary-foreground shadow-glow" 
                        : "border-border/50 hover:border-border"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Feed */}
            <div className="homepage-content-feed">
              {mockPosts.map((post, index) => (
                <ContentCard key={index} {...post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="homepage-sidebar w-full lg:w-80 space-y-6">
            {/* Top Tippers Today */}
            <Card className="homepage-card glass-strong border-border/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="homepage-card-title">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>Top Tippers Today</span>
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    View Full
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockLeaderboard.map((user, index) => (
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    <LeaderboardCard key={index} {...user} hideTier />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="homepage-card homepage-quick-actions glass-strong border-border/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-primary hover:shadow-glow">
                  <span className="mr-2">➕</span>
                  Create Post
                </Button>
                <Button variant="ghost" className="w-full border-border/50">
                  <span className="mr-2">⚔️</span>
                  View Battles
                </Button>
                <Button variant="ghost" className="w-full border-border/50">
                  <span className="mr-2">👤</span>
                  My Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;