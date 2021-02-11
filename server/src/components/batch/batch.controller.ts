import { Controller, Delete, Post, Put } from '@nestjs/common';
import { Batch } from './batch.entity';
import { BatchService } from './batch.service';

@Controller('/product/:productId/batch')
export class BatchController{
    constructor(private readonly batchService: BatchService){}

    @Post()
    create(batch: Batch): Promise<Batch> {
        return this.batchService.create(batch)
    }

    @Put()
    modify(id: number, batch: Batch): Promise<Batch> {
        return this.batchService.modify(id, batch)
    }

    @Delete()
    delete(id: number): Promise<Batch> {
        return this.batchService.delete(id)
    }
}
