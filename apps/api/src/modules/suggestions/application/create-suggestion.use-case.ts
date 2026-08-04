import { Inject, Injectable } from "@nestjs/common";
import {
  CreateSuggestionData,
  SUGGESTION_REPOSITORY,
  SuggestionRepository,
} from "../domain/suggestion.repository";
import { SuggestionEntity } from "../domain/suggestion.entity";

@Injectable()
export class CreateSuggestionUseCase {
  constructor(
    @Inject(SUGGESTION_REPOSITORY)
    private readonly suggestionRepository: SuggestionRepository,
  ) {}

  execute(data: CreateSuggestionData): Promise<SuggestionEntity> {
    return this.suggestionRepository.create(data);
  }
}
