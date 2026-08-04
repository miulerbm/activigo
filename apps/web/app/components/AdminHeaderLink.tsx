"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { hasValidAdminSession } from "../lib/api-client";

export function AdminHeaderLink() {
  const [href, setHref] = useState("/admin/login");

  useEffect(() => {
    setHref(hasValidAdminSession() ? "/admin" : "/admin/login");
  }, []);

  return (
    <Link
      href={href}
      title="Solo dale acá si eres molver :v"
      aria-label="Admin"
      className="text-slate-300 hover:text-slate-500 dark:text-slate-700 dark:hover:text-slate-500"
    >
      <Lock className="h-3.5 w-3.5" />
    </Link>
  );
}
