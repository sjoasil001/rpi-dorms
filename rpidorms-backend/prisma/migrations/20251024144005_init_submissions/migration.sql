-- CreateTable
CREATE TABLE "Submission" (
    "id" BIGSERIAL NOT NULL,
    "dorm_name" TEXT NOT NULL,
    "class_year" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "amenities" JSONB NOT NULL,
    "review" TEXT,
    "photo_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Submission_dorm_name_idx" ON "Submission"("dorm_name");

-- CreateIndex
CREATE INDEX "Submission_class_year_idx" ON "Submission"("class_year");
