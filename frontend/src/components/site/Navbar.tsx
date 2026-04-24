import {
  Box, LogOut, LayoutDashboard, UserCircle,
  Activity, ShieldAlert, Globe2, TrendingUp,
  Home, Search, Menu, X, MessageSquare, Library, Zap, Target
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, isMockMode } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSupplyChain } from "@/context/SupplyChainContext";

const Navbar = () => {
  const { initialSearchText } = useSupplyChain();
  const [session, setSession] = useState<Session | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isInternalPage = location.pathname !== "/";

  useEffect(() => {
    if (isMockMode) {
      if (localStorage.getItem("mockAuthSession")) setSession({} as Session);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (isMockMode) {
      localStorage.removeItem("mockAuthSession");
      setSession(null);
      navigate("/");
      return;
    }
    await supabase.auth.signOut();
    navigate("/");
  };

  const navLinks = [
    { label: "Trace", href: "/trace", icon: Search, authRequired: false },
    { label: "Library", href: "/library", icon: Library, authRequired: false },
    ...(initialSearchText ? [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, authRequired: true },
      { label: "Risk", href: "/risk", icon: TrendingUp, authRequired: true },
      { label: "Intelligence", href: "/intelligence", icon: Activity, authRequired: true },
      { label: "Resilience", href: "/resilience", icon: Zap, authRequired: true },
      { label: "Strategic", href: "/strategic", icon: Target, authRequired: true },
      { label: "Compliance", href: "/compliance", icon: ShieldAlert, authRequired: true },
    ] : [])
  ];

  const landingLinks = [
    { label: "Platform", href: "/#platform" },
    { label: "Routes", href: "/routes" },
    { label: "Risk", href: "/#risk" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-[100] border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2.5 group transition-all active:scale-95">
          <div className="size-9 rounded-xl gradient-brand grid place-items-center shadow-lg shadow-brand/20 group-hover:rotate-6 transition-transform">
            <Box className="size-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg tracking-tighter leading-none">SupplyLens 360</span>
            <span className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none mt-1">X-Ray Intelligence</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/5">
          {!session ? (
            <>
              {landingLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
                >
                  {l.label}
                </a>
              ))}
              {/* Show public features (like Trace) even without login */}
              {navLinks.filter(l => !l.authRequired).map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-2",
                    location.pathname === l.href
                      ? "bg-brand text-white shadow-lg shadow-brand/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <l.icon className="size-3.5" />
                  {l.label}
                </Link>
              ))}
            </>
          ) : (
            <>
              {isInternalPage && (
                <Link
                  to="/"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all flex items-center gap-2"
                >
                  <Home className="size-3.5" />
                  Home
                </Link>
              )}
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-2",
                    location.pathname === l.href
                      ? "bg-brand text-white shadow-lg shadow-brand/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <l.icon className="size-3.5" />
                  {l.label}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {!session ? (
            <Link to="/auth">
              <Button size="sm" className="rounded-full px-6 font-bold tracking-tight shadow-lg shadow-brand/20">
                LOGIN
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                <UserCircle className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="rounded-full gap-2 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all font-bold px-4 h-9"
              >
                <LogOut className="size-3.5" />
                <span className="hidden sm:inline">LOG OUT</span>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-background border-b border-white/5 p-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {!session ? (
              landingLinks.map(l => (
                <a key={l.label} href={l.href} onClick={() => setIsMenuOpen(false)} className="text-xl font-black uppercase tracking-tighter hover:text-brand transition-colors">
                  {l.label}
                </a>
              ))
            ) : (
              navLinks.map(l => (
                <Link key={l.label} to={l.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-xl font-black uppercase tracking-tighter hover:text-brand transition-colors">
                  <l.icon className="size-5 text-brand" />
                  {l.label}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
