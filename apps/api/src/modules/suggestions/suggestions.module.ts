import { Module } from "@nestjs/common";
import { AuthModule } from "../../auth/auth.module";
import { SuggestionsController } from "./presentation/suggestions.controller";
import { CreateSuggestionUseCase } from "./application/create-suggestion.use-case";
import { ChangeSuggestionStatusUseCase } from "./application/change-suggestion-status.use-case";
import { ListSuggestionsUseCase } from "./application/list-suggestions.use-case";
import { SUGGESTION_REPOSITORY } from "./domain/suggestion.repository";
import { PrismaSuggestionRepository } from "./infrastructure/prisma-suggestion.repository";

@Module({
  imports: [AuthModule],
  controllers: [SuggestionsController],
  providers: [
    CreateSuggestionUseCase,
    ChangeSuggestionStatusUseCase,
    ListSuggestionsUseCase,
    { provide: SUGGESTION_REPOSITORY, useClass: PrismaSuggestionRepository },
  ],
})
export class SuggestionsModule {}
