import { Inject, Injectable } from "@nestjs/common";
import { SuggestionStatus } from "@activigo/shared";
import {
  SUGGESTION_REPOSITORY,
  SuggestionRepository,
} from "../domain/suggestion.repository";
import { SuggestionEntity } from "../domain/suggestion.entity";

@Injectable()
export class ListSuggestionsUseCase {
  constructor(
    @Inject(SUGGESTION_REPOSITORY)
    private readonly suggestionRepository: SuggestionRepository,
  ) {}

  execute(status?: SuggestionStatus): Promise<SuggestionEntity[]> {
    return this.suggestionRepository.findMany(status);
  }
}
