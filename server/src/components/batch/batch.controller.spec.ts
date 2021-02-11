import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BatchController } from './batch.controller';
import { Batch } from './batch.entity';
import { BatchService } from './batch.service';

describe('BatchController', () => {
  let controller: BatchController;

  const mockRepository = {
    find: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchService,
        {
          provide: getRepositoryToken(Batch),
          useValue: mockRepository
        }
      ],
      controllers: [BatchController],
    }).compile();

    controller = module.get<BatchController>(BatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
