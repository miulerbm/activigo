import { Inject, Injectable } from "@nestjs/common";
import {
  ACTIVITY_REPOSITORY,
  ActivityFilter,
  ActivityRepository,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

@Injectable()
export class ListActivitiesUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: ActivityRepository,
  ) {}

  execute(filter: ActivityFilter): Promise<ActivityEntity[]> {
    return this.activityRepository.findMany(filter);
  }
}
