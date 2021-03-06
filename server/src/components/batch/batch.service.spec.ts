import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Batch } from './batch.entity';
import { BatchService } from './batch.service';

describe('BatchService', () => {
  let service: BatchService;

  const mockRepository = {
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  }

  const mockBatch =   {
    id: 1,
    category: {
      id: 1,
      name: 'Fruit'
    },
    product: {
      id: 1
    },
    quantity: 3
  } as Batch

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchService,
        {
          provide: getRepositoryToken(Batch),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<BatchService>(BatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all batchs', async () => {
      jest.spyOn(mockRepository, 'find').mockResolvedValue([
        {
          id: 1,
          category: {
            id: 1,
            name: 'Fruit'
          },
          product: {
            id: 1
          },
          expired_at: new Date("2021-02-14T10:22:19.727910"),
          quantity: 3
        } as Batch,
        {
          id: 2,
          category:  {
            id: 2,
            name: 'Viande'
          },
          product: {
            id: 2
          },
          expired_at: new Date("2021-02-12T10:22:19.727910"),
          quantity: 15
        } as Batch,
        {
          id: 3,
          category:  {
            id: 2,
            name: 'Viande'
          },
          product: {
            id: 2
          },
          expired_at: new Date("2021-02-13T10:22:19.727910"),
          quantity: 3
        } as Batch
      ])

      expect(mockRepository.find).not.toHaveBeenCalled();

      const batchs = await service.getAll()

      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: {
            expired_at: 'ASC'
        }
    });

      expect(batchs).toHaveLength(3)
      expect(batchs[0].id).toEqual(1)
      expect(batchs[1].id).toEqual(2)
      expect(batchs[2].id).toEqual(3)
    });
  })

  describe('getOne', () => {
    it('should return one batch', async () => {
      jest.spyOn(mockRepository, 'findOne').mockReturnValue(mockBatch)

      expect(mockRepository.findOne).not.toHaveBeenCalled();

      const batch = await service.getOne(3)

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.findOne).toHaveBeenCalledWith(3);

      expect(batch).toEqual(mockBatch)
    });

    it('should return nothing', async () => {
      jest.spyOn(mockRepository, 'findOne').mockReturnValue([])

      expect(mockRepository.findOne).not.toHaveBeenCalled();

      const batch = await service.getOne(7)

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.findOne).toHaveBeenCalledWith(7);

      expect(batch).toEqual([])
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })

  describe('create', () => {
    it('should create a batch', async () => {
      jest.spyOn(mockRepository, 'save').mockReturnValue({ product: {id: 1}, ...mockBatch })

      expect(mockRepository.save).not.toHaveBeenCalled();

      const batch = await service.create(1, mockBatch)

      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith({ product: {id: 1}, ...mockBatch });

      expect(batch).toEqual({ product: {id: 1}, ...mockBatch })
    });

    it('should fail creating a batch with unvalid quantity', async () => {
      const batchWithWrongQuantity = {
        category: {
          id: 1,
          name: 'Fruit'
        },
        product: {
          id: 1
        },
        quantity: -2
      } as Batch
      jest.spyOn(mockRepository, 'save').mockReturnValue(batchWithWrongQuantity)

      expect(mockRepository.save).not.toHaveBeenCalled();

      let batch
      try {
        batch = await service.create(1, batchWithWrongQuantity)
      }catch(err){
        expect(err.response.message).toEqual('Quantity not valid');
        expect(mockRepository.save).not.toHaveBeenCalled();
  
        expect(batch).not.toBeDefined()
      }
    });

    it('should fail creating a batch with expriration in past', async () => {
      const batchWithWrongExpiration = {
        category: {
          id: 1,
          name: 'Fruit'
        },
        product: {
          id: 1
        },
        quantity: 4,
        expired_at: new Date("2020-02-11T13:53:07.825012")
      } as Batch
      jest.spyOn(mockRepository, 'save').mockReturnValue(batchWithWrongExpiration)

      expect(mockRepository.save).not.toHaveBeenCalled();

      let batch
      try {
        batch = await service.create(1, batchWithWrongExpiration)
      }catch(err){
        expect(err.response.message).toEqual('Expiration need to be in future');
        expect(mockRepository.save).not.toHaveBeenCalled();
  
        expect(batch).not.toBeDefined()
      }
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })

  describe('modify', () => {
    const mockModifyBatch =   {
      category: {
        id: 1,
        name: 'Fruit'
      },
      product: {
        id: 1
      },
      quantity: 3
    } as Batch

    
    it('should update a batch', async () => {
      jest.spyOn(mockRepository, 'save').mockReturnValue(mockModifyBatch)
      jest.spyOn(mockRepository, 'findOneOrFail').mockReturnValue(mockModifyBatch)

      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockRepository.findOneOrFail).not.toHaveBeenCalled();

      const batch = await service.modify(1, mockModifyBatch)

      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith({ id: 1, ...mockModifyBatch});
      expect(mockRepository.findOneOrFail).toHaveBeenCalled();
      expect(mockRepository.findOneOrFail).toHaveBeenCalledWith(1);

      expect(batch).toEqual(mockModifyBatch)
    });

    it('should fail updating a batch because of unauthorized quantity', async () => {
      jest.spyOn(mockRepository, 'save').mockReturnValue({ ...mockModifyBatch, quantity: -4})
      jest.spyOn(mockRepository, 'findOneOrFail').mockReturnValue({ ...mockModifyBatch, quantity: -4})

      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockRepository.findOneOrFail).not.toHaveBeenCalled();

      let batch
      try {
        batch = await service.modify(1, { ...mockModifyBatch, quantity: -4})
      }catch(err){
        expect(err.response.message).toEqual('Quantity not valid');
        expect(mockRepository.save).not.toHaveBeenCalled();
        expect(mockRepository.findOneOrFail).not.toHaveBeenCalled();
  
        expect(batch).not.toBeDefined()
      }
    });

    it('should fail updating a batch because of not existing', async () => {
      jest.spyOn(mockRepository, 'save').mockReturnValue(mockModifyBatch)
      jest.spyOn(mockRepository, 'findOneOrFail').mockReturnValue(undefined)

      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockRepository.findOneOrFail).not.toHaveBeenCalled();

      let batch
      try {
        batch = await service.modify(1, mockModifyBatch)
      }catch(err){
        expect(mockRepository.save).not.toHaveBeenCalled();
        expect(mockRepository.findOneOrFail).toHaveBeenCalled();
        expect(mockRepository.findOneOrFail).toHaveBeenCalledWith(1);
  
        expect(batch).not.toBeDefined()
      }
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })

  describe('delete', () => {
    it('should delete a batch', async () => {
      jest.spyOn(mockRepository, 'remove').mockReturnValue(mockBatch)
      jest.spyOn(mockRepository, 'findOneOrFail').mockReturnValue(mockBatch)

      expect(mockRepository.remove).not.toHaveBeenCalled();
      expect(mockRepository.findOneOrFail).not.toHaveBeenCalled();

      const batch = await service.delete(1)

      expect(mockRepository.remove).toHaveBeenCalled();
      expect(mockRepository.remove).toHaveBeenCalledWith({ id:1 });
      expect(mockRepository.findOneOrFail).toHaveBeenCalled();
      expect(mockRepository.findOneOrFail).toHaveBeenCalledWith(1);

      expect(batch).toEqual(mockBatch)
    });

    it('should fail deleting a non existing batch', async () => {
      jest.spyOn(mockRepository, 'remove').mockReturnValue(mockBatch)
      jest.spyOn(mockRepository, 'findOneOrFail').mockReturnValue(undefined)

      expect(mockRepository.remove).not.toHaveBeenCalled();
      expect(mockRepository.findOneOrFail).not.toHaveBeenCalled();

      let batch
      try {
        batch = await service.delete(1)
      }catch(err){
        expect(mockRepository.save).not.toHaveBeenCalled();
        expect(mockRepository.findOneOrFail).toHaveBeenCalled();
        expect(mockRepository.findOneOrFail).toHaveBeenCalledWith(1);
  
        expect(batch).not.toBeDefined()
      }
    });

    beforeEach(() => {
      jest.clearAllMocks()
    })
  })
});
