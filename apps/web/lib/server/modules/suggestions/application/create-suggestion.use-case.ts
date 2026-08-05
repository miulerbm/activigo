import {
  CreateSuggestionData,
  SuggestionRepository,
} from "../domain/suggestion.repository";
import { SuggestionEntity } from "../domain/suggestion.entity";

export class CreateSuggestionUseCase {
  constructor(private readonly suggestionRepository: SuggestionRepository) {}

  execute(data: CreateSuggestionData): Promise<SuggestionEntity> {
    return this.suggestionRepository.create(data);
  }
}
