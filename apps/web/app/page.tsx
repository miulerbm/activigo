import { listActivities } from "./lib/api-client";
import { ActivitiesBrowser } from "./components/ActivitiesBrowser";

export default async function HomePage() {
  const activities = await listActivities();
  return <ActivitiesBrowser activities={activities} />;
}
