import { Inject, Injectable } from "@nestjs/common";
import {
  ACTIVITY_REPOSITORY,
  ActivityRepository,
  CreateActivityData,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

@Injectable()
export class CreateActivityUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: ActivityRepository,
  ) {}

  execute(data: CreateActivityData): Promise<ActivityEntity> {
    return this.activityRepository.create(data);
  }
}
