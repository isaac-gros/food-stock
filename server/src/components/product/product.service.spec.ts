import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Batch } from '../batch/batch.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
    save: jest.fn(),
    remove: jest.fn()
  }

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn(),
    where: jest.fn(),
    getMany: jest.fn(),
    select: jest.fn(),
    setParameter: jest.fn()
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getAll', () => {
    it('should return all products', async () => {
      jest.spyOn(mockRepository, 'find').mockResolvedValue(mockedProducts)

      expect(mockRepository.find).not.toHaveBeenCalled();

      const products = await service.getAll()

      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['batchs']
      });
      expect(products).toEqual(mockedProducts)
    });
  })

  describe('getAllInStock', () => {
    it('should return all products with stock', async () => {
      jest.spyOn(mockRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder)
      jest.spyOn(mockQueryBuilder, 'leftJoinAndSelect').mockReturnThis()
      jest.spyOn(mockQueryBuilder, 'where').mockReturnThis()
      jest.spyOn(mockQueryBuilder, 'getMany').mockResolvedValue(
        mockedProducts.filter(product => product.batchs.length > 0)
        )

      expect(mockRepository.createQueryBuilder().getMany).not.toHaveBeenCalled();

      const products = await service.getAllInStock()

      expect(mockRepository.createQueryBuilder().leftJoinAndSelect).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().where).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().where).toHaveBeenCalledWith('batch.id IS NOT NULL');
      expect(mockRepository.createQueryBuilder().getMany).toHaveBeenCalled();

      expect(products).toEqual(mockedProducts.filter(product => product.batchs.length > 0))
    });

    it('should return nothing', async () => {
      jest.spyOn(mockRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder)
      jest.spyOn(mockQueryBuilder, 'leftJoinAndSelect').mockReturnThis()
      jest.spyOn(mockQueryBuilder, 'where').mockReturnThis()
      jest.spyOn(mockQueryBuilder, 'getMany').mockResolvedValue([])

      expect(mockRepository.createQueryBuilder().getMany).not.toHaveBeenCalled();

      const products = await service.getAllInStock()

      expect(mockRepository.createQueryBuilder().leftJoinAndSelect).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().where).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().where).toHaveBeenCalledWith('batch.id IS NOT NULL');
      expect(mockRepository.createQueryBuilder().getMany).toHaveBeenCalled();

      expect(products).toHaveLength(0)
      expect(products).toEqual([])
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })

  describe('getOne', () => {
    

    it('should return one product', async () => {
      jest.spyOn(mockRepository, 'findOne').mockReturnValue(mockProduct)

      expect(mockRepository.findOne).not.toHaveBeenCalled();

      const product = await service.getOne(3)

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.findOne).toHaveBeenCalledWith(3);

      expect(product).toEqual(mockProduct)
    });

    it('should return nothing', async () => {
      jest.spyOn(mockRepository, 'findOne').mockReturnValue([])

      expect(mockRepository.findOne).not.toHaveBeenCalled();

      const product = await service.getOne(7)

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.findOne).toHaveBeenCalledWith(7);

      expect(product).toEqual([])
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })

  describe('getAlmostExpired', () => {
    const mockProductExpired = [{
      id: 1,
      name: 'Banane',
      batchs: [
        {
          id: 1,
          expired_at: new Date().getTime() - 6000,
          category: {
            id: 1,
            name: 'Fruit'
          },
          quantity: 3
        } as unknown as Batch
      ]
    } as Product,
    {
      id: 2,
      name: 'Steak',
      batchs: [
        {
          id: 2,
          expired_at: new Date().getTime() - 17000,
          category: {
            id: 2,
            name: 'Viande'
          },
          quantity: 12
        } as unknown as Batch
      ]
    } as Product]

    it('should return products where the expiration date is under 3 days from now', async () => {
      jest.spyOn(mockRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder)
      jest.spyOn(mockQueryBuilder, 'leftJoinAndSelect').mockReturnThis()
      jest.spyOn(mockQueryBuilder, 'setParameter').mockReturnThis()
      jest.spyOn(mockQueryBuilder, 'select').mockReturnThis()
      jest.spyOn(mockQueryBuilder, 'where').mockReturnThis()
      jest.spyOn(mockQueryBuilder, 'getMany').mockResolvedValue([])
      jest.spyOn(mockRepository, 'find').mockResolvedValue(mockProductExpired)

      expect(mockRepository.createQueryBuilder().getMany).not.toHaveBeenCalled();
      expect(mockRepository.find).not.toHaveBeenCalled();

      const products = await service.getAlmostExpired()

      expect(mockRepository.createQueryBuilder().leftJoinAndSelect).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().where).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder().where).toHaveBeenCalledWith('batch.expired_at < :time');
      expect(mockRepository.createQueryBuilder().getMany).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalled();

      expect(products).toEqual(mockProductExpired)
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })

  describe('create', () => {
    it('should create a product', async () => {
      jest.spyOn(mockRepository, 'save').mockReturnValue(mockProduct)

      expect(mockRepository.save).not.toHaveBeenCalled();

      const product = await service.create(mockProduct)

      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith(mockProduct);

      expect(product).toEqual(mockProduct)
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })

  describe('delete', () => {
    it('should delete a product', async () => {
      jest.spyOn(mockRepository, 'remove').mockReturnValue(mockProduct)

      expect(mockRepository.remove).not.toHaveBeenCalled();

      const product = await service.delete(mockProduct.id)

      expect(mockRepository.remove).toHaveBeenCalled();
      expect(mockRepository.remove).toHaveBeenCalledWith({ id: mockProduct.id });

      expect(product).toEqual(mockProduct)
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })
});
