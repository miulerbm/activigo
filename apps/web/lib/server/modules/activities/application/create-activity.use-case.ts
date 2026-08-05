import {
  ActivityRepository,
  CreateActivityData,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

export class CreateActivityUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  execute(data: CreateActivityData): Promise<ActivityEntity> {
    return this.activityRepository.create(data);
  }
}
