import { SuggestionStatus } from "@activigo/shared";

export class SuggestionEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public status: SuggestionStatus,
    public readonly createdAt: Date,
  ) {}
}
