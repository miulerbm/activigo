import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ActivityStatus } from "@activigo/shared";
import {
  ACTIVITY_REPOSITORY,
  ActivityRepository,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

@Injectable()
export class ChangeActivityStatusUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(id: string, status: ActivityStatus): Promise<ActivityEntity> {
    const existing = await this.activityRepository.findById(id);
    if (!existing) {
      throw new NotFoundException("Actividad no encontrada");
    }
    return this.activityRepository.changeStatus(id, status);
  }
}
