/*
  Warnings:

  - You are about to drop the `WorkTime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."WorkTime" DROP CONSTRAINT "WorkTime_userId_fkey";

-- DropTable
DROP TABLE "public"."WorkTime";

-- CreateTable
CREATE TABLE "public"."work_times" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "seconds" INTEGER NOT NULL,

    CONSTRAINT "work_times_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "work_times_userId_date_key" ON "public"."work_times"("userId", "date");

-- AddForeignKey
ALTER TABLE "public"."work_times" ADD CONSTRAINT "work_times_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
