import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/utils";

type Receipt = {
  id: string;
  client: string;
  supplier: string;
  amount: number;
  vat: number;
  status: "imported" | "review" | "validated";
  date: string;
};

const receipts: Receipt[] = [
  {
    id: "RC-2025-981",
    client: "Heetch France",
    supplier: "Uber Eats",
    amount: 124.5,
    vat: 24.9,
    status: "validated",
    date: new Date().toISOString(),
  },
  {
    id: "RC-2025-982",
    client: "LegalPlace",
    supplier: "Air France",
    amount: 480.9,
    vat: 96.18,
    status: "review",
    date: new Date().toISOString(),
  },
  {
    id: "RC-2025-983",
    client: "Swile",
    supplier: "Station Total",
    amount: 87.34,
    vat: 17.46,
    status: "imported",
    date: new Date().toISOString(),
  },
];

const statusToLabel: Record<Receipt["status"], string> = {
  imported: "Importé",
  review: "Revue",
  validated: "Validé",
};

export function ReceiptsTable() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle>Derniers reçus traités</CardTitle>
          <p className="text-sm text-muted-foreground">
            Exemple de rendu UI connecté plus tard à Supabase.
          </p>
        </div>
        <Badge variant="secondary">{receipts.length} en cours</Badge>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-2 font-medium">Reçu</th>
              <th className="py-2 font-medium">Client</th>
              <th className="py-2 font-medium">Fournisseur</th>
              <th className="py-2 font-medium">Montant TTC</th>
              <th className="py-2 font-medium">TVA</th>
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium text-right">Statut</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <tr key={receipt.id} className="border-t border-border/60">
                <td className="py-3 font-medium">{receipt.id}</td>
                <td className="py-3">{receipt.client}</td>
                <td className="py-3">{receipt.supplier}</td>
                <td className="py-3">{formatCurrency(receipt.amount)}</td>
                <td className="py-3 text-muted-foreground">{formatCurrency(receipt.vat)}</td>
                <td className="py-3 text-muted-foreground">{formatDateTime(receipt.date)}</td>
                <td className="py-3 text-right">
                  <Badge variant={receipt.status === "validated" ? "success" : "outline"}>
                    {statusToLabel[receipt.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

