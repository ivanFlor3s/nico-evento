/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[preferenceId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `buyerLastName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `buyerEmail` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Combo" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "buyerLastName" TEXT NOT NULL,
ADD COLUMN     "buyerName" TEXT NOT NULL,
ADD COLUMN     "payMethod" TEXT NOT NULL,
ADD COLUMN     "paymentId" BIGINT,
ADD COLUMN     "preferenceId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "buyerEmail" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."LandingOffer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comboId" TEXT NOT NULL,

    CONSTRAINT "LandingOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandingOffer_comboId_key" ON "public"."LandingOffer"("comboId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "public"."Order"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_preferenceId_key" ON "public"."Order"("preferenceId");

-- AddForeignKey
ALTER TABLE "public"."LandingOffer" ADD CONSTRAINT "LandingOffer_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "public"."Combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
