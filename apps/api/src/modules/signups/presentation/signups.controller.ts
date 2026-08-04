import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSignupUseCase } from "../application/create-signup.use-case";
import { ListSignupsByActivityUseCase } from "../application/list-signups-by-activity.use-case";
import { CreateSignupDto } from "./dto/create-signup.dto";

@Controller("activities/:activityId/signups")
export class SignupsController {
  constructor(
    private readonly createSignup: CreateSignupUseCase,
    private readonly listSignupsByActivity: ListSignupsByActivityUseCase,
  ) {}

  @Get()
  list(@Param("activityId") activityId: string) {
    return this.listSignupsByActivity.execute(activityId);
  }

  @Post()
  create(
    @Param("activityId") activityId: string,
    @Body() dto: CreateSignupDto,
  ) {
    return this.createSignup.execute({ activityId, name: dto.name });
  }
}
