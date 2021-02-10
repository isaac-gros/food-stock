import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Batch } from '../batch/batch.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  const mockRepository = {
    find: jest.fn()
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
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getAll', () => {
    it('should return all products', () => {
      jest.spyOn(mockRepository, 'find').mockResolvedValue(mockedProducts)

      expect(mockRepository.find).not.toHaveBeenCalled();

      const products = service.getAll()

      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['batchs']
      });
      expect(products).toEqual(mockedProducts)
    });
  })
});
