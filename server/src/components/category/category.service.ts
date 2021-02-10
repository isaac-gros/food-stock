import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) public batchRepository: Repository<Category>) { }

  getAll(): Promise<Category> {
    return undefined
  }

  getOne(): Promise<Category> {
      return undefined
  }

  create(): Promise<Category> {
      return undefined
  }

  modify(): Promise<Category> {
      return undefined
  }

  delete(): Promise<Category> {
      return undefined
  }
}
