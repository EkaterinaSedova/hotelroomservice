import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    createUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    updateUsername: jest.fn((dto) => {
      return {
        message: 'Successfully updated',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = {
      login: 'user',
      password: 'password',
      isAdmin: true,
      name: 'Name',
    };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockUserService.createUser).toHaveBeenCalled();
  });

  it('should update a user name', () => {
    const dto = {
      id: 1,
      name: 'Qwerty',
    };

    expect(controller.updateUser(dto)).toEqual({
      message: 'Successfully updated',
    });
    expect(mockUserService.updateUsername).toHaveBeenCalled();
  });
});
