import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SuggestionStatus } from "@activigo/shared";
import {
  SUGGESTION_REPOSITORY,
  SuggestionRepository,
} from "../domain/suggestion.repository";
import { SuggestionEntity } from "../domain/suggestion.entity";

@Injectable()
export class ChangeSuggestionStatusUseCase {
  constructor(
    @Inject(SUGGESTION_REPOSITORY)
    private readonly suggestionRepository: SuggestionRepository,
  ) {}

  async execute(
    id: string,
    status: SuggestionStatus,
  ): Promise<SuggestionEntity> {
    const existing = await this.suggestionRepository.findById(id);
    if (!existing) {
      throw new NotFoundException("Sugerencia no encontrada");
    }
    return this.suggestionRepository.changeStatus(id, status);
  }
}
