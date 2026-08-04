import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  ACTIVITY_REPOSITORY,
  ActivityRepository,
} from "../../activities/domain/activity.repository";
import {
  CreateSignupData,
  SIGNUP_REPOSITORY,
  SignupRepository,
} from "../domain/signup.repository";
import { SignupEntity } from "../domain/signup.entity";

@Injectable()
export class CreateSignupUseCase {
  constructor(
    @Inject(SIGNUP_REPOSITORY)
    private readonly signupRepository: SignupRepository,
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(data: CreateSignupData): Promise<SignupEntity> {
    const activity = await this.activityRepository.findById(data.activityId);
    if (!activity) {
      throw new NotFoundException("Actividad no encontrada");
    }

    const alreadySignedUp =
      await this.signupRepository.existsByActivityIdAndName(
        data.activityId,
        data.name,
      );
    if (alreadySignedUp) {
      throw new ConflictException("Ese nombre ya está anotado en esta actividad");
    }

    return this.signupRepository.create(data);
  }
}
