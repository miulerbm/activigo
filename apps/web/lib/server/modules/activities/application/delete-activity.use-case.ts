import { NotFoundError } from "../../../errors";
import { ActivityRepository } from "../domain/activity.repository";

export class DeleteActivityUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.activityRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Actividad no encontrada");
    }
    await this.activityRepository.delete(id);
  }
}
