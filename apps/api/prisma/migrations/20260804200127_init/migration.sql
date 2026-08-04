-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('PUEDE_SER', 'NIKA_Y_SI_SI', 'GO_DE_UNA', 'CANCELADO');

-- CreateEnum
CREATE TYPE "ActivityTag" AS ENUM ('AL_AIRE_LIBRE', 'FITNESS', 'EN_LA_CIUDAD', 'FUERA_DE_LA_CIUDAD');

-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('PENDIENTE', 'APROBADA', 'DESCARTADA');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActivityStatus" NOT NULL DEFAULT 'PUEDE_SER',
    "tags" "ActivityTag"[],
    "location" TEXT,
    "date" TIMESTAMP(3),
    "signupDeadline" TIMESTAMP(3),
    "maxCapacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signup" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Signup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "SuggestionStatus" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Signup_activityId_idx" ON "Signup"("activityId");

-- AddForeignKey
ALTER TABLE "Signup" ADD CONSTRAINT "Signup_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
