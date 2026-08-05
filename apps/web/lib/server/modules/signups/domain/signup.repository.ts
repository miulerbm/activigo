import { SignupEntity } from "./signup.entity";

export interface CreateSignupData {
  activityId: string;
  name: string;
}

export interface SignupRepository {
  create(data: CreateSignupData): Promise<SignupEntity>;
  findByActivityId(activityId: string): Promise<SignupEntity[]>;
  existsByActivityIdAndName(
    activityId: string,
    name: string,
  ): Promise<boolean>;
}
