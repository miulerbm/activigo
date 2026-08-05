import type { PrismaClient } from "@prisma/client";
import {
  CreateSignupData,
  SignupRepository,
} from "../domain/signup.repository";
import { SignupEntity } from "../domain/signup.entity";
import { SignupMapper } from "./signup.mapper";

export class PrismaSignupRepository implements SignupRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateSignupData): Promise<SignupEntity> {
    const signup = await this.prisma.signup.create({ data });
    return SignupMapper.toDomain(signup);
  }

  async findById(id: string): Promise<SignupEntity | null> {
    const signup = await this.prisma.signup.findUnique({ where: { id } });
    return signup ? SignupMapper.toDomain(signup) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.signup.delete({ where: { id } });
  }

  async findByActivityId(activityId: string): Promise<SignupEntity[]> {
    const signups = await this.prisma.signup.findMany({
      where: { activityId },
      orderBy: { createdAt: "asc" },
    });
    return signups.map(SignupMapper.toDomain);
  }

  async existsByActivityIdAndName(
    activityId: string,
    name: string,
  ): Promise<boolean> {
    const count = await this.prisma.signup.count({
      where: {
        activityId,
        name: { equals: name, mode: "insensitive" },
      },
    });
    return count > 0;
  }
}
