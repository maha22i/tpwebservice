import { PaginatedItems } from '@library/api/core/pagination';
import { BookDto } from '@library/common/resource/book';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let controller: BookController;
  let serviceMock: Partial<BookService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController]
    })
      .useMocker(token => {
        if (token === BookService) {
          serviceMock = {
            findAll: jest.fn<Observable<PaginatedItems<BookDto>>, [number, number]>().mockReturnValue(of({
              items: [],
              count: 13
            }))
          };
          return serviceMock;
        }
      })
      .compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an Observable', () => {
      const skip = 0;
      const limit = 10;

      const result = controller.findAll({ skip, limit });

      expect(result).toBeInstanceOf(Observable);
    })
    it('should call service', done => {
      const skip = 0;
      const limit = 10;

      const result = controller.findAll({ skip, limit });

      result.subscribe(() => {
        expect(serviceMock.findAll).toBeCalledTimes(1);
        done();
      })
    })
  });
});
