import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page introuvable</p>
      <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
    </div>
  );
}
