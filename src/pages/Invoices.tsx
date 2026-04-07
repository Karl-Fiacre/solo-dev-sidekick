import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Eye, Trash2, Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Invoices() {
  const { companyId } = useAuth();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { if (companyId) fetchInvoices(); }, [companyId]);

  const fetchInvoices = async () => {
    const { data } = await supabase.from("invoices_fact_digit2").select("*, clients_fact_digit2(name)").eq("company_id", companyId!).order("created_at", { ascending: false });
    if (data) setInvoices(data);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from("invoice_items_fact_digit2").delete().eq("invoice_id", deleteId);
    await supabase.from("fne_logs_fact_digit2").delete().eq("invoice_id", deleteId);
    const { error } = await supabase.from("invoices_fact_digit2").delete().eq("id", deleteId);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Facture supprimée" }); }
    setDeleteId(null); fetchInvoices();
  };

  const statusLabel = (s: string | null) => {
    switch (s) {
      case "paid": return { text: "Payée", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" };
      case "sent": return { text: "Envoyée", cls: "bg-blue-500/15 text-blue-400 border-blue-500/20" };
      case "cancelled": return { text: "Annulée", cls: "bg-red-500/15 text-red-400 border-red-500/20" };
      default: return { text: "Brouillon", cls: "bg-muted text-muted-foreground border-border/30" };
    }
  };

  const fneLabel = (s: string | null) => {
    switch (s) {
      case "validated": return { text: "Validée", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" };
      case "submitted": return { text: "Soumise", cls: "bg-amber-500/15 text-amber-400 border-amber-500/20" };
      case "rejected": return { text: "Rejetée", cls: "bg-red-500/15 text-red-400 border-red-500/20" };
      default: return { text: "-", cls: "bg-muted/50 text-muted-foreground border-border/20" };
    }
  };

  const filtered = invoices.filter((inv) =>
    inv.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
    inv.clients_fact_digit2?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Factures</h1>
            <p className="text-xs text-muted-foreground">{invoices.length} facture{invoices.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <Button variant="premium" onClick={() => navigate("/invoices/create")}>
          <Plus className="h-4 w-4 mr-2" /> Nouvelle facture
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
        <div className="p-4 border-b border-border/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher une facture..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 premium-input" />
          </div>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/20 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">N° Facture</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Client</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Date</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Montant</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Statut</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">FNE</TableHead>
                <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => {
                const st = statusLabel(inv.status);
                const fne = fneLabel(inv.fne_status);
                return (
                  <TableRow key={inv.id} className="premium-table-row border-border/10">
                    <TableCell className="font-semibold text-foreground">{inv.invoice_number}</TableCell>
                    <TableCell className="text-muted-foreground">{inv.clients_fact_digit2?.name || "-"}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(inv.date_issued).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell className="font-semibold text-foreground">{inv.total_amount?.toLocaleString("fr-FR")} F</TableCell>
                    <TableCell><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${st.cls}`}>{st.text}</span></TableCell>
                    <TableCell><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${fne.cls}`}>{fne.text}</span></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(inv.id)} className="hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-12">Aucune facture trouvée</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="glass-card border-border/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Supprimer cette facture ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action supprimera la facture et tous ses éléments associés. Elle est irréversible.</AlertDialogDescription>
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
