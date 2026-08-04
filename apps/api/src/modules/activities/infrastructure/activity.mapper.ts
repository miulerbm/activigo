import { Activity, Signup } from "@prisma/client";
import { ActivityEntity } from "../domain/activity.entity";

type ActivityWithSignups = Activity & { signups?: Signup[] };

export class ActivityMapper {
  static toDomain(raw: ActivityWithSignups): ActivityEntity {
    return new ActivityEntity(
      raw.id,
      raw.title,
      raw.description,
      raw.status as ActivityEntity["status"],
      raw.tags as ActivityEntity["tags"],
      raw.location,
      raw.date,
      raw.signupDeadline,
      raw.maxCapacity,
      raw.createdAt,
      raw.signups?.length ?? 0,
    );
  }
}
