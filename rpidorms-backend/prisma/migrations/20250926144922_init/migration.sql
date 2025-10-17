-- CreateTable
CREATE TABLE "public"."Dorm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dorm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Amenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" TEXT NOT NULL,
    "dormId" TEXT NOT NULL,
    "classYear" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "photoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubmissionAmenity" (
    "submissionId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL,

    CONSTRAINT "SubmissionAmenity_pkey" PRIMARY KEY ("submissionId","amenityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dorm_name_key" ON "public"."Dorm"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dorm_slug_key" ON "public"."Dorm"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "public"."Amenity"("name");

-- CreateIndex
CREATE INDEX "Submission_dormId_idx" ON "public"."Submission"("dormId");

-- CreateIndex
CREATE INDEX "Submission_rating_idx" ON "public"."Submission"("rating");

-- CreateIndex
CREATE INDEX "Submission_classYear_idx" ON "public"."Submission"("classYear");

-- CreateIndex
CREATE INDEX "Submission_updatedAt_idx" ON "public"."Submission"("updatedAt");

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_dormId_fkey" FOREIGN KEY ("dormId") REFERENCES "public"."Dorm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubmissionAmenity" ADD CONSTRAINT "SubmissionAmenity_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "public"."Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubmissionAmenity" ADD CONSTRAINT "SubmissionAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "public"."Amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
