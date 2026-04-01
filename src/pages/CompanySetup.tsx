import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

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
      window.location.href = "/dashboard";
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display text-primary">Configuration de l'entreprise</CardTitle>
          <CardDescription>Renseignez les informations de votre entreprise pour commencer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Nom de l'entreprise *</Label><Input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} required /></div>
            <div><Label>Adresse</Label><Input value={form.company_address} onChange={(e) => setForm({ ...form, company_address: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Téléphone</Label><Input value={form.company_phone} onChange={(e) => setForm({ ...form, company_phone: e.target.value })} /></div>
              <div><Label>Email</Label><Input type="email" value={form.company_email} onChange={(e) => setForm({ ...form, company_email: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>RCCM</Label><Input value={form.company_rccm} onChange={(e) => setForm({ ...form, company_rccm: e.target.value })} /></div>
              <div><Label>N° CC</Label><Input value={form.company_numero_cc} onChange={(e) => setForm({ ...form, company_numero_cc: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Votre prénom</Label><Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} /></div>
              <div><Label>Votre nom</Label><Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} /></div>
            </div>
            <div><Label>Votre téléphone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Création..." : "Créer mon entreprise"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
