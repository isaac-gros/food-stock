import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Batch } from '../batch/batch.entity';
import { Product } from './product.entity';

describe('ProductController', () => {
  let controller: ProductController;

  const mockService = {
    getAll: jest.fn(),
    getAllInStock: jest.fn(),
    getOne: jest.fn(),
    getAlmostExpired: jest.fn(),
    create: jest.fn(),
    delete: jest.fn()
  }

  const mockProduct = {
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
  } as Product

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

  describe('getAllInStock', () => {
    it('should return all products in stock', async () => {
      jest.spyOn(mockService, 'getAllInStock').mockResolvedValue(mockedProducts)

      expect(mockService.getAllInStock).not.toHaveBeenCalled();

      const products = await controller.getAllInStock()

      expect(mockService.getAllInStock).toHaveBeenCalled();
      expect(mockService.getAllInStock).toHaveBeenCalledWith();
      expect(products).toEqual(mockedProducts)
    });
  })

  describe('getOne', () => {
    it('should return a specific product', async () => {
      jest.spyOn(mockService, 'getOne').mockResolvedValue(mockProduct)

      expect(mockService.getOne).not.toHaveBeenCalled();

      const product = await controller.getOne(1)

      expect(mockService.getOne).toHaveBeenCalled();
      expect(mockService.getOne).toHaveBeenCalledWith(1);
      expect(product).toEqual(mockProduct)
    });
  })

  describe('getAlmostExpired', () => {
    it('should return all products almost expired', async () => {
      jest.spyOn(mockService, 'getAlmostExpired').mockResolvedValue(mockedProducts)

      expect(mockService.getAlmostExpired).not.toHaveBeenCalled();

      const products = await controller.getAlmostExpired()

      expect(mockService.getAlmostExpired).toHaveBeenCalled();
      expect(mockService.getAlmostExpired).toHaveBeenCalledWith();
      expect(products).toEqual(mockedProducts)
    });
  })

  describe('create', () => {
    it('should create a product', async () => {
      jest.spyOn(mockService, 'create').mockResolvedValue(mockProduct)

      expect(mockService.create).not.toHaveBeenCalled();

      const product = await controller.create(mockProduct)

      expect(mockService.create).toHaveBeenCalled();
      expect(mockService.create).toHaveBeenCalledWith(mockProduct);
      expect(product).toEqual(mockProduct)
    });
  })

  describe('delete', () => {
    it('should delete a products', async () => {
      jest.spyOn(mockService, 'delete').mockResolvedValue(mockProduct)

      expect(mockService.delete).not.toHaveBeenCalled();

      const products = await controller.delete(mockProduct.id)

      expect(mockService.delete).toHaveBeenCalled();
      expect(mockService.delete).toHaveBeenCalledWith(mockProduct.id);
      expect(products).toEqual(mockProduct)
    });
  })
});
