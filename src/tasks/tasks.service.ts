import { TaskRepository } from './task.repository';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async findOne(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ id });

    if (!found) {
      throw new Error(`Task has id "${id}"not found.`);
    }
    return found;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, status } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      status,
    });
    await this.taskRepository.save(task);
    return task;
  }

  findAll() {
    return this.taskRepository.find();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const result = await this.taskRepository.update(id, { ...updateTaskDto });
    console.log(result);
    if (result.affected > 0) {
      return `Successfully update id: ${id}`;
    }
    return `Fail`;
  }

  async remove(id: string) {
    const result = await this.taskRepository.delete(id);
    // return result;
    if (result.affected > 0) {
      return `Delete task has id: ${id}`;
    } else {
      return `Delete unsuccessfully.`;
    }
  }
  async getTasksFilter(getTaskFilterDto: GetTaskFilterDto) {
    const query = await this.taskRepository.getQuery();
    const { title, status } = getTaskFilterDto;
    query.orWhere('task.title = :title', { title: title });
    query.orWhere('task.status = :status', {status});
    const result = query.getMany();
    return result;
  }
}
