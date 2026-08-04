import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";
import { CreateActivityUseCase } from "../application/create-activity.use-case";
import { UpdateActivityUseCase } from "../application/update-activity.use-case";
import { ChangeActivityStatusUseCase } from "../application/change-activity-status.use-case";
import { ListActivitiesUseCase } from "../application/list-activities.use-case";
import { GetActivityByIdUseCase } from "../application/get-activity-by-id.use-case";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { ChangeActivityStatusDto } from "./dto/change-activity-status.dto";
import { ListActivitiesQueryDto } from "./dto/list-activities-query.dto";

@Controller("activities")
export class ActivitiesController {
  constructor(
    private readonly createActivity: CreateActivityUseCase,
    private readonly updateActivity: UpdateActivityUseCase,
    private readonly changeActivityStatus: ChangeActivityStatusUseCase,
    private readonly listActivities: ListActivitiesUseCase,
    private readonly getActivityById: GetActivityByIdUseCase,
  ) {}

  @Get()
  list(@Query() query: ListActivitiesQueryDto) {
    return this.listActivities.execute(query);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getActivityById.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateActivityDto) {
    return this.createActivity.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateActivityDto) {
    return this.updateActivity.execute(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id/status")
  changeStatus(
    @Param("id") id: string,
    @Body() dto: ChangeActivityStatusDto,
  ) {
    return this.changeActivityStatus.execute(id, dto.status);
  }
}
