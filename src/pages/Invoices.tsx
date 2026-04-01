import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Eye, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function Invoices() {
  const { companyId } = useAuth();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { if (companyId) fetchInvoices(); }, [companyId]);

  const fetchInvoices = async () => {
    const { data } = await supabase
      .from("invoices_fact_digit2")
      .select("*, clients_fact_digit2(name)")
      .eq("company_id", companyId!)
      .order("created_at", { ascending: false });
    if (data) setInvoices(data);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    // Delete invoice items first, then invoice
    await supabase.from("invoice_items_fact_digit2").delete().eq("invoice_id", deleteId);
    await supabase.from("fne_logs_fact_digit2").delete().eq("invoice_id", deleteId);
    const { error } = await supabase.from("invoices_fact_digit2").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Facture supprimée" });
    }
    setDeleteId(null);
    fetchInvoices();
  };

  const statusLabel = (s: string | null) => {
    switch (s) {
      case "paid": return { text: "Payée", cls: "bg-green-100 text-green-700" };
      case "sent": return { text: "Envoyée", cls: "bg-blue-100 text-blue-700" };
      case "cancelled": return { text: "Annulée", cls: "bg-red-100 text-red-700" };
      default: return { text: "Brouillon", cls: "bg-gray-100 text-gray-700" };
    }
  };

  const filtered = invoices.filter((inv) =>
    inv.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
    inv.clients_fact_digit2?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Factures</h1>
        <Button onClick={() => navigate("/invoices/create")}><Plus className="h-4 w-4 mr-2" /> Nouvelle facture</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Facture</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>FNE</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => {
                const st = statusLabel(inv.status);
                return (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.invoice_number}</TableCell>
                    <TableCell>{inv.clients_fact_digit2?.name || "-"}</TableCell>
                    <TableCell>{new Date(inv.date_issued).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>{inv.total_amount?.toLocaleString("fr-FR")} FCFA</TableCell>
                    <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${st.cls}`}>{st.text}</span></TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        inv.fne_status === "validated" ? "bg-green-100 text-green-700" :
                        inv.fne_status === "submitted" ? "bg-yellow-100 text-yellow-700" :
                        inv.fne_status === "rejected" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>
                        {inv.fne_status === "validated" ? "Validée" :
                         inv.fne_status === "submitted" ? "Soumise" :
                         inv.fne_status === "rejected" ? "Rejetée" : "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(inv.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Aucune facture trouvée</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette facture ?</AlertDialogTitle>
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
