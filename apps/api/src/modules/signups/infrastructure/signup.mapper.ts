import { Signup } from "@prisma/client";
import { SignupEntity } from "../domain/signup.entity";

export class SignupMapper {
  static toDomain(raw: Signup): SignupEntity {
    return new SignupEntity(raw.id, raw.activityId, raw.name, raw.createdAt);
  }
}
