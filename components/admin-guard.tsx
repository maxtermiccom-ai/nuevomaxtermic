"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminDashboard } from "@/components/admin-dashboard";

export function AdminGuard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("maxtermic-admin-auth");

    if (token !== "true") {
      router.replace("/admin/login");
      return;
    }

    setReady(true);
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
