import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Users, Package, BarChart3, Shield, Zap, ArrowRight, Sparkles } from "lucide-react";

const features = [
  { icon: FileText, title: "Facturation normalisée", desc: "Factures conformes DGI Côte d'Ivoire avec intégration FNE." },
  { icon: Users, title: "Gestion clients", desc: "Suivez vos clients et leur historique de facturation." },
  { icon: Package, title: "Catalogue produits", desc: "Gérez vos produits et services avec prix et TVA." },
  { icon: BarChart3, title: "Rapports financiers", desc: "Tableaux de bord et analyses en temps réel." },
  { icon: Shield, title: "Sécurité renforcée", desc: "Clé API FNE jamais stockée, chiffrement TLS." },
  { icon: Zap, title: "Multi-plateforme", desc: "Accessible sur web, mobile et desktop." },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Ambient glow orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-primary/30 -top-60 -right-60 fixed animate-glow" />
      <div className="glow-orb w-[500px] h-[500px] bg-primary-glow/20 -bottom-40 -left-40 fixed animate-glow" style={{ animationDelay: "2s" }} />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-display font-bold gold-text">Fact-Digit</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate("/auth")} className="text-muted-foreground hover:text-foreground">
            Se connecter
          </Button>
          <Button variant="premium" onClick={() => navigate("/auth")} className="px-6">
            Commencer
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Solution de facturation nouvelle génération
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground mb-6 leading-[0.95]">
            La facturation
            <br />
            <span className="gold-text">réinventée</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Solution SaaS premium de facturation normalisée et gestion d'entreprise en Côte d'Ivoire. Conforme DGI.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="premium" onClick={() => navigate("/auth")} className="text-base px-10 h-13 shadow-lg">
              Commencer gratuitement
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="text-base px-10 h-13 border-border/50 hover:border-primary/40 hover:bg-primary/5">
              Voir la démo
            </Button>
          </div>
        </motion.div>

        {/* Decorative grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(40 72% 52%) 1px, transparent 1px), linear-gradient(to right, hsl(40 72% 52%) 1px, transparent 1px)`,
          backgroundSize: "80px 80px"
        }} />
      </section>

      {/* Features */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Fonctionnalités</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Tout pour gérer votre <span className="gold-text">entreprise</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="glass-card-hover p-7"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-28 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass-card p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20" style={{ background: "var(--gold-gradient)" }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              Prêt à digitaliser votre facturation ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Rejoignez les entreprises ivoiriennes qui font confiance à Fact-Digit.
            </p>
            <Button size="lg" variant="premium" onClick={() => navigate("/auth")} className="text-base px-10 h-13">
              Créer mon compte
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-border/30 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Fact-Digit. Tous droits réservés.
      </footer>
    </div>
  );
}
