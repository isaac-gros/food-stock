import { Controller } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    getAll(): Promise<Product[]> {
        return this.productService.getAll()
    }

    getAllInStock(): Promise<Product[]> {
        return this.productService.getAllInStock()
    }

    getOne(): Promise<Product> {
        return this.productService.getOne()
    }

    getAlmostExpired(): Promise<Product[]> {
        return this.productService.getAlmostExpired()
    }

    create(): Promise<Product> {
        return this.productService.create()
    }

    delete(): Promise<Product> {
        return this.productService.delete()
    }
}
