import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

    async getOne(id: number): Promise<Product>{
        return await this.productRepository.findOne(id)
    }

    async getAlmostExpired(): Promise<Product[]>{
        const ids = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.batchs', 'batch')
            .where('batch.expired_at < :time')
            .setParameter('time', new Date().getTime() + 259200000)
            .select('product.id')
            .getMany()

        return await this.productRepository.find({
            where: {
                id: In(ids)
            },
            relations: ['batchs']
        })
    }

    create(): Promise<Product>{
        return undefined
    }

    delete(): Promise<Product>{
        return undefined
    }
}
