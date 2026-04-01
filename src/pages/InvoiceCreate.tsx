import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, UserPlus, PackagePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type InvoiceItem = { product_id: string; description: string; quantity: number; unit_price: number; tva_rate: number };

export default function InvoiceCreate() {
  const { companyId } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [clientId, setClientId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dateIssued, setDateIssued] = useState(new Date().toISOString().split("T")[0]);
  const [dateDue, setDateDue] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([{ product_id: "", description: "", quantity: 1, unit_price: 0, tva_rate: 18 }]);
  const [loading, setLoading] = useState(false);

  // Quick create dialogs
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [clientForm, setClientForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [productForm, setProductForm] = useState({ name: "", price: "", tva_rate: "18", description: "" });

  useEffect(() => {
    if (companyId) {
      fetchClients();
      fetchProducts();
      generateInvoiceNumber();
    }
  }, [companyId]);

  const fetchClients = async () => {
    const { data } = await supabase.from("clients_fact_digit2").select("*").eq("company_id", companyId!).order("name");
    if (data) setClients(data);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from("products_fact_digit2").select("*").eq("company_id", companyId!).order("name");
    if (data) setProducts(data);
  };

  const generateInvoiceNumber = () => {
    const num = `FD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
    setInvoiceNumber(num);
  };

  const handleProductSelect = (index: number, productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const updated = [...items];
      updated[index] = { ...updated[index], product_id: productId, description: product.name, unit_price: product.price, tva_rate: product.tva_rate ?? 18 };
      setItems(updated);
    }
  };

  const addItem = () => setItems([...items, { product_id: "", description: "", quantity: 1, unit_price: 0, tva_rate: 18 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items]; updated[i] = { ...updated[i], [field]: value }; setItems(updated);
  };

  const subtotal = items.reduce((sum, it) => sum + it.quantity * it.unit_price, 0);
  const tvaTotal = items.reduce((sum, it) => sum + it.quantity * it.unit_price * (it.tva_rate / 100), 0);
  const total = subtotal + tvaTotal;

  const handleCreateClient = async () => {
    if (!clientForm.name || !companyId) return;
    const { data, error } = await supabase.from("clients_fact_digit2").insert({ ...clientForm, company_id: companyId }).select().single();
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    if (data) { setClients([data, ...clients]); setClientId(data.id); }
    setClientDialogOpen(false);
    setClientForm({ name: "", email: "", phone: "", address: "" });
    toast({ title: "Client créé" });
  };

  const handleCreateProduct = async () => {
    if (!productForm.name || !companyId) return;
    const { data, error } = await supabase.from("products_fact_digit2").insert({
      name: productForm.name, price: parseFloat(productForm.price) || 0,
      tva_rate: parseFloat(productForm.tva_rate) || 18, description: productForm.description || null, company_id: companyId,
    }).select().single();
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    if (data) setProducts([data, ...products]);
    setProductDialogOpen(false);
    setProductForm({ name: "", price: "", tva_rate: "18", description: "" });
    toast({ title: "Produit créé" });
  };

  const handleSubmit = async () => {
    if (!clientId || !companyId || items.length === 0) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires.", variant: "destructive" }); return;
    }
    setLoading(true);
    try {
      const { data: invoice, error } = await supabase.from("invoices_fact_digit2").insert({
        invoice_number: invoiceNumber, client_id: clientId, company_id: companyId,
        date_issued: dateIssued, date_due: dateDue || null, notes: notes || null,
        subtotal, tva_amount: tvaTotal, total_amount: total, status: "draft",
      }).select().single();
      if (error) throw error;

      const invoiceItems = items.map((it) => ({
        invoice_id: invoice.id, product_id: it.product_id || null, description: it.description,
        quantity: it.quantity, unit_price: it.unit_price, tva_rate: it.tva_rate, total_price: it.quantity * it.unit_price,
      }));
      const { error: itemsError } = await supabase.from("invoice_items_fact_digit2").insert(invoiceItems);
      if (itemsError) throw itemsError;

      toast({ title: "Facture créée avec succès" });
      navigate("/invoices");
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-display font-bold">Nouvelle facture</h1>

      <Card>
        <CardHeader><CardTitle>Informations générales</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>N° Facture</Label><Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} /></div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>Client *</Label>
                <Button variant="ghost" size="sm" onClick={() => setClientDialogOpen(true)} className="h-6 text-xs gap-1"><UserPlus className="h-3 w-3" /> Nouveau</Button>
              </div>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un client" /></SelectTrigger>
                <SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Date d'émission</Label><Input type="date" value={dateIssued} onChange={(e) => setDateIssued(e.target.value)} /></div>
            <div><Label>Date d'échéance</Label><Input type="date" value={dateDue} onChange={(e) => setDateDue(e.target.value)} /></div>
          </div>
          <div><Label>Notes</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes ou conditions..." /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Articles</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setProductDialogOpen(true)}><PackagePlus className="h-4 w-4 mr-1" /> Nouveau produit</Button>
              <Button variant="outline" size="sm" onClick={addItem}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-4">
                {i === 0 && <Label className="text-xs">Produit</Label>}
                <Select value={item.product_id} onValueChange={(v) => handleProductSelect(i, v)}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>{products.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} - {p.price.toLocaleString("fr-FR")} FCFA</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                {i === 0 && <Label className="text-xs">Qté</Label>}
                <Input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(i, "quantity", parseInt(e.target.value) || 1)} />
              </div>
              <div className="col-span-2">
                {i === 0 && <Label className="text-xs">Prix unit.</Label>}
                <Input type="number" value={item.unit_price} onChange={(e) => updateItem(i, "unit_price", parseFloat(e.target.value) || 0)} />
              </div>
              <div className="col-span-1">
                {i === 0 && <Label className="text-xs">TVA%</Label>}
                <Input type="number" value={item.tva_rate} onChange={(e) => updateItem(i, "tva_rate", parseFloat(e.target.value) || 0)} />
              </div>
              <div className="col-span-2 text-right font-medium text-sm pt-1">
                {(item.quantity * item.unit_price).toLocaleString("fr-FR")} FCFA
              </div>
              <div className="col-span-1">
                {items.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeItem(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                )}
              </div>
            </div>
          ))}

          <Separator />
          <div className="space-y-2 text-right">
            <p className="text-sm">Sous-total : <span className="font-medium">{subtotal.toLocaleString("fr-FR")} FCFA</span></p>
            <p className="text-sm">TVA : <span className="font-medium">{tvaTotal.toLocaleString("fr-FR")} FCFA</span></p>
            <p className="text-lg font-bold">Total : {total.toLocaleString("fr-FR")} FCFA</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={() => navigate("/invoices")}>Annuler</Button>
        <Button onClick={handleSubmit} disabled={loading}>{loading ? "Création..." : "Créer la facture"}</Button>
      </div>

      {/* Dialog: Nouveau client */}
      <Dialog open={clientDialogOpen} onOpenChange={setClientDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouveau client rapide</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nom *</Label><Input value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Email</Label><Input type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></div>
              <div><Label>Téléphone</Label><Input value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} /></div>
            </div>
            <div><Label>Adresse</Label><Input value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClientDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleCreateClient}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Nouveau produit */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouveau produit rapide</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nom *</Label><Input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Prix (FCFA) *</Label><Input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} /></div>
              <div><Label>TVA (%)</Label><Input type="number" value={productForm.tva_rate} onChange={(e) => setProductForm({ ...productForm, tva_rate: e.target.value })} /></div>
            </div>
            <div><Label>Description</Label><Input value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProductDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleCreateProduct}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
