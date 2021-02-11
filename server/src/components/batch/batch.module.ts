import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { BatchController } from './batch.controller';
import { Batch } from './batch.entity';
import { BatchService } from './batch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Batch]), ProductModule],
  controllers: [BatchController],
  providers: [BatchService],
  exports: [BatchService]
})
export class BatchModule {}
