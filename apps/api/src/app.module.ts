import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ActivitiesModule } from "./modules/activities/activities.module";
import { SignupsModule } from "./modules/signups/signups.module";
import { SuggestionsModule } from "./modules/suggestions/suggestions.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ActivitiesModule,
    SignupsModule,
    SuggestionsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
