-- CreateTable
CREATE TABLE "public"."WorkTime" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3),
    "seconds" INTEGER NOT NULL,

    CONSTRAINT "WorkTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkTime_userId_date_key" ON "public"."WorkTime"("userId", "date");

-- AddForeignKey
ALTER TABLE "public"."WorkTime" ADD CONSTRAINT "WorkTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
