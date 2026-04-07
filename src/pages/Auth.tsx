import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (error) throw error;
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Erreur de connexion", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: signupEmail, password: signupPassword,
        options: { data: { first_name: firstName, last_name: lastName, role_fact_digit2: "user" } },
      });
      if (error) throw error;
      toast({ title: "Inscription réussie", description: "Vérifiez votre email pour confirmer votre compte." });
    } catch (error: any) {
      toast({ title: "Erreur d'inscription", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Ambient */}
      <div className="glow-orb w-[500px] h-[500px] bg-primary/30 -top-40 -right-40 fixed animate-glow" />
      <div className="glow-orb w-[400px] h-[400px] bg-primary-glow/20 -bottom-40 -left-40 fixed animate-glow" style={{ animationDelay: "2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-card p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-display font-bold gold-text">Fact-Digit</h1>
          </div>
          <p className="text-sm text-muted-foreground">Facturation & Gestion d'entreprise</p>
        </div>

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Connexion</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Email</Label>
                <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required className="premium-input" placeholder="votre@email.com" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Mot de passe</Label>
                <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="premium-input" placeholder="••••••••" />
              </div>
              <Button type="submit" variant="premium" className="w-full h-11" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Prénom</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="premium-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Nom</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="premium-input" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Email</Label>
                <Input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="premium-input" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Mot de passe</Label>
                <Input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required minLength={6} className="premium-input" />
              </div>
              <Button type="submit" variant="premium" className="w-full h-11" disabled={loading}>
                {loading ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
