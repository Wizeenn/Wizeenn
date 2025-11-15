import { TrendingUp, Wallet, ReceiptText, Percent } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type Metric = {
  label: string;
  value: string;
  delta?: string;
  icon: React.ElementType;
  sublabel?: string;
};

const baseMetrics: Metric[] = [
  {
    label: "TVA récupérable",
    value: formatCurrency(18450.32),
    delta: "+12% vs. mois dernier",
    icon: Percent,
  },
  {
    label: "Reçus traités",
    value: "1 284",
    delta: "+87 en attente",
    icon: ReceiptText,
  },
  {
    label: "Total TTC",
    value: formatCurrency(94210.57),
    sublabel: "HT 78 400 €",
    icon: Wallet,
  },
  {
    label: "Taux de validation",
    value: "96.4%",
    delta: "3 blocages détectés",
    icon: TrendingUp,
  },
];

export function MetricCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {baseMetrics.map((metric) => (
        <Card key={metric.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>{metric.label}</CardDescription>
            <metric.icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold">{metric.value}</CardTitle>
            {metric.delta && (
              <p className="text-sm text-muted-foreground">{metric.delta}</p>
            )}
            {metric.sublabel && (
              <p className="text-sm text-muted-foreground">{metric.sublabel}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

