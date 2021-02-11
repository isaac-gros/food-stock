import { Body, Controller, Delete, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Batch } from './batch.entity';
import { BatchService } from './batch.service';

@Controller('/product/:productId/batch')
export class BatchController{
    constructor(private readonly batchService: BatchService){}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Param('productId') productId: number, @Body() batch: Batch): Promise<Batch> {
        return this.batchService.create(productId, batch)
    }

    @Put("/:id")
    @UsePipes(new ValidationPipe({ transform: true }))
    modify(@Param('id') id: number, @Body() batch: Batch): Promise<Batch> {
        return this.batchService.modify(id, batch)
    }

    @Delete("/:id")
    @UsePipes(new ValidationPipe({ transform: true }))
    delete(@Param('id')id: number): Promise<Batch> {
        return this.batchService.delete(id)
    }
}
