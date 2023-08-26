import type { LoaderArgs } from "@remix-run/node";
import { useParams } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  console.log({ params });
  return null;
}

export default function DynamicDashboard() {
  const { id } = useParams();
  console.log({ id });

  return <div>Dashboard with id #{id}</div>;
}
