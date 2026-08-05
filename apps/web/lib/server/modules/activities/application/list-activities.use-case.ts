import {
  ActivityFilter,
  ActivityRepository,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

export class ListActivitiesUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  execute(filter: ActivityFilter): Promise<ActivityEntity[]> {
    return this.activityRepository.findMany(filter);
  }
}
