-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "balance" BIGINT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);
