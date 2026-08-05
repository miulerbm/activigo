-- DropForeignKey
ALTER TABLE "Signup" DROP CONSTRAINT "Signup_activityId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Suggestion" ADD COLUMN     "imageUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Signup" ADD CONSTRAINT "Signup_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
