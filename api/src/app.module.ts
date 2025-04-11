import { Module } from '@nestjs/common';
import { AdminCases } from './modules/admin/cases';
import { AdminDomains } from './modules/admin/domains';

@Module({
  imports: [],
  controllers: [...AdminDomains],
  providers: [...AdminCases],
})
export class AppModule {}
