import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
            .orderBy('batch.expired_at', 'ASC')
            .getMany()
    }

    async getOne(id: number): Promise<Product>{
        return await this.productRepository.findOne(id)
    }

    async getAlmostExpired(): Promise<Product[]>{
        const ids = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.batchs', 'batch')
            .where('batch.expired_at < :time')
            .setParameter('time', new Date(new Date().getTime() + 259200000))
            .select('product.id')
            .getMany()

        return await this.productRepository.find({
            where: {
                id: In(ids.map(id => id.id))
            },
            relations: ['batchs']
        })
    }

    async create(product: Product): Promise<Product>{
        if (!product.name || product.name.trim() === "") throw new BadRequestException('Name need to be defined')
        if (!product.name.match(/^[A-Za-z]+$/)) throw new BadRequestException('Only a-z character are allowed')
        const retrievedProduct = await this.productRepository.findOne({
            where: {
                name: product.name.toLowerCase()
            }
        })
        if (retrievedProduct) throw new InternalServerErrorException('Already exists')
        return await this.productRepository.save({...product, name: product.name.toLowerCase()})
    }

    async delete(idProduct: number): Promise<Product>{
        return await this.productRepository.remove({ id: idProduct } as Product)
    }
}
