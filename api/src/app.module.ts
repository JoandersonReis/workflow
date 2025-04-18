import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/AdminModule';
import { AdminRepositoryModule } from './modules/admin/repositories/AdminRepositoryModule';

@Module({
  imports: [AdminModule, AdminRepositoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
