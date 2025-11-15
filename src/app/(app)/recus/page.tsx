import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecusPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Reçus</h1>
            <p className="text-muted-foreground">Flux complet des reçus importés par org.</p>
          </div>
          <Button>Importer des reçus</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Liste des reçus</CardTitle>
            <CardDescription>TODO: brancher la table Supabase.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Placeholder. On affichera ici la table paginée avec filtres et statut de validation.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

