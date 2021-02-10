import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    getAll(): Promise<Product[]>{
        return undefined
    }

    getAllInStock(): Promise<Product[]>{
        return undefined
    }

    getOne(): Promise<Product>{
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
