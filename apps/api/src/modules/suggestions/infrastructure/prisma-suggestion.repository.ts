import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { SuggestionStatus } from "@activigo/shared";
import {
  CreateSuggestionData,
  SuggestionRepository,
} from "../domain/suggestion.repository";
import { SuggestionEntity } from "../domain/suggestion.entity";
import { SuggestionMapper } from "./suggestion.mapper";

@Injectable()
export class PrismaSuggestionRepository implements SuggestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSuggestionData): Promise<SuggestionEntity> {
    const suggestion = await this.prisma.suggestion.create({ data });
    return SuggestionMapper.toDomain(suggestion);
  }

  async changeStatus(
    id: string,
    status: SuggestionStatus,
  ): Promise<SuggestionEntity> {
    const suggestion = await this.prisma.suggestion.update({
      where: { id },
      data: { status },
    });
    return SuggestionMapper.toDomain(suggestion);
  }

  async findById(id: string): Promise<SuggestionEntity | null> {
    const suggestion = await this.prisma.suggestion.findUnique({
      where: { id },
    });
    return suggestion ? SuggestionMapper.toDomain(suggestion) : null;
  }

  async findMany(status?: SuggestionStatus): Promise<SuggestionEntity[]> {
    const suggestions = await this.prisma.suggestion.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
    });
    return suggestions.map(SuggestionMapper.toDomain);
  }
}
