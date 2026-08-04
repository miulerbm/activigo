import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  ACTIVITY_REPOSITORY,
  ActivityRepository,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

@Injectable()
export class GetActivityByIdUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(id: string): Promise<ActivityEntity> {
    const activity = await this.activityRepository.findById(id);
    if (!activity) {
      throw new NotFoundException("Actividad no encontrada");
    }
    return activity;
  }
}
