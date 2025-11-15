import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Clients</h1>
            <p className="text-muted-foreground">Gestion multi-orgs des clients du cabinet.</p>
          </div>
          <Button>Ajouter un client</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Liste des clients</CardTitle>
            <CardDescription>Filtrez par org_id, account_type, statut…</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Placeholder. On affichera plus tard la table Supabase (clients) avec actions.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

