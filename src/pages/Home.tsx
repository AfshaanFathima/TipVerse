import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { auth } from "../lib/firebase";
import { getAuth } from "firebase/auth";
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

// Helper to fetch user info from Firebase Auth REST API (client-side only, not recommended for production)
async function fetchFirebaseUser(uid: string): Promise<{ displayName: string; photoURL: string | null } | null> {
  // You must have the user's ID token or use a backend for secure access in production.
  // For demo/mock, this will always return null.
  return null;
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
  const [userMap, setUserMap] = useState<Record<string, { displayName: string; photoURL: string | null }>>({});

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

  // Fetch all users' display names for posts from Firestore "users" collection (recommended)
  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const db = getFirestore();
        const snap = await getDocs(collection(db, "users"));
        const map: Record<string, { displayName: string; photoURL: string | null }> = {};
        snap.forEach(doc => {
          const data = doc.data();
          map[doc.id] = {
            displayName: data.displayName || "User",
            photoURL: data.photoURL || "/api/placeholder/40/40"
          };
        });
        setUserMap(map);
      } catch (err) {
        // fallback: do nothing
      }
    };
    fetchUserNames();
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
                posts
                  .filter(post => !(post.userId && auth.currentUser && post.userId === auth.currentUser.uid))
                  .map((post, index) => {
                    // Use name and avatar directly from the post if present
                    let name = post.name || post.author?.name || "User";
                    let username = post.username || post.author?.username || "user";
                    let avatar = post.avatar || post.author?.avatar || "/api/placeholder/40/40";
                    let verified = post.verified ?? post.author?.verified ?? false;

                    // Fallback to userMap if author is missing (for legacy posts)
                    if ((!post.name && !post.avatar) && post.userId && userMap[post.userId]) {
                      name = userMap[post.userId].displayName || "User";
                      username = userMap[post.userId].displayName
                        ? userMap[post.userId].displayName.replace(/\s+/g, "_").toLowerCase()
                        : "user";
                      avatar = userMap[post.userId].photoURL || "/api/placeholder/40/40";
                      verified = true;
                    }

                    // Always show image if imageUrl exists (regardless of post.type)
                    const image = post.imageUrl ? post.imageUrl : "";
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

// --- HOW TO ENSURE AUTHOR NAME/AVATAR SHOWS FOR EACH POST ---
//
// 1. On user signup/login, write the user's displayName and photoURL to Firestore "users" collection.
//    The document ID should be the user's UID from Firebase Auth.
//
// Example (call this after signup/login):
//
// import { setDoc, doc, getFirestore } from "firebase/firestore";
// import { auth } from "../lib/firebase";
//
// async function syncUserToFirestore() {
//   const user = auth.currentUser;
//   if (user) {
//     const db = getFirestore();
//     await setDoc(doc(db, "users", user.uid), {
//       displayName: user.displayName || "User",
//       photoURL: user.photoURL || "/api/placeholder/40/40"
//     }, { merge: true });
//   }
// }
//
// 2. When creating a post, always store the user's UID as userId in the post.
//
// Example (in your create post logic):
//
// await addDoc(collection(db, "posts"), {
//   ...otherPostFields,
//   userId: auth.currentUser?.uid,
// });
//
// 3. The code in this file will then correctly map userId to displayName and photoURL for every post.
//
// --- END INSTRUCTIONS ---
// --- YES, you should update your login/signup logic ---
// After a user logs in or signs up, always write/update their displayName and photoURL to Firestore "users" collection.
// This ensures the mapping is always available for the Home feed and other features.

// Example (call this after successful login/signup):
// import { setDoc, doc, getFirestore } from "firebase/firestore";
// import { auth } from "../lib/firebase";
//
// async function syncUserToFirestore() {
//   const user = auth.currentUser;
//   if (user) {
//     const db = getFirestore();
//     await setDoc(doc(db, "users", user.uid), {
//       displayName: user.displayName || "User",
//       photoURL: user.photoURL || "/api/placeholder/40/40"
//     }, { merge: true });
//   }
// }
//
// Call syncUserToFirestore() after login/signup to keep user info in sync.
//   const user = auth.currentUser;
//   if (user) {
//     const db = getFirestore();
//     await setDoc(doc(db, "users", user.uid), {
//       displayName: user.displayName || "User",
//       photoURL: user.photoURL || "/api/placeholder/40/40"
//     }, { merge: true });
//   }
// }
//
// Call syncUserToFirestore() after login/signup to keep user info in sync.