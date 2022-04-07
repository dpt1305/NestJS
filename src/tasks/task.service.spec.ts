import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UserDto } from './../auth/dto/user.dto';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
// import { Task } from '../tasks/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../auth/entities/user.entity';

const mockTasksRepository = () => ({
  findAll: jest.fn(),
  update: jest.fn(),
});
// console.log(mockTasksRepository.findAll());
// const mockTask = {
//   id: 'idOfTask',
//   title: 'ABC',
//   status: 'NEW',
// };
const mockTask = new GetTaskFilterDto();
// mockTask.id = 'idOfTask';
mockTask.title = 'abc';
mockTask.status = 'NEW';

const mockUser = new User();

mockUser.id = 'bc8ecd6c-4b48-4376-9c46-ce087aaed8aa';
mockUser.username = 'user2';
mockUser.password = 'Qwerty_09';
mockUser.tasks = [];

describe('TaskService', () => {
  let tasksService: TasksService;
  let taskRepository: TaskRepository;
  let tasksController: TasksController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
      // controllers: [TasksController],
      // imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
    }).compile();
    // tasksController = module.get(TasksController);
    tasksService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });
  // describe('findAll', () => {
  //   it('should return an array of tasks belongs to this user', async () => {
  //     tasksController.findAll(null, mockUser);
  //     // const result = await tasksService.findAll(null, mockUser);
  //     // expect(result).toEqual({});
  //     expect(tasksService).toHaveBeenCalled();
  //   });
  // });
  // describe('tasksService', () => {
  //   it('tasksService should be call', () => {
  //     expect(tasksService).toHaveBeenCalled();
  //     // expect(spyService.getGpa(firstName, secondName)).toBe(4.5);
  //   });
  // });
  // console.log(taskRepository);
  describe('tasksRepository', () => {
    it('tasksRepository should return array of tasks', async () => {
      const result = await taskRepository
        .findAll(null, mockUser)
        .mockResolveValue('someValue');
      console.log(result);

      // expect(taskRepository.findAll(null, mockUser)).toBe([]);
      // console.log(taskRepository);
      // taskRepository.findAll(null, null).mockResolvedValue('someValue');
    });
  });
});
