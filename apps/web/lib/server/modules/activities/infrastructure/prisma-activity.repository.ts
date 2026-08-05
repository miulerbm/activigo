import type { PrismaClient } from "@prisma/client";
import { ActivityStatus } from "@activigo/shared";
import {
  ActivityFilter,
  ActivityRepository,
  CreateActivityData,
  UpdateActivityData,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";
import { ActivityMapper } from "./activity.mapper";

export class PrismaActivityRepository implements ActivityRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateActivityData): Promise<ActivityEntity> {
    const activity = await this.prisma.activity.create({
      data,
      include: { signups: true },
    });
    return ActivityMapper.toDomain(activity);
  }

  async update(id: string, data: UpdateActivityData): Promise<ActivityEntity> {
    const activity = await this.prisma.activity.update({
      where: { id },
      data,
      include: { signups: true },
    });
    return ActivityMapper.toDomain(activity);
  }

  async changeStatus(
    id: string,
    status: ActivityStatus,
  ): Promise<ActivityEntity> {
    const activity = await this.prisma.activity.update({
      where: { id },
      data: { status },
      include: { signups: true },
    });
    return ActivityMapper.toDomain(activity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.activity.delete({ where: { id } });
  }

  async findById(id: string): Promise<ActivityEntity | null> {
    const activity = await this.prisma.activity.findUnique({
      where: { id },
      include: { signups: true },
    });
    return activity ? ActivityMapper.toDomain(activity) : null;
  }

  async findMany(filter: ActivityFilter): Promise<ActivityEntity[]> {
    const activities = await this.prisma.activity.findMany({
      where: {
        status: filter.status,
        tags: filter.tag ? { has: filter.tag } : undefined,
        featured: filter.featured,
      },
      include: { signups: true },
      orderBy: { createdAt: "desc" },
    });
    return activities.map(ActivityMapper.toDomain);
  }
}
