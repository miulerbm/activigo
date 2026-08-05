import { NotFoundError } from "../../../errors";
import { SuggestionRepository } from "../domain/suggestion.repository";

export class DeleteSuggestionUseCase {
  constructor(private readonly suggestionRepository: SuggestionRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.suggestionRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Sugerencia no encontrada");
    }
    await this.suggestionRepository.delete(id);
  }
}
