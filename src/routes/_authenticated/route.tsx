import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const STORAGE_KEY = "panganpeduli_demo_user";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: () => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) throw redirect({ to: "/auth", search: { mode: "login" } });
  },
  component: () => <Outlet />,
});
