import { SuggestionStatus } from "@activigo/shared";
import { SuggestionEntity } from "./suggestion.entity";

export interface CreateSuggestionData {
  name: string;
  description: string;
}

export interface SuggestionRepository {
  create(data: CreateSuggestionData): Promise<SuggestionEntity>;
  changeStatus(
    id: string,
    status: SuggestionStatus,
  ): Promise<SuggestionEntity>;
  findById(id: string): Promise<SuggestionEntity | null>;
  findMany(status?: SuggestionStatus): Promise<SuggestionEntity[]>;
}
