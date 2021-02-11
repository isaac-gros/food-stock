import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Batch } from './batch.entity';

@Injectable()
export class BatchService {
    constructor(@InjectRepository(Batch) public batchRepository: Repository<Batch>){}

    async getAll(): Promise<Batch[]> {
        return await this.batchRepository.find({
            order: {
                expired_at: 'ASC'
            }
        })
    }

    async getOne(id: number): Promise<Batch> {
        return await this.batchRepository.findOne(id)
    }

    async create(productId: number, batch: Batch): Promise<Batch> {
        if (batch.quantity < 0) throw new BadRequestException('Quantity not valid')
        return await this.batchRepository.save({ ...batch, product: {id: productId}})
    }

    async modify(id: number, batch: Batch): Promise<Batch> {
        if (batch.quantity < 0) throw new BadRequestException('Quantity not valid')
        await this.batchRepository.findOneOrFail(id)
        return await this.batchRepository.save({ id, ...batch})
    }

    async delete(id: number): Promise<Batch> {
        await this.batchRepository.findOneOrFail(id)
        return await this.batchRepository.remove({ id } as Batch)
    }
}
