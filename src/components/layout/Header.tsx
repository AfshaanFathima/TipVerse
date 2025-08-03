import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase"; // adjust path as needed
import { signOut } from "firebase/auth";
import { MoreHorizontal } from "lucide-react";
import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WalletContext = createContext<{ address: string; chainId: number }>({ address: "", chainId: 1 });

// Wallet disconnect logic for MetaMask
const disconnectWallet = async () => {
  if (window.ethereum && window.ethereum.request) {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }]
      });
    } catch (err) {
      // Fallback: just clear wallet state in UI
    }
  }
  // Optionally clear wallet state in your app
};

export const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);
  const [walletAddress, setWalletAddress] = useState("");
  const [chainId, setChainId] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setPhotoURL(user?.photoURL ?? undefined);
    });

    async function getWalletInfo() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          setWalletAddress(Array.isArray(accounts) && accounts.length > 0 ? String(accounts[0]) : "");
          const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
          setChainId(typeof chainIdHex === "string" ? parseInt(chainIdHex, 16) : 1);
        } catch (err) {
          setWalletAddress("");
          setChainId(1);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setShowDropdown(false);
    await signOut(auth);
    await disconnectWallet();
    setWalletAddress("");
    setChainId(1);
    localStorage.removeItem("walletconnect");
    sessionStorage.removeItem("walletconnect");
    window.location.href = "/login"; // Reload and go to login page
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
                  <img
                    src="/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                    style={{ objectFit: "contain" }}
                    onError={e => { e.currentTarget.style.display = "none"; }}
                  />
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
              {/* User Avatar with dropdown */}
              <div className="relative" ref={avatarRef}>
                <Avatar
                  className="w-8 h-8 ring-2 ring-primary/20 cursor-pointer"
                  onClick={() => setShowDropdown((v) => !v)}
                  title="Account"
                >
                  <AvatarImage src={photoURL || "/default-avatar.png"} />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg z-50">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-medium rounded-lg transition"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
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