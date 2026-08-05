import { NotFoundError } from "../../../errors";
import {
  ActivityRepository,
  UpdateActivityData,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";

export class UpdateActivityUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(id: string, data: UpdateActivityData): Promise<ActivityEntity> {
    const existing = await this.activityRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Actividad no encontrada");
    }
    return this.activityRepository.update(id, data);
  }
}
