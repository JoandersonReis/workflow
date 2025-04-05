import { Module } from '@nestjs/common';
import { AdminController } from './models/Admin/admin.controller';
import { AdminService } from './models/Admin/admin.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
