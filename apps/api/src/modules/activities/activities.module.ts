import { Module } from "@nestjs/common";
import { AuthModule } from "../../auth/auth.module";
import { ActivitiesController } from "./presentation/activities.controller";
import { CreateActivityUseCase } from "./application/create-activity.use-case";
import { UpdateActivityUseCase } from "./application/update-activity.use-case";
import { ChangeActivityStatusUseCase } from "./application/change-activity-status.use-case";
import { ListActivitiesUseCase } from "./application/list-activities.use-case";
import { GetActivityByIdUseCase } from "./application/get-activity-by-id.use-case";
import { ACTIVITY_REPOSITORY } from "./domain/activity.repository";
import { PrismaActivityRepository } from "./infrastructure/prisma-activity.repository";

@Module({
  imports: [AuthModule],
  controllers: [ActivitiesController],
  providers: [
    CreateActivityUseCase,
    UpdateActivityUseCase,
    ChangeActivityStatusUseCase,
    ListActivitiesUseCase,
    GetActivityByIdUseCase,
    { provide: ACTIVITY_REPOSITORY, useClass: PrismaActivityRepository },
  ],
  exports: [ACTIVITY_REPOSITORY],
})
export class ActivitiesModule {}
