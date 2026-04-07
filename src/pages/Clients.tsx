import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Search, Users as UsersIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Client = {
  id: string; name: string; email: string | null; phone: string | null;
  address: string | null; rccm: string | null; numero_cc: string | null; type: string | null;
};

export default function Clients() {
  const { companyId } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", rccm: "", numero_cc: "", type: "particulier" });

  useEffect(() => { if (companyId) fetchClients(); }, [companyId]);

  const fetchClients = async () => {
    const { data } = await supabase.from("clients_fact_digit2").select("*").eq("company_id", companyId!).order("name");
    if (data) setClients(data);
  };

  const handleSave = async () => {
    if (!form.name || !companyId) return;
    const payload = { ...form, company_id: companyId };
    if (editing) {
      const { error } = await supabase.from("clients_fact_digit2").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Client modifié" });
    } else {
      const { error } = await supabase.from("clients_fact_digit2").insert(payload);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Client ajouté" });
    }
    setDialogOpen(false); setEditing(null);
    setForm({ name: "", email: "", phone: "", address: "", rccm: "", numero_cc: "", type: "particulier" });
    fetchClients();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from("clients_fact_digit2").delete().eq("id", deleteId);
    setDeleteId(null); toast({ title: "Client supprimé" }); fetchClients();
  };

  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({ name: c.name, email: c.email || "", phone: c.phone || "", address: c.address || "", rccm: c.rccm || "", numero_cc: c.numero_cc || "", type: c.type || "particulier" });
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", email: "", phone: "", address: "", rccm: "", numero_cc: "", type: "particulier" });
    setDialogOpen(true);
  };

  const filtered = clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <UsersIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Clients</h1>
            <p className="text-xs text-muted-foreground">{clients.length} client{clients.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <Button variant="premium" onClick={openNew}><Plus className="h-4 w-4 mr-2" /> Nouveau client</Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
        <div className="p-4 border-b border-border/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un client..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 premium-input" />
          </div>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/20 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Nom</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Email</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Téléphone</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Type</TableHead>
                <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="premium-table-row border-border/10">
                  <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.email || "-"}</TableCell>
                  <TableCell className="text-muted-foreground">{c.phone || "-"}</TableCell>
                  <TableCell>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                      {c.type || "particulier"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)} className="hover:bg-primary/10 hover:text-primary"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(c.id)} className="hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-12">Aucun client trouvé</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-card border-border/30">
          <DialogHeader><DialogTitle className="font-display">{editing ? "Modifier le client" : "Nouveau client"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="premium-input" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="premium-input" /></div>
              <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Téléphone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="premium-input" /></div>
            </div>
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Adresse</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="premium-input" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">RCCM</Label><Input value={form.rccm} onChange={(e) => setForm({ ...form, rccm: e.target.value })} className="premium-input" /></div>
              <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">N° CC</Label><Input value={form.numero_cc} onChange={(e) => setForm({ ...form, numero_cc: e.target.value })} className="premium-input" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
            <Button variant="premium" onClick={handleSave}>{editing ? "Modifier" : "Ajouter"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="glass-card border-border/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Supprimer ce client ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
