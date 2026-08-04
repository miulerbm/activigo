import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { ActivityStatus } from "@activigo/shared";
import {
  ActivityFilter,
  ActivityRepository,
  CreateActivityData,
  UpdateActivityData,
} from "../domain/activity.repository";
import { ActivityEntity } from "../domain/activity.entity";
import { ActivityMapper } from "./activity.mapper";

@Injectable()
export class PrismaActivityRepository implements ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

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
      },
      include: { signups: true },
      orderBy: { createdAt: "desc" },
    });
    return activities.map(ActivityMapper.toDomain);
  }
}
