import { Controller } from '@nestjs/common';
import { Batch } from './batch.entity';
import { BatchService } from './batch.service';

@Controller('/product/:productId/batch')
export class BatchController{
    constructor(private readonly batchService: BatchService){}

    create(): Promise<Batch> {
        return this.batchService.create()
    }

    modify(): Promise<Batch> {
        return this.batchService.modify()
    }

    delete(): Promise<Batch> {
        return this.batchService.delete()
    }
}
