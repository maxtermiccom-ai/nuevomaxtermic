"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminDashboard } from "@/components/admin-dashboard";
import { getSupabaseSession, isSupabaseConfigured, supabase } from "@/lib/supabase";

export function AdminGuard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const validateAccess = async () => {
      const hasCookieAuth = document.cookie.split(";").some((cookie) => cookie.trim() === "maxtermic_admin_auth=true");
      const hasLocalAuth = window.localStorage.getItem("maxtermic-admin-auth") === "true";

      if (!isSupabaseConfigured || !supabase) {
        if (!hasCookieAuth && !hasLocalAuth) {
          router.replace("/admin/login");
          return;
        }
        setReady(true);
        return;
      }

      const session = await getSupabaseSession();
      if (!session && !hasCookieAuth && !hasLocalAuth) {
        router.replace("/admin/login");
        return;
      }

      setReady(true);
    };

    validateAccess();
  }, [router]);

  if (!ready) {
    return (
      <div className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-10 text-center text-slate-300">
        Verificando acceso al panel administrativo...
      </div>
    );
  }

  return <AdminDashboard />;
}
