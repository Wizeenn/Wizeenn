"use client";

import { CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useFiltersStore } from "@/stores/filters-store";

export function FiltersBar() {
  const { dateRange, clientId, teamId, reset } = useFiltersStore();
  const hasFilters = !!dateRange.from || !!clientId || !!teamId;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-border/80 bg-muted/30 px-4 py-3 text-sm">
      <Button variant="ghost" size="sm" className="gap-2">
        <CalendarIcon className="h-4 w-4" />
        {dateRange.from
          ? `${formatDate(dateRange.from)} → ${formatDate(dateRange.to ?? new Date())}`
          : "Plage de dates"}
      </Button>
      <Button variant="ghost" size="sm" className="gap-2">
        <Users className="h-4 w-4" />
        {clientId ? `Client ${clientId}` : "Tous les clients"}
      </Button>
      <Button variant="ghost" size="sm">
        {teamId ? `Equipe ${teamId}` : "Toutes les équipes"}
      </Button>
      {hasFilters ? (
        <Button variant="outline" size="sm" onClick={reset} className="ml-auto">
          Réinitialiser
        </Button>
      ) : (
        <Badge variant="outline" className={cn("ml-auto hidden md:inline-flex")}>
          Filtres globaux par org_id
        </Badge>
      )}
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(date);
}

