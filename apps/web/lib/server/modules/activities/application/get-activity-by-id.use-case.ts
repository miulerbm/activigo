import { NotFoundError } from "../../../errors";
import { ActivityRepository } from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

export class GetActivityByIdUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(id: string): Promise<ActivityEntity> {
    const activity = await this.activityRepository.findById(id);
    if (!activity) {
      throw new NotFoundError("Actividad no encontrada");
    }
    return activity;
  }
}
