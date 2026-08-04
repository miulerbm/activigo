import { Inject, Injectable } from "@nestjs/common";
import {
  SIGNUP_REPOSITORY,
  SignupRepository,
} from "../domain/signup.repository";
import { SignupEntity } from "../domain/signup.entity";

@Injectable()
export class ListSignupsByActivityUseCase {
  constructor(
    @Inject(SIGNUP_REPOSITORY)
    private readonly signupRepository: SignupRepository,
  ) {}

  execute(activityId: string): Promise<SignupEntity[]> {
    return this.signupRepository.findByActivityId(activityId);
  }
}
