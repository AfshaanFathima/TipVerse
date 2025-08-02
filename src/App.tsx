import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Battles } from "./pages/Battles";
import { Create } from "./pages/Create";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Profile } from "./pages/Profile";

const queryClient = new QueryClient();

// Context for token list (empty, not used)
export const TokenListContext = createContext<any[]>([]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <TokenListContext.Provider value={[]}>
          <BrowserRouter>
            {/* Show Header on all pages except Login and NotFound */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route element={<HeaderWrapper />}>
                <Route path="/home" element={<Home />} />
                <Route path="/battles" element={<Battles />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<Create />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TokenListContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// HeaderWrapper component to show Header and render child routes
function HeaderWrapper() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
 