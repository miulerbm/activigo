import { ActivityStatus, ActivityTag } from "@activigo/shared";

export class ActivityEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public status: ActivityStatus,
    public tags: ActivityTag[],
    public location: string | null,
    public date: Date | null,
    public signupDeadline: Date | null,
    public maxCapacity: number | null,
    public readonly createdAt: Date,
    public signupsCount: number = 0,
  ) {}
}
