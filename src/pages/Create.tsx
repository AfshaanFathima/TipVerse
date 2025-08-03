import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/firebase"; // adjust path if needed
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { BarChart3, Clock, DollarSign, Eye, Image, Type, Upload } from "lucide-react";
import { useState } from "react";

export const Create = () => {
  const [contentType, setContentType] = useState("text");
  const [postText, setPostText] = useState("");
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tokens = [
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00" },
    { symbol: "ETH", name: "Ethereum", balance: "2.45" },
    { symbol: "DAI", name: "Dai Stablecoin", balance: "890.50" }
  ];

  const mockStats = {
    estimatedReach: 1250,
    viralPotential: "High",
    tipWindow: "24h",
    estimatedEarnings: "$441"
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Publish post to Firebase
  const handlePublish = async () => {
    setLoading(true);
    try {
      let uploadedImageUrl = null;
      if (imageFile) { // Always upload if imageFile is present
        const storage = getStorage();
        const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        uploadedImageUrl = await getDownloadURL(storageRef);
        setImageUrl(uploadedImageUrl);
      }
      const db = getFirestore();
      const user = auth.currentUser;
      const author = user
        ? {
            name: user.displayName || "User",
            username: user.displayName
              ? user.displayName.replace(/\s+/g, "_").toLowerCase()
              : "user",
            avatar: user.photoURL || "/api/placeholder/40/40",
            verified: true,
            uid: user.uid,
          }
        : {
            name: "User",
            username: "user",
            avatar: "/api/placeholder/40/40",
            verified: false,
            uid: "",
          };
      await addDoc(collection(db, "posts"), {
        content: postText,
        type: contentType,
        token: selectedToken,
        imageUrl: uploadedImageUrl,
        createdAt: Timestamp.now(),
        userId: user?.uid || null,
        author,
      });
      setPostText("");
      setImageFile(null);
      setImageUrl(null);
      alert("Post published!");
    } catch (err) {
      alert("Failed to publish post.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow">
              <Upload className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold gradient-text">Content Management</h1>
              <p className="text-muted-foreground text-sm">Create, manage, and analyze your content performance</p>
            </div>
          </div>
          {/* Removed Quick Stats */}
        </div>

        {/* Main Content Creation */}
        <Card className="glass-strong border border-border/30 shadow-xl rounded-2xl p-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold gradient-text text-center">Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Text Input */}
              <div className="flex-1 flex flex-col h-full">
                <Label htmlFor="content" className="text-base font-semibold mb-2">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Share your thoughts, insights, or predictions..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="h-60 min-h-60 bg-[#f5f7fa] border border-primary/30 rounded-xl resize-none text-black text-base px-4 py-3 shadow focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {/* Image Upload */}
              <div className="flex-1 flex flex-col h-full justify-between border-2 border-dashed border-border rounded-xl p-8 bg-white/70">
                <div className="flex flex-col items-center justify-center h-full">
                  <Upload className="h-10 w-10 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Upload Media</h3>
                  <p className="text-muted-foreground mb-3 text-xs">Drag and drop or click to browse</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2"
                  />
                  {imageFile && <span className="text-xs text-primary font-medium">{imageFile.name}</span>}
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported: JPG, PNG, GIF<br />
                    Max size: 50MB
                  </p>
                </div>
              </div>
            </div>
            {/* Tip Settings & Publish */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border pt-8 mt-8">
              <div className="flex items-center gap-3">
                <Label htmlFor="token" className="text-base font-semibold">Preferred Token</Label>
                <Select value={selectedToken} onValueChange={setSelectedToken}>
                  <SelectTrigger className="max-w-[120px] border border-primary/30 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{token.symbol}</span>
                          <span className="text-muted-foreground text-xs">({token.balance})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="bg-gradient-primary hover:shadow-glow px-8 py-3 text-base font-semibold rounded-xl"
                onClick={handlePublish}
                disabled={loading}
              >
                <Upload className="h-5 w-5 mr-2" />
                {loading ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};