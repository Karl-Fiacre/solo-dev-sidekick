import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, FileText, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { companyId } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ clients_count: 0, products_count: 0, invoices_count: 0, total_revenue: 0, total_tva: 0 });
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);

  useEffect(() => {
    if (!companyId) {
      navigate("/company-setup");
      return;
    }
    fetchStats();
    fetchRecentInvoices();
  }, [companyId]);

  const fetchStats = async () => {
    if (!companyId) return;
    const { data } = await supabase.rpc("get_dashboard_stats", { p_company_id: companyId });
    if (data && data[0]) setStats(data[0]);
  };

  const fetchRecentInvoices = async () => {
    if (!companyId) return;
    const { data } = await supabase
      .from("invoices_fact_digit2")
      .select("*, clients_fact_digit2(name)")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setRecentInvoices(data);
  };

  const statCards = [
    { label: "Clients", value: stats.clients_count, icon: Users, color: "text-blue-600" },
    { label: "Produits", value: stats.products_count, icon: Package, color: "text-green-600" },
    { label: "Factures", value: stats.invoices_count, icon: FileText, color: "text-orange-600" },
    { label: "Chiffre d'affaires", value: `${stats.total_revenue.toLocaleString("fr-FR")} FCFA`, icon: DollarSign, color: "text-purple-600" },
  ];

  const chartData = [
    { name: "CA", value: stats.total_revenue },
    { name: "TVA", value: stats.total_tva },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                </div>
                <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aperçu financier</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
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
          <CardHeader>
            <CardTitle className="text-lg">Dernières factures</CardTitle>
          </CardHeader>
          <CardContent>
            {recentInvoices.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune facture récente.</p>
            ) : (
              <div className="space-y-3">
                {recentInvoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{inv.invoice_number}</p>
                      <p className="text-xs text-muted-foreground">{inv.clients_fact_digit2?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{inv.total_amount?.toLocaleString("fr-FR")} FCFA</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        inv.status === "paid" ? "bg-green-100 text-green-700" :
                        inv.status === "sent" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {inv.status === "paid" ? "Payée" : inv.status === "sent" ? "Envoyée" : "Brouillon"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
