import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const COLORS = ["hsl(40, 72%, 52%)", "hsl(32, 85%, 58%)", "hsl(142, 71%, 45%)", "hsl(200, 80%, 55%)"];

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
    { name: "CA", value: stats.total_revenue },
    { name: "TVA", value: stats.total_tva },
    { name: "Net", value: stats.total_revenue - stats.total_tva },
  ];

  const summaryItems = [
    { label: "Total clients", value: stats.clients_count },
    { label: "Total produits", value: stats.products_count },
    { label: "Total factures", value: stats.invoices_count },
    { label: "Chiffre d'affaires", value: `${stats.total_revenue.toLocaleString("fr-FR")} F` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Rapports financiers</h1>
          <p className="text-xs text-muted-foreground">Analyses et statistiques</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <div className="w-1.5 h-4 rounded-full bg-primary" />
                Revenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 12% 16%)" />
                  <XAxis dataKey="name" stroke="hsl(220 10% 45%)" fontSize={12} />
                  <YAxis stroke="hsl(220 10% 45%)" fontSize={12} />
                  <Tooltip
                    formatter={(v: number) => `${v.toLocaleString("fr-FR")} FCFA`}
                    contentStyle={{ background: "hsl(228 16% 12%)", border: "1px solid hsl(228 12% 20%)", borderRadius: "8px", color: "hsl(40 20% 95%)" }}
                  />
                  <Bar dataKey="value" fill="hsl(40, 72%, 52%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <div className="w-1.5 h-4 rounded-full bg-primary-glow" />
                Factures par statut
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={invoicesByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={{ fill: "hsl(220 10% 55%)", fontSize: 12 }}>
                    {invoicesByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(228 16% 12%)", border: "1px solid hsl(228 12% 20%)", borderRadius: "8px", color: "hsl(40 20% 95%)" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="glass-card p-6">
          <h3 className="text-base font-display font-semibold mb-5 flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-full bg-emerald-400" />
            Résumé
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {summaryItems.map((item) => (
              <div key={item.label} className="stat-card !p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
