import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BatchController } from './batch.controller';
import { Batch } from './batch.entity';
import { BatchService } from './batch.service';

describe('BatchController', () => {
  let controller: BatchController;

  const mockService = {
    create: jest.fn(),
    modify: jest.fn(),
    delete: jest.fn()
  }

  const mockBatch =   {
    id: 1,
    category: {
      id: 1,
      name: 'Fruit'
    },
    batch: {
      id: 1
    },
    quantity: 3
  } as unknown as Batch

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BatchService,
          useValue: mockService
        }
      ],
      controllers: [BatchController],
    }).compile();

    controller = module.get<BatchController>(BatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a batch', async () => {
      jest.spyOn(mockService, 'create').mockResolvedValue(mockBatch)

      expect(mockService.create).not.toHaveBeenCalled();

      const batch = await controller.create(mockBatch)

      expect(mockService.create).toHaveBeenCalled();
      expect(mockService.create).toHaveBeenCalledWith(mockBatch);
      expect(batch).toEqual(mockBatch)
    });
  })

  describe('modify', () => {
    it('should modify a batch', async () => {
      jest.spyOn(mockService, 'modify').mockResolvedValue(mockBatch)

      expect(mockService.modify).not.toHaveBeenCalled();

      const batch = await controller.modify(1, mockBatch)

      expect(mockService.modify).toHaveBeenCalled();
      expect(mockService.modify).toHaveBeenCalledWith(1, mockBatch);
      expect(batch).toEqual(mockBatch)
    });
  })

  describe('delete', () => {
    it('should delete a batch', async () => {
      jest.spyOn(mockService, 'delete').mockResolvedValue(mockBatch)

      expect(mockService.delete).not.toHaveBeenCalled();

      const batch = await controller.delete(2)

      expect(mockService.delete).toHaveBeenCalled();
      expect(mockService.delete).toHaveBeenCalledWith(2);
      expect(batch).toEqual(mockBatch)
    });
  })
});
