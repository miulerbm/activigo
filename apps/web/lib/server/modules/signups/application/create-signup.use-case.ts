import { ConflictError, NotFoundError } from "../../../errors";
import { ActivityRepository } from "../../activities/domain/activity.repository";
import {
  CreateSignupData,
  SignupRepository,
} from "../domain/signup.repository";
import { SignupEntity } from "../domain/signup.entity";

export class CreateSignupUseCase {
  constructor(
    private readonly signupRepository: SignupRepository,
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(data: CreateSignupData): Promise<SignupEntity> {
    const activity = await this.activityRepository.findById(data.activityId);
    if (!activity) {
      throw new NotFoundError("Actividad no encontrada");
    }

    const alreadySignedUp =
      await this.signupRepository.existsByActivityIdAndName(
        data.activityId,
        data.name,
      );
    if (alreadySignedUp) {
      throw new ConflictError("Ese nombre ya está anotado en esta actividad");
    }

    return this.signupRepository.create(data);
  }
}
