import { TaskRepository } from './task.repository';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/entities/user.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async findOne(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new Error(`Task has id "${id}"not found.`);
    }
    return found;
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, status } = createTaskDto;
    try {
      return this.taskRepository.createTask(title, status, user);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(filterDto: GetTaskFilterDto, user: User) {
    return this.taskRepository.findAll(filterDto, user);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    // const result = await this.taskRepository.update(id, { ...updateTaskDto });
    // console.log(result);
    const { title, status } = updateTaskDto;
    const task = await this.findOne(id, user);
    if (task) {
      task.status = status != 'undefined' ? status : task.status;
      task.title = title != 'undefined' ? title : task.title;
    }

    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: string, user: User) {
    const result = await this.taskRepository.delete({ id, user });
    // return result;
    console.log(result);
    if (result.affected > 0) {
      return `Delete task has id: ${id}`;
    } else {
      return `Delete unsuccessfully.`;
    }
  }
  async getTasksFilter(getTaskFilterDto: GetTaskFilterDto, user: User) {
    const query = await this.taskRepository.getQuery();
    const { title, status } = getTaskFilterDto;
    query.where({ user });
    query.orWhere('task.title = :title', { title: title });
    query.orWhere('task.status = :status', { status });
    const result = query.getMany();
    return result;
  }
}
