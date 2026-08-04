import { Module } from "@nestjs/common";
import { ActivitiesModule } from "../activities/activities.module";
import { SignupsController } from "./presentation/signups.controller";
import { CreateSignupUseCase } from "./application/create-signup.use-case";
import { ListSignupsByActivityUseCase } from "./application/list-signups-by-activity.use-case";
import { SIGNUP_REPOSITORY } from "./domain/signup.repository";
import { PrismaSignupRepository } from "./infrastructure/prisma-signup.repository";

@Module({
  imports: [ActivitiesModule],
  controllers: [SignupsController],
  providers: [
    CreateSignupUseCase,
    ListSignupsByActivityUseCase,
    { provide: SIGNUP_REPOSITORY, useClass: PrismaSignupRepository },
  ],
})
export class SignupsModule {}
