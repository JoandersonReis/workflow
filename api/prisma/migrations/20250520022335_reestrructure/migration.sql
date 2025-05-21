/*
  Warnings:

  - You are about to drop the `menus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnpj` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompanyCategory" AS ENUM ('FOOD', 'TECNOLOGY', 'ADVOCACY', 'MEDICINE', 'SECURITY', 'OTHER');

-- CreateEnum
CREATE TYPE "ScheduleDay" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- CreateEnum
CREATE TYPE "CompanyPlan" AS ENUM ('INITIAL', 'PREMIUM');

-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_company_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_company_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_menu_id_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "category" "CompanyCategory" NOT NULL,
ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "location_latitude" TEXT,
ADD COLUMN     "location_longitude" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "plan" "CompanyPlan" NOT NULL DEFAULT 'INITIAL';

-- DropTable
DROP TABLE "menus";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "workers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpf" TEXT NOT NULL,
    "job" TEXT NOT NULL,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "day" "ScheduleDay" NOT NULL,
    "work_start" TIMESTAMP(3) NOT NULL,
    "work_end" TIMESTAMP(3) NOT NULL,
    "free_time" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkerSchedule" (
    "id" TEXT NOT NULL,
    "worker_id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,

    CONSTRAINT "WorkerSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "location_latitude" TEXT NOT NULL,
    "location_longitude" TEXT NOT NULL,

    CONSTRAINT "points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workers_email_key" ON "workers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workers_cpf_key" ON "workers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- AddForeignKey
ALTER TABLE "WorkerSchedule" ADD CONSTRAINT "WorkerSchedule_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerSchedule" ADD CONSTRAINT "WorkerSchedule_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
