import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { auth } from "../lib/firebase";
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

  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const db = getFirestore();
        const snap = await getDocs(collection(db, "posts"));
        setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setPosts([]);
      }
      setLoadingPosts(false);
    };
    fetchPosts();
  }, []);

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
                    className="pl-10 bg-secondary/50 border-border/50 h-14 text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Content Feed */}
            <div className="homepage-content-feed">
              {loadingPosts ? (
                <div>Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="text-muted-foreground">No posts found.</div>
              ) : (
                posts.map((post, index) => {
                  // Use signed-in user's info for their posts
                  let name = post.author?.name || "Anonymous";
                  let username = post.author?.username || "unknown";
                  let avatar = post.author?.avatar || "/api/placeholder/40/40";
                  let verified = post.author?.verified ?? false;
                  if (post.userId && auth.currentUser && post.userId === auth.currentUser.uid) {
                    name = auth.currentUser.displayName || name;
                    username = auth.currentUser.displayName ? auth.currentUser.displayName.replace(/\s+/g, "_").toLowerCase() : username;
                    avatar = auth.currentUser.photoURL || avatar;
                    verified = true;
                  }
                  // Only show image if post.type === "image" and imageUrl exists
                  const image = post.type === "image" && post.imageUrl ? post.imageUrl : "";
                  const safePost = {
                    author: {
                      name,
                      username,
                      avatar,
                      verified,
                    },
                    content: {
                      text: post.content || post.text || "No content",
                      image,
                      timestamp: post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleString() : "",
                      timeRemaining: post.timeRemaining || "24h"
                    },
                    stats: {
                      tips: post.tips || 0,
                      tipAmount: post.tipAmount || "0 USDC",
                      comments: post.comments || 0,
                      timeRemaining: post.timeRemaining || "24h",
                      viralPotential: post.viralPotential || "Normal",
                      estimatedReach: post.estimatedReach || 0,
                      estimatedEarnings: post.estimatedEarnings || "$0"
                    }
                  };
                  return <ContentCard key={post.id || index} {...safePost} />;
                })
              )}
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
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;