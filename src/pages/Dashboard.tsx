import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, FileText, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { companyId } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ clients_count: 0, products_count: 0, invoices_count: 0, total_revenue: 0, total_tva: 0 });
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);

  useEffect(() => {
    if (!companyId) { navigate("/company-setup"); return; }
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
    const { data } = await supabase.from("invoices_fact_digit2").select("*, clients_fact_digit2(name)").eq("company_id", companyId).order("created_at", { ascending: false }).limit(5);
    if (data) setRecentInvoices(data);
  };

  const statCards = [
    { label: "Clients", value: stats.clients_count, icon: Users, accent: "from-blue-500/20 to-blue-600/5" },
    { label: "Produits", value: stats.products_count, icon: Package, accent: "from-emerald-500/20 to-emerald-600/5" },
    { label: "Factures", value: stats.invoices_count, icon: FileText, accent: "from-amber-500/20 to-amber-600/5" },
    { label: "Chiffre d'affaires", value: `${stats.total_revenue.toLocaleString("fr-FR")} F`, icon: DollarSign, accent: "from-primary/20 to-primary-glow/5" },
  ];

  const chartData = [
    { name: "CA", value: stats.total_revenue },
    { name: "TVA", value: stats.total_tva },
    { name: "Net", value: stats.total_revenue - stats.total_tva },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground mt-1">Vue d'ensemble de votre activité</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground glass-card px-3 py-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span>En temps réel</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className="stat-card group cursor-default">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{s.label}</p>
                  <p className="text-2xl font-bold mt-2 text-foreground">{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <div className="w-1.5 h-4 rounded-full bg-primary" />
                Aperçu financier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData}>
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <div className="w-1.5 h-4 rounded-full bg-primary-glow" />
                Dernières factures
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentInvoices.length === 0 ? (
                <div className="flex items-center justify-center h-[260px]">
                  <p className="text-muted-foreground text-sm">Aucune facture récente.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentInvoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between py-3 px-3 rounded-lg premium-table-row">
                      <div>
                        <p className="font-medium text-sm text-foreground">{inv.invoice_number}</p>
                        <p className="text-xs text-muted-foreground">{inv.clients_fact_digit2?.name}</p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <p className="font-semibold text-sm text-foreground">{inv.total_amount?.toLocaleString("fr-FR")} F</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          inv.status === "paid" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" :
                          inv.status === "sent" ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" :
                          "bg-muted text-muted-foreground border border-border/30"
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
        </motion.div>
      </div>
    </div>
  );
}
