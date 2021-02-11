import { Controller } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    getAll(): Promise<Product[]> {
        return this.productService.getAll()
    }

    getAllInStock(): Promise<Product[]> {
        return this.productService.getAllInStock()
    }

    getOne(id: number): Promise<Product> {
        return this.productService.getOne(id)
    }

    getAlmostExpired(): Promise<Product[]> {
        return this.productService.getAlmostExpired()
    }

    create(product: Product): Promise<Product> {
        return this.productService.create(product)
    }

    delete(idProduct: number): Promise<Product> {
        return this.productService.delete(idProduct)
    }
}
