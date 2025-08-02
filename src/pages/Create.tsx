import { useState } from "react";
import { Upload, Image, Type, DollarSign, Clock, BarChart3, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Create = () => {
  const [contentType, setContentType] = useState("text");
  const [postText, setPostText] = useState("");
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [minTip, setMinTip] = useState("0.01");

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Content Management</h1>
              <p className="text-muted-foreground">Create, manage, and analyze your content performance</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Drafts</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Creation */}
          <div className="flex-1 space-y-6">
            {/* Content Type Selector */}
            <Card className="glass-strong border-border/20">
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Tabs */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant={contentType === "text" ? "default" : "outline"}
                    onClick={() => setContentType("text")}
                    className="flex items-center space-x-2"
                  >
                    <Type className="h-4 w-4" />
                    <span>Text</span>
                  </Button>
                  <Button
                    variant={contentType === "image" ? "default" : "outline"}
                    onClick={() => setContentType("image")}
                    className="flex items-center space-x-2"
                  >
                    <Image className="h-4 w-4" />
                    <span>Image</span>
                  </Button>
                </div>

                {/* Content Input */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Share your thoughts, insights, or predictions..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      className="min-h-32 bg-secondary/50 border-border/50 resize-none"
                    />
                  </div>

                  {contentType === "image" && (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Upload Media Files</h3>
                      <p className="text-muted-foreground mb-4">Drag and drop your images or videos here, or click to browse</p>
                      <Button className="bg-gradient-primary">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supported formats: JPG, PNG, GIF, MP4, MOV<br />
                        Maximum file size: 50MB per file
                      </p>
                    </div>
                  )}
                </div>

                {/* Tip Settings */}
                <div className="space-y-4 border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground">Tip Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="token">Preferred Token</Label>
                      <Select value={selectedToken} onValueChange={setSelectedToken}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {tokens.map((token) => (
                            <SelectItem key={token.symbol} value={token.symbol}>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{token.symbol}</span>
                                <span className="text-muted-foreground">({token.balance})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="minTip">Minimum Tip</Label>
                      <Input
                        id="minTip"
                        type="number"
                        value={minTip}
                        onChange={(e) => setMinTip(e.target.value)}
                        className="bg-secondary/50 border-border/50"
                        step="0.01"
                        min="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      Save Draft
                    </Button>
                    <Button variant="outline">
                      Preview
                    </Button>
                  </div>
                  <Button className="bg-gradient-primary hover:shadow-glow">
                    <Upload className="h-4 w-4 mr-2" />
                    Publish Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Post Preview */}
            <Card className="glass-strong border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <span>Post Preview</span>
                </CardTitle>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">Mobile</Button>
                  <Button variant="ghost" size="sm">Desktop</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Preview Content */}
                <div className="border border-border rounded-lg p-4 bg-card">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm">Alex Chen</span>
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span className="text-xs text-muted-foreground">@alexcrypto • Just now</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-3">
                    {postText || "Your content will appear here..."}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>0 tips • 24h remaining</span>
                    <span>Min: {minTip} {selectedToken}</span>
                  </div>
                </div>

                {/* Predicted Stats */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Estimated Reach</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{mockStats.estimatedReach.toLocaleString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-xs text-muted-foreground">Viral Potential</span>
                      </div>
                      <p className="text-lg font-bold text-success">{mockStats.viralPotential}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Tip Window</span>
                      </div>
                      <p className="text-lg font-bold text-warning">{mockStats.tipWindow}</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Est. Earnings</span>
                      </div>
                      <p className="text-lg font-bold text-success">{mockStats.estimatedEarnings}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};