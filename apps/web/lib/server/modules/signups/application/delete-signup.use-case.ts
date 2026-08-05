import { NotFoundError } from "../../../errors";
import { SignupRepository } from "../domain/signup.repository";

export class DeleteSignupUseCase {
  constructor(private readonly signupRepository: SignupRepository) {}

  async execute(activityId: string, signupId: string): Promise<void> {
    const existing = await this.signupRepository.findById(signupId);
    if (!existing || existing.activityId !== activityId) {
      throw new NotFoundError("Inscripción no encontrada");
    }
    await this.signupRepository.delete(signupId);
  }
}
