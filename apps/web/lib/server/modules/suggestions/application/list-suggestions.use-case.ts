import { SuggestionStatus } from "@activigo/shared";
import { SuggestionRepository } from "../domain/suggestion.repository";
import { SuggestionEntity } from "../domain/suggestion.entity";

export class ListSuggestionsUseCase {
  constructor(private readonly suggestionRepository: SuggestionRepository) {}

  execute(status?: SuggestionStatus): Promise<SuggestionEntity[]> {
    return this.suggestionRepository.findMany(status);
  }
}
