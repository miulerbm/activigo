import { Suggestion } from "@prisma/client";
import { SuggestionEntity } from "../domain/suggestion.entity";

export class SuggestionMapper {
  static toDomain(raw: Suggestion): SuggestionEntity {
    return new SuggestionEntity(
      raw.id,
      raw.name,
      raw.description,
      raw.status as SuggestionEntity["status"],
      raw.createdAt,
    );
  }
}
