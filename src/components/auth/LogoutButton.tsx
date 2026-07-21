"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export function LogoutButton({ label }: { label: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    router.push("/");
    router.refresh();
  }

  return (
    <Button variant="secondary" disabled={isPending} onClick={handleLogout}>
      {label}
    </Button>
  );
}
