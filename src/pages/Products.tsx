import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Search, Package as PackageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Product = {
  id: string; name: string; description: string | null; price: number;
  tva_rate: number | null; category: string | null; unit: string | null; is_service: boolean | null;
};

export default function Products() {
  const { companyId } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", tva_rate: "18", category: "", unit: "unité", is_service: false });

  useEffect(() => { if (companyId) fetchProducts(); }, [companyId]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products_fact_digit2").select("*").eq("company_id", companyId!).order("name");
    if (data) setProducts(data);
  };

  const handleSave = async () => {
    if (!form.name || !companyId) return;
    const payload = {
      name: form.name, description: form.description || null, price: parseFloat(form.price) || 0,
      tva_rate: parseFloat(form.tva_rate) || 0, category: form.category || null, unit: form.unit || null,
      is_service: form.is_service, company_id: companyId,
    };
    if (editing) {
      const { error } = await supabase.from("products_fact_digit2").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Produit modifié" });
    } else {
      const { error } = await supabase.from("products_fact_digit2").insert(payload);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Produit ajouté" });
    }
    setDialogOpen(false); setEditing(null); resetForm(); fetchProducts();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from("products_fact_digit2").delete().eq("id", deleteId);
    setDeleteId(null); toast({ title: "Produit supprimé" }); fetchProducts();
  };

  const resetForm = () => setForm({ name: "", description: "", price: "", tva_rate: "18", category: "", unit: "unité", is_service: false });

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description || "", price: p.price.toString(), tva_rate: (p.tva_rate ?? 18).toString(), category: p.category || "", unit: p.unit || "unité", is_service: p.is_service ?? false });
    setDialogOpen(true);
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <PackageIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Produits & Services</h1>
            <p className="text-xs text-muted-foreground">{products.length} élément{products.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <Button variant="premium" onClick={() => { resetForm(); setEditing(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Nouveau produit
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
        <div className="p-4 border-b border-border/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un produit..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 premium-input" />
          </div>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/20 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Nom</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Prix (FCFA)</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">TVA</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Catégorie</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Type</TableHead>
                <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="premium-table-row border-border/10">
                  <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                  <TableCell className="text-foreground font-semibold">{p.price.toLocaleString("fr-FR")}</TableCell>
                  <TableCell className="text-muted-foreground">{p.tva_rate ?? 0}%</TableCell>
                  <TableCell className="text-muted-foreground">{p.category || "-"}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.is_service ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"}`}>
                      {p.is_service ? "Service" : "Produit"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)} className="hover:bg-primary/10 hover:text-primary"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)} className="hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-12">Aucun produit trouvé</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-card border-border/30">
          <DialogHeader><DialogTitle className="font-display">{editing ? "Modifier" : "Nouveau produit"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="premium-input" /></div>
            <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="premium-input" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Prix (FCFA) *</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="premium-input" /></div>
              <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">TVA (%)</Label><Input type="number" value={form.tva_rate} onChange={(e) => setForm({ ...form, tva_rate: e.target.value })} className="premium-input" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Catégorie</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="premium-input" /></div>
              <div className="space-y-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Unité</Label><Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="premium-input" /></div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="is_service" checked={form.is_service} onChange={(e) => setForm({ ...form, is_service: e.target.checked })} className="accent-primary" />
              <Label htmlFor="is_service" className="text-sm text-muted-foreground">C'est un service</Label>
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
            <AlertDialogTitle className="font-display">Supprimer ce produit ?</AlertDialogTitle>
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
