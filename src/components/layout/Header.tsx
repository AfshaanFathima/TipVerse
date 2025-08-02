import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase"; // adjust path as needed
import { MoreHorizontal } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WalletContext = createContext<{ address: string; chainId: number }>({ address: "", chainId: 1 });

export const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);
  const [walletAddress, setWalletAddress] = useState("");
  const [chainId, setChainId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setPhotoURL(user?.photoURL ?? undefined);
    });

    // Get wallet address and chainId from wallet provider (e.g., MetaMask)
    async function getWalletInfo() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          setWalletAddress(Array.isArray(accounts) && accounts.length > 0 ? String(accounts[0]) : "");
          const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
          setChainId(typeof chainIdHex === "string" ? parseInt(chainIdHex, 16) : 1);
        } catch (err) {
          setWalletAddress("");
          setChainId(1); // Default to Ethereum mainnet if error
        }
      }
    }
    getWalletInfo();

    return () => unsubscribe();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") navigate("/home");
    if (tab === "battles") navigate("/battles");
    if (tab === "profile") navigate("/profile");
    if (tab === "create") navigate("/create");
  };

  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "battles", label: "Battles", icon: "⚔️" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "create", label: "Create", icon: "➕" }
  ];

  return (
    <WalletContext.Provider value={{ address: walletAddress, chainId }}>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold gradient-text">Tipverse</span>
              </div>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id 
                        ? "bg-primary text-primary-foreground shadow-glow" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </div>
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Wallet Info */}
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <appkit-button />
              {/* Notifications */}
              <NotificationCenter />
              {/* More Menu */}
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              {/* User Avatar */}
              <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                <AvatarImage src={photoURL || "/default-avatar.png"} />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-center py-3 border-t border-border">
            <nav className="flex items-center space-x-1 w-full max-w-md">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id 
                      ? "bg-primary text-primary-foreground shadow-glow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="ml-1 text-xs">{tab.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </WalletContext.Provider>
  );
}