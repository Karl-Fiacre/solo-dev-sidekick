import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Users, Package, BarChart3, Shield, Zap } from "lucide-react";

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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-6">
            Fact-<span className="text-primary">Digit</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Solution SaaS de facturation normalisée et gestion d'entreprise en Côte d'Ivoire
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="premium" onClick={() => navigate("/auth")} className="text-base px-8">
              Commencer gratuitement
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="text-base px-8">
              Se connecter
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-center mb-16"
          >
            Tout pour gérer votre entreprise
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary to-primary-glow rounded-2xl p-12 text-primary-foreground"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Prêt à digitaliser votre facturation ?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Rejoignez les entreprises ivoiriennes qui font confiance à Fact-Digit.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-background text-foreground hover:bg-background/90 text-base px-8"
          >
            Créer mon compte
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Fact-Digit. Tous droits réservés.
      </footer>
    </div>
  );
}
