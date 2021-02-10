import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) public productRepository: Repository<Product>){}

    async getAll(): Promise<Product[]>{
        return await this.productRepository.find({
            relations: ['batchs']
          })
    }

    async getAllInStock(): Promise<Product[]>{
        return await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.batchs', 'batch')
            .where('batch.id IS NOT NULL')
            .getMany()
    }

    getOne(id: number): Promise<Product>{
        return undefined
    }

    getAlmostExpired(): Promise<Product[]>{
        return undefined
    }

    create(): Promise<Product>{
        return undefined
    }

    delete(): Promise<Product>{
        return undefined
    }
}
