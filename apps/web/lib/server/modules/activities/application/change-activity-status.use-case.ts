import { ActivityStatus } from "@activigo/shared";
import { NotFoundError } from "../../../errors";
import { ActivityRepository } from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

export class ChangeActivityStatusUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(id: string, status: ActivityStatus): Promise<ActivityEntity> {
    const existing = await this.activityRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Actividad no encontrada");
    }
    return this.activityRepository.changeStatus(id, status);
  }
}
