import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

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
      <h1 className="text-3xl font-display font-bold">Paramètres</h1>

      <Card>
        <CardHeader><CardTitle>Mon profil</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Prénom</Label><Input value={profileForm.first_name} onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })} /></div>
            <div><Label>Nom</Label><Input value={profileForm.last_name} onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })} /></div>
          </div>
          <div><Label>Téléphone</Label><Input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} /></div>
          <Button onClick={saveProfile} disabled={saving}>Enregistrer</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader><CardTitle>Mon entreprise</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Nom de l'entreprise</Label><Input value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} /></div>
          <div><Label>Adresse</Label><Input value={companyForm.address} onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Téléphone</Label><Input value={companyForm.phone} onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })} /></div>
            <div><Label>Email</Label><Input value={companyForm.email} onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>RCCM</Label><Input value={companyForm.rccm} onChange={(e) => setCompanyForm({ ...companyForm, rccm: e.target.value })} /></div>
            <div><Label>N° Compte Contribuable</Label><Input value={companyForm.numero_cc} onChange={(e) => setCompanyForm({ ...companyForm, numero_cc: e.target.value })} /></div>
          </div>
          <Button onClick={saveCompany} disabled={saving}>Enregistrer</Button>
        </CardContent>
      </Card>
    </div>
  );
}
