import { ApiErrorCode } from '@library/common/resource/error';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { BookDocument, BookEntity } from './book.entity';
import { BookModule } from './book.module';

describe('BookResource', () => {
  let app: INestApplication;
  let mongoMemoryServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        BookModule
      ]
    }).compile();

    const model = moduleRef.get<Model<BookDocument>>(getModelToken(BookEntity.name));
    const entities = [
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 1' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 2' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 3' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 4' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 5' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 6' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 7' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 8' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 9' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 10' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 11' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 12' },
      { description: '', likeCount: 0, publicationDate: new Date(), title: 'title 13' },
    ];
    for (const entity of entities) {
      await model.create(entity);
    }

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /books', () => {
    it('should respond with data', done => {
      request(app.getHttpServer())
        .get('/books')
        .then(response => {
          expect(response.status).toBe(HttpStatus.OK);
          expect(Number.isInteger(Number(response.headers['x-total-count']))).toBeTruthy();
          expect(Array.isArray(response.body)).toBeTruthy();
        })
        .finally(done);
    });
    it('should respond with a page of data', done => {
      request(app.getHttpServer())
        .get('/books?page=1&size=5')
        .then(response => {
          expect(response).toBeDefined();
          expect(response.status).toBe(HttpStatus.OK);
          expect(Number(response.headers['x-total-count'])).toBe(13);
          expect(response.body.length).toBe(5);
          expect(response.body[0].title).toBe('title 6');
        })
        .finally(done);
    });
    it('should respond bad request with bad page', done => {
      request(app.getHttpServer())
        .get('/books?page=x&size=5')
        .then(response => {
          expect(response).toBeDefined();
          expect(response.status).toBe(HttpStatus.BAD_REQUEST);
          expect(response.headers['x-total-count']).toBeUndefined();
          expect(response.body.code).toBe(ApiErrorCode.ParamsStructureInvalid);
        })
        .finally(done);
    });
  })

})
