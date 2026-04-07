import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Building2 } from "lucide-react";

export default function Settings() {
  const { profile, companyId } = useAuth();
  const [company, setCompany] = useState<any>(null);
  const [profileForm, setProfileForm] = useState({ first_name: "", last_name: "", phone: "" });
  const [companyForm, setCompanyForm] = useState({ name: "", address: "", phone: "", email: "", rccm: "", numero_cc: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setProfileForm({ first_name: profile.first_name || "", last_name: profile.last_name || "", phone: profile.phone || "" });
    if (companyId) fetchCompany();
  }, [profile, companyId]);

  const fetchCompany = async () => {
    const { data } = await supabase.from("companies_fact_digit2").select("*").eq("id", companyId!).single();
    if (data) { setCompany(data); setCompanyForm({ name: data.name, address: data.address || "", phone: data.phone || "", email: data.email || "", rccm: data.rccm || "", numero_cc: data.numero_cc || "" }); }
  };

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase.from("profiles_fact_digit2").update(profileForm).eq("id", profile.id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else toast({ title: "Profil mis à jour" });
    setSaving(false);
  };

  const saveCompany = async () => {
    if (!companyId) return;
    setSaving(true);
    const { error } = await supabase.from("companies_fact_digit2").update(companyForm).eq("id", companyId);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else toast({ title: "Entreprise mise à jour" });
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <SettingsIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Paramètres</h1>
          <p className="text-xs text-muted-foreground">Profil et entreprise</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-4 w-4 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Mon profil</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Prénom</Label><Input value={profileForm.first_name} onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })} className="premium-input" /></div>
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom</Label><Input value={profileForm.last_name} onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })} className="premium-input" /></div>
        </div>
        <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Téléphone</Label><Input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="premium-input" /></div>
        <Button variant="premium" onClick={saveProfile} disabled={saving}>Enregistrer</Button>
      </motion.div>

      <Separator className="bg-border/20" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-4 w-4 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Mon entreprise</h2>
        </div>
        <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom de l'entreprise</Label><Input value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} className="premium-input" /></div>
        <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Adresse</Label><Input value={companyForm.address} onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })} className="premium-input" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Téléphone</Label><Input value={companyForm.phone} onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })} className="premium-input" /></div>
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label><Input value={companyForm.email} onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })} className="premium-input" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">RCCM</Label><Input value={companyForm.rccm} onChange={(e) => setCompanyForm({ ...companyForm, rccm: e.target.value })} className="premium-input" /></div>
          <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">N° Compte Contribuable</Label><Input value={companyForm.numero_cc} onChange={(e) => setCompanyForm({ ...companyForm, numero_cc: e.target.value })} className="premium-input" /></div>
        </div>
        <Button variant="premium" onClick={saveCompany} disabled={saving}>Enregistrer</Button>
      </motion.div>
    </div>
  );
}
