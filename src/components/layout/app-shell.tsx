import Link from "next/link";
import { Menu, PlusCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser, logout } from "@/integrations/supabase/session";

type AppShellProps = {
  children: React.ReactNode;
};

export async function AppShell({ children }: AppShellProps) {
  const user = await getUser();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Ouvrir la navigation</span>
            </Button>
            <Link href="/" className="font-semibold">
              Wizeenn
            </Link>
            <span className="hidden text-sm text-muted-foreground lg:inline-flex">
              Pilotage TVA temps réel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
              Inviter un membre
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">
              <PlusCircle className="mr-2 h-4 w-4" />
              Importer des reçus
            </Button>
            {user ? (
              <>
                <div className="flex flex-col items-end text-right">
                  <span className="text-sm font-medium">{user.email}</span>
                  <span className="text-xs text-muted-foreground">Connecté</span>
                </div>
                <form action={logout}>
                  <Button type="submit" variant="ghost" size="sm" className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                  </Button>
                </form>
              </>
            ) : (
              <Button asChild size="sm" variant="ghost">
                <Link href="/auth/login">Se connecter</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-8 lg:px-8">{children}</main>
    </div>
  );
}

