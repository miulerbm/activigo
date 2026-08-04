import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  ACTIVITY_REPOSITORY,
  ActivityRepository,
  UpdateActivityData,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

@Injectable()
export class UpdateActivityUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(id: string, data: UpdateActivityData): Promise<ActivityEntity> {
    const existing = await this.activityRepository.findById(id);
    if (!existing) {
      throw new NotFoundException("Actividad no encontrada");
    }
    return this.activityRepository.update(id, data);
  }
}
