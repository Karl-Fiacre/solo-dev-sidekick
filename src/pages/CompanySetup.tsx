import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Building2, Sparkles } from "lucide-react";

export default function CompanySetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: "", company_address: "", company_phone: "", company_email: "",
    company_rccm: "", company_numero_cc: "", first_name: "", last_name: "", phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !form.company_name) return;
    setLoading(true);
    try {
      const { error } = await supabase.rpc("create_company_for_signup", {
        _user_id: user.id,
        _company_name: form.company_name,
        _company_address: form.company_address || undefined,
        _company_phone: form.company_phone || undefined,
        _company_email: form.company_email || undefined,
        _company_rccm: form.company_rccm || undefined,
        _company_numero_cc: form.company_numero_cc || undefined,
        _user_first_name: form.first_name || undefined,
        _user_last_name: form.last_name || undefined,
        _user_phone: form.phone || undefined,
      });
      if (error) throw error;
      toast({ title: "Entreprise créée avec succès !" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      <div className="glow-orb w-[500px] h-[500px] bg-primary/30 -top-40 -right-40 fixed animate-glow" />
      <div className="glow-orb w-[400px] h-[400px] bg-primary-glow/20 -bottom-40 -left-40 fixed animate-glow" style={{ animationDelay: "2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg glass-card p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-display font-bold gold-text">Configuration de l'entreprise</h1>
          <p className="text-sm text-muted-foreground mt-2">Renseignez les informations pour commencer</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom de l'entreprise *</Label><Input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} required className="premium-input" /></div>
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Adresse</Label><Input value={form.company_address} onChange={(e) => setForm({ ...form, company_address: e.target.value })} className="premium-input" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Téléphone</Label><Input value={form.company_phone} onChange={(e) => setForm({ ...form, company_phone: e.target.value })} className="premium-input" /></div>
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label><Input type="email" value={form.company_email} onChange={(e) => setForm({ ...form, company_email: e.target.value })} className="premium-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">RCCM</Label><Input value={form.company_rccm} onChange={(e) => setForm({ ...form, company_rccm: e.target.value })} className="premium-input" /></div>
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">N° CC</Label><Input value={form.company_numero_cc} onChange={(e) => setForm({ ...form, company_numero_cc: e.target.value })} className="premium-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Votre prénom</Label><Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="premium-input" /></div>
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Votre nom</Label><Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="premium-input" /></div>
          </div>
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Votre téléphone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="premium-input" /></div>
          <Button type="submit" variant="premium" className="w-full h-11" disabled={loading}>
            {loading ? "Création..." : "Créer mon entreprise"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
