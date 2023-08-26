import { Outlet } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div>
      Dashboard Layout
      <Outlet />
    </div>
  );
}
