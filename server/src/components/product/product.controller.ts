import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get()
    getAll(): Promise<Product[]> {
        return this.productService.getAll()
    }

    @Get('/inStock')
    getAllInStock(): Promise<Product[]> {
        return this.productService.getAllInStock()
    }

    
    @Get('/almostExpired')
    getAlmostExpired(): Promise<Product[]> {
        return this.productService.getAlmostExpired()
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @Get('/:id')
    getOne(@Param('id') id: number): Promise<Product> {
        return this.productService.getOne(id)
    }

    @Post()
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product)
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @Delete('/:id')
    delete(@Param('id') idProduct: number): Promise<Product> {
        return this.productService.delete(idProduct)
    }
}
