import { SuggestionStatus } from "@activigo/shared";
import { NotFoundError } from "../../../errors";
import { SuggestionRepository } from "../domain/suggestion.repository";
import { SuggestionEntity } from "../domain/suggestion.entity";

export class ChangeSuggestionStatusUseCase {
  constructor(private readonly suggestionRepository: SuggestionRepository) {}

  async execute(
    id: string,
    status: SuggestionStatus,
  ): Promise<SuggestionEntity> {
    const existing = await this.suggestionRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Sugerencia no encontrada");
    }
    return this.suggestionRepository.changeStatus(id, status);
  }
}
