import { Controller } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(public categoryService: CategoryService){}

    getAll(): Promise<Category> {
        return undefined
    }
}
