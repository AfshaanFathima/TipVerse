import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";


export const Profile = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const user = auth.currentUser;
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const db = getFirestore();
        const q = query(collection(db, "posts"), where("userId", "==", user?.uid));
        const snap = await getDocs(q);
        setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setPosts([]);
      }
      setLoadingPosts(false);
    };
    if (user?.uid) fetchPosts();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={user?.photoURL || "/api/placeholder/120/120"}
            alt={user?.displayName || "Profile"}
            className="w-24 h-24 rounded-full border-4 border-primary/20"
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user?.displayName || "User"}</h1>
            <p className="text-muted-foreground mb-1">@{user?.displayName ? user.displayName.replace(/\s+/g, "_").toLowerCase() : "user"}</p>
            <p className="text-foreground mb-4 max-w-2xl">{user?.email}</p>
          </div>
        </div>

        {/* My Posts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">My Posts</h2>
          {loadingPosts ? (
            <div>Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-muted-foreground">No posts yet.</div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => {
                const image = post.imageUrl || "";
                return (
                  <div key={post.id || index} className="p-0">
                    <div className="glass-strong border border-border/20 rounded-lg p-5 shadow-md">
                      {image && (
                        <img
                          src={image}
                          alt="Content"
                          className="w-full h-96 object-cover rounded mb-4 mx-auto hover:scale-105 transition-transform duration-300"
                          onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "/api/placeholder/600/400"; }}
                        />
                      )}
                      <div className="text-foreground text-lg mb-2">{post.content || post.text || "No content"}</div>
                      <div className="flex items-center gap-6 text-sm mt-2">
                        <span className="text-muted-foreground">Likes: {post.tips || 0}</span>
                        <span className="text-muted-foreground">Tips: {post.tipAmount || "0"} {post.tokenName || "USDC"}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

