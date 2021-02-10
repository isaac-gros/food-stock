import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Batch } from './batch.entity';

@Injectable()
export class BatchService {
    constructor(@InjectRepository(Batch) public batchRepository: Repository<Batch>){}

    getAll(): Promise<Batch> {
        return undefined
    }

    getOne(): Promise<Batch> {
        return undefined
    }

    create(): Promise<Batch> {
        return undefined
    }

    modify(): Promise<Batch> {
        return undefined
    }

    delete(): Promise<Batch> {
        return undefined
    }
}
