import { ActivityStatus, ActivityTag } from "@activigo/shared";
import { ActivityEntity } from "./activity.entity";

export const ACTIVITY_REPOSITORY = Symbol("ACTIVITY_REPOSITORY");

export interface ActivityFilter {
  status?: ActivityStatus;
  tag?: ActivityTag;
}

export interface CreateActivityData {
  title: string;
  description?: string;
  status?: ActivityStatus;
  tags: ActivityTag[];
  location?: string;
  date?: Date;
  signupDeadline?: Date;
  maxCapacity?: number;
}

export type UpdateActivityData = Partial<CreateActivityData>;

export interface ActivityRepository {
  create(data: CreateActivityData): Promise<ActivityEntity>;
  update(id: string, data: UpdateActivityData): Promise<ActivityEntity>;
  changeStatus(id: string, status: ActivityStatus): Promise<ActivityEntity>;
  findById(id: string): Promise<ActivityEntity | null>;
  findMany(filter: ActivityFilter): Promise<ActivityEntity[]>;
}
