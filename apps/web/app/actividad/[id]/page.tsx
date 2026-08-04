import { notFound } from "next/navigation";
import { ApiError, getActivity, listSignupsByActivity } from "../../lib/api-client";
import { ActivityDetailView } from "../../components/ActivityDetailView";

export default async function ActivityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let activity;
  try {
    activity = await getActivity(params.id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const signups = await listSignupsByActivity(params.id);

  return <ActivityDetailView activity={activity} signups={signups} />;
}
