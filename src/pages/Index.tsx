import { useState } from "react";
import { Header } from "@/components/layout/Header";
import  Home from "./Home";
import { Battles } from "./Battles";
import { Profile } from "./Profile";
import { Create } from "./Create";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "battles":
        return <Battles />;
      case "profile":
        return <Profile />;
      case "create":
        return <Create />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
    </div>
  );
};

export default Index;
