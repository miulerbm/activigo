import { SignupRepository } from "../domain/signup.repository";
import { SignupEntity } from "../domain/signup.entity";

export class ListSignupsByActivityUseCase {
  constructor(private readonly signupRepository: SignupRepository) {}

  execute(activityId: string): Promise<SignupEntity[]> {
    return this.signupRepository.findByActivityId(activityId);
  }
}
