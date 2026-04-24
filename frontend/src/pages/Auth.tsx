import { useState } from 'react';
import { supabase, isMockMode } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Scale, ChevronRight, Sparkles, LogIn, ArrowRight } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Registration-only fields — match profiles table columns exactly
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'analyst' | 'manager' | 'admin'>('analyst');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isMockMode) {
        // SIMULATE MOCK LOGIN
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.setItem("mockAuthSession", "true");
        toast({ title: "Demo Mode Active", description: "Authentication bypassed. Using fallback data." });
        navigate('/trace');
        return;
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "Securely logged in to SC X-Ray." });
        navigate('/trace');
      } else {
        // Sign up with Supabase Auth
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              role,
            }
          }
        });
        if (signUpError) throw signUpError;

        // Wait briefly for the session to be established, then upsert the profile.
        // The DB trigger will also handle this server-side.
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session && signUpData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: signUpData.user.id,
              first_name: firstName,
              last_name: lastName,
              email: email,
              role,
            }, { onConflict: 'id' });

          if (profileError) {
            // Trigger will handle it — just log for visibility
            console.warn('[SC X-Ray] Profile upsert note (trigger will cover this):', profileError.message);
          } else {
            console.info('[SC X-Ray] ✅ Profile row created for:', signUpData.user.email);
          }
          toast({ title: "Account created!", description: "Welcome to Supply Chain X-Ray." });
          navigate('/trace');
        } else {
          // Email confirmation required — profile will be set when they log in
          toast({ title: "Check your email!", description: "Confirm your address to activate your account." });
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "Authentication Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative bg-background overflow-hidden">
      {/* Left Decoration Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-zinc-950 text-white border-r border-border">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-[100px] pointer-events-none animate-pulse duration-10000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="size-10 rounded-xl gradient-brand grid place-items-center shadow-lg">
            <Scale className="size-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-white">Supply Chain X-Ray</span>
        </div>

        <div className="relative z-10 max-w-md animate-in fade-in slide-in-from-left-8 duration-700 delay-150">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-primary-foreground mb-6 backdrop-blur-md">
            <Sparkles className="size-3 text-accent" />
            <span className="text-zinc-300">Illuminating Trade</span>
          </div>
          <h1 className="font-display text-5xl leading-[1.1] mb-6 text-balance text-white">
            Reconstructing Multi-Tier Supplier Networks.
          </h1>
          <p className="text-zinc-400 text-lg text-balance leading-relaxed">
            A unified graph driving transparency, resolving compliance risks, and connecting global supply nodes effortlessly.
          </p>
          
          <div className="mt-10 space-y-4">
            {["Real-time Flow Tracing", "HSN Normalization", "Supplier Network Mapping"].map((feature, i) => (
              <div key={feature} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${300 + i * 100}ms` }}>
                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <ChevronRight className="size-3 text-primary" />
                </div>
                <span className="text-zinc-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 animate-in fade-in duration-1000 delay-500">
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} Supply Chain X-Ray. Built for supply transparency.</p>
        </div>
      </div>

      {/* Right Login/Signup Panel */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 relative animate-in fade-in zoom-in-95 duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-secondary/20 pointer-events-none -z-10" />

        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-2 mb-10">
          <div className="size-8 rounded-lg gradient-brand grid place-items-center shadow-md">
            <Scale className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">SC X-Ray</span>
        </div>

        <div className="w-full max-w-[460px] bg-card p-8 sm:p-10 rounded-[2rem] shadow-card border border-border/50 glass-light">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin ? 'Enter your credentials to access your portal.' : 'Join the Supply Chain X-Ray network.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-4">
              {/* Registration-only: first_name, last_name (profiles table) */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 focus-within:text-primary transition-colors">
                    <Label htmlFor="firstName" className="font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Ada"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-11 bg-secondary/50 focus:bg-background transition-colors rounded-xl"
                      required={!isLogin}
                    />
                  </div>
                  <div className="space-y-1.5 focus-within:text-primary transition-colors">
                    <Label htmlFor="lastName" className="font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Lovelace"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-11 bg-secondary/50 focus:bg-background transition-colors rounded-xl"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Registration-only: role (profiles table) */}
              {!isLogin && (
                <div className="space-y-1.5 focus-within:text-primary transition-colors">
                  <Label htmlFor="role" className="font-medium">Role</Label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as typeof role)}
                    className="flex h-11 w-full rounded-xl border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors focus:bg-background"
                    required={!isLogin}
                  >
                    <option value="analyst">Supply Chain Analyst</option>
                    <option value="manager">Procurement Manager</option>
                    <option value="admin">Platform Admin</option>
                  </select>
                </div>
              )}

              {/* Email — both login & register */}
              <div className="space-y-1.5 focus-within:text-primary transition-colors">
                <Label htmlFor="email" className="font-medium">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-secondary/50 focus:bg-background transition-colors rounded-xl"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5 focus-within:text-primary transition-colors">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-medium">Password</Label>
                  {isLogin && <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-secondary/50 focus:bg-background transition-colors rounded-xl"
                  required
                  minLength={8}
                />
                {!isLogin && (
                  <p className="text-[11px] text-muted-foreground">Minimum 8 characters required</p>
                )}
              </div>
            </div>

            <Button 
              className="w-full h-11 text-base font-semibold rounded-xl group relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95" 
              type="submit" 
              disabled={loading}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <span className="animate-pulse">Processing…</span>
                ) : isLogin ? (
                  <>Sign In <LogIn className="size-4 opacity-70 group-hover:opacity-100 transition-opacity" /></>
                ) : (
                  <>Create Account <ArrowRight className="size-4 opacity-70 group-hover:translate-x-1 transition-all" /></>
                )}
              </span>
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "New to the platform?" : "Already have an account?"}{' '}
              <button
                type="button"
                className="text-primary font-semibold hover:text-accent transition-colors hover:underline underline-offset-4"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up here' : 'Sign in instead'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
