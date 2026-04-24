import Navbar from "../components/site/Navbar";
import { MoveLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <Navbar />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="size-24 rounded-3xl bg-brand/10 border border-brand/20 grid place-items-center mx-auto shadow-2xl">
          <AlertCircle className="size-12 text-brand animate-pulse" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-8xl font-black tracking-tighter text-foreground leading-none">404</h1>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">Sector Unknown Or Restricted</p>
        </div>

        <p className="max-w-xs mx-auto text-sm text-muted-foreground leading-relaxed font-medium">
          The requested intelligence coordinate does not exist. Your access trial may have expired or the link is malformed.
        </p>

        <Link to="/">
          <Button variant="outline" className="rounded-full gap-2 border-brand/20 hover:bg-brand/10 hover:border-brand/30 transition-all font-bold group px-8 mt-4">
            <MoveLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> 
            RETURN TO COMMAND
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
