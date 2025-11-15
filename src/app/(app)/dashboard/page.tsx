import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { TvaTrendChart } from "@/components/dashboard/tva-trend-chart";
import { ReceiptsTable } from "@/components/dashboard/receipts-table";
import { FiltersBar } from "@/components/dashboard/filters-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <section className="flex flex-col gap-6 rounded-2xl border border-border/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-6 py-8 text-white lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-white/10 text-white">
              Multi-tenant • Supabase • n8n
            </Badge>
            <h1 className="text-3xl font-semibold leading-tight lg:text-4xl">
              Finvisor/Wizeenn — cockpit TVA des cabinets comptables
            </h1>
            <p className="text-base text-white/80 lg:max-w-xl">
              Base Next.js + Supabase déjà câblée pour brancher les pipelines n8n, importer
              les reçus et piloter les clients par org_id (RLS activées côté Supabase).
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                Ouvrir le dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary">
                Doc intégration Supabase
              </Button>
            </div>
          </div>
        </section>

        <FiltersBar />
        <MetricCards />

        <section className="grid gap-4 lg:grid-cols-2">
          <TvaTrendChart />
          <ReceiptsTable />
        </section>
      </div>
    </AppShell>
  );
}

