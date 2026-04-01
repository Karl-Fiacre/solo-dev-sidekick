import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(221, 83%, 53%)", "hsl(250, 76%, 57%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)"];

export default function Reports() {
  const { companyId } = useAuth();
  const [stats, setStats] = useState({ clients_count: 0, products_count: 0, invoices_count: 0, total_revenue: 0, total_tva: 0 });
  const [invoicesByStatus, setInvoicesByStatus] = useState<any[]>([]);

  useEffect(() => {
    if (companyId) { fetchStats(); fetchInvoicesByStatus(); }
  }, [companyId]);

  const fetchStats = async () => {
    const { data } = await supabase.rpc("get_dashboard_stats", { p_company_id: companyId! });
    if (data && data[0]) setStats(data[0]);
  };

  const fetchInvoicesByStatus = async () => {
    const { data } = await supabase.from("invoices_fact_digit2").select("status").eq("company_id", companyId!);
    if (data) {
      const counts: Record<string, number> = {};
      data.forEach((inv) => { const s = inv.status || "draft"; counts[s] = (counts[s] || 0) + 1; });
      setInvoicesByStatus(Object.entries(counts).map(([name, value]) => ({ name: name === "draft" ? "Brouillon" : name === "paid" ? "Payée" : name === "sent" ? "Envoyée" : name, value })));
    }
  };

  const revenueData = [
    { name: "Chiffre d'affaires", value: stats.total_revenue },
    { name: "TVA collectée", value: stats.total_tva },
    { name: "Bénéfice net", value: stats.total_revenue - stats.total_tva },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Rapports financiers</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Revenus</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v: number) => `${v.toLocaleString("fr-FR")} FCFA`} />
                <Bar dataKey="value" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Factures par statut</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={invoicesByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {invoicesByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Résumé</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div><p className="text-sm text-muted-foreground">Total clients</p><p className="text-2xl font-bold">{stats.clients_count}</p></div>
            <div><p className="text-sm text-muted-foreground">Total produits</p><p className="text-2xl font-bold">{stats.products_count}</p></div>
            <div><p className="text-sm text-muted-foreground">Total factures</p><p className="text-2xl font-bold">{stats.invoices_count}</p></div>
            <div><p className="text-sm text-muted-foreground">Chiffre d'affaires</p><p className="text-2xl font-bold">{stats.total_revenue.toLocaleString("fr-FR")} FCFA</p></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
