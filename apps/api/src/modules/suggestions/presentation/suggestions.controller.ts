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
import { SuggestionStatus } from "@activigo/shared";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";
import { CreateSuggestionUseCase } from "../application/create-suggestion.use-case";
import { ChangeSuggestionStatusUseCase } from "../application/change-suggestion-status.use-case";
import { ListSuggestionsUseCase } from "../application/list-suggestions.use-case";
import { CreateSuggestionDto } from "./dto/create-suggestion.dto";
import { ChangeSuggestionStatusDto } from "./dto/change-suggestion-status.dto";

@Controller("suggestions")
export class SuggestionsController {
  constructor(
    private readonly createSuggestion: CreateSuggestionUseCase,
    private readonly changeSuggestionStatus: ChangeSuggestionStatusUseCase,
    private readonly listSuggestions: ListSuggestionsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateSuggestionDto) {
    return this.createSuggestion.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Query("status") status?: SuggestionStatus) {
    return this.listSuggestions.execute(status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id/status")
  changeStatus(
    @Param("id") id: string,
    @Body() dto: ChangeSuggestionStatusDto,
  ) {
    return this.changeSuggestionStatus.execute(id, dto.status);
  }
}
