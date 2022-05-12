import { Test, TestingModule } from '@nestjs/testing';
import { <%= kebabToPascal(config.name) %>Controller } from './index.controller';
import { <%= kebabToPascal(config.name) %>Service } from '../services/<%= toLower(config.name) %>.service';

describe('<%= kebabToPascal(config.name) %>Controller', () => {
  let moduleController: <%= kebabToPascal(config.name) %>Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [moduleController],
      providers: [<%= kebabToPascal(config.name) %>Service],
    }).compile();

    moduleController = app.get<<%= kebabToPascal(config.name) %>Controller>(<%= kebabToPascal(config.name) %>Controller);
  });

  describe('root', () => {
    it('should return "OK!"', () => {
      expect(moduleController.index()).toBe('OK!');
    });
  });
});
