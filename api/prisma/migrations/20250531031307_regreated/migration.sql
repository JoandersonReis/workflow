/*
  Warnings:

  - You are about to drop the column `role` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Machine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrinterType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceOrderStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `worktime` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Machine" DROP CONSTRAINT "Machine_companyId_fkey";

-- DropForeignKey
ALTER TABLE "PrinterType" DROP CONSTRAINT "PrinterType_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOrder" DROP CONSTRAINT "ServiceOrder_attendantId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOrder" DROP CONSTRAINT "ServiceOrder_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOrder" DROP CONSTRAINT "ServiceOrder_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOrder" DROP CONSTRAINT "ServiceOrder_printerTypeId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOrder" DROP CONSTRAINT "ServiceOrder_serviceOrderStatusId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOrderStatus" DROP CONSTRAINT "ServiceOrderStatus_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "role",
ADD COLUMN     "worktime" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Machine";

-- DropTable
DROP TABLE "PrinterType";

-- DropTable
DROP TABLE "ServiceOrder";

-- DropTable
DROP TABLE "ServiceOrderStatus";

-- DropEnum
DROP TYPE "WorkerRole";

-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
