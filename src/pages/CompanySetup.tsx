import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Building2, ImagePlus, X } from "lucide-react";

export default function CompanySetup() {
  const { user, companyId } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    company_name: "", company_address: "", company_phone: "", company_email: "",
    company_rccm: "", company_numero_cc: "", first_name: "", last_name: "", phone: "",
  });

  // If company already exists, go to dashboard
  if (companyId) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Fichier invalide", description: "Veuillez sélectionner une image.", variant: "destructive" });
      return;
    }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadLogo = async (companyId: string): Promise<string | null> => {
    if (!logoFile) return null;
    const ext = logoFile.name.split(".").pop();
    const filePath = `${companyId}/logo.${ext}`;
    const { error } = await supabase.storage.from("company-logos").upload(filePath, logoFile, { upsert: true });
    if (error) {
      console.error("Logo upload error:", error);
      return null;
    }
    const { data } = supabase.storage.from("company-logos").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !form.company_name) return;
    setLoading(true);
    try {
      const { data: newCompanyId, error } = await supabase.rpc("create_company_for_signup", {
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

      // Upload logo if selected
      if (logoFile && newCompanyId) {
        const logoUrl = await uploadLogo(newCompanyId);
        if (logoUrl) {
          await supabase.from("companies_fact_digit2").update({ logo_url: logoUrl }).eq("id", newCompanyId);
        }
      }

      toast({ title: "Entreprise créée avec succès !" });
      window.location.href = "/dashboard";
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
          {/* Logo upload */}
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Logo de l'entreprise</Label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border/50">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-16 h-16 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              {!logoPreview && (
                <span className="text-xs text-muted-foreground">Cliquez pour ajouter un logo</span>
              )}
            </div>
          </div>

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
