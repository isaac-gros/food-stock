import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Batch } from '../batch/batch.entity';
import { Product } from './product.entity';

describe('ProductController', () => {
  let controller: ProductController;

  const mockService = {
    getAll: jest.fn()
  }

  const mockedProducts = [
    {
      id: 1,
      name: 'Banane',
      batchs: [
        {
          id: 1,
          category: {
            id: 1,
            name: 'Fruit'
          },
          quantity: 3
        } as Batch
      ]
    } as Product,
    {
      id: 2,
      name: 'Patate',
      batchs: []
    } as Product,
    {
      id: 3,
      name: 'Steack',
      batchs: [
        {
          id: 2,
          category:  {
            id: 2,
            name: 'Viande'
          },
          quantity: 15
        } as Batch,
        {
          id: 3,
          category:  {
            id: 2,
            name: 'Viande'
          },
          quantity: 3
        } as Batch
      ]
    } as Product
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: mockService
        }
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('getAll', () => {
    it('should return all products', async () => {
      jest.spyOn(mockService, 'getAll').mockResolvedValue(mockedProducts)

      expect(mockService.getAll).not.toHaveBeenCalled();

      const products = await controller.getAll()

      expect(mockService.getAll).toHaveBeenCalled();
      expect(mockService.getAll).toHaveBeenCalledWith();
      expect(products).toEqual(mockedProducts)
    });
  })
});
