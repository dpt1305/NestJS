import { Repository, EntityRepository } from 'typeorm';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { User } from '../auth/entities/user.entity';
import { GetTaskFilterDto } from '../tasks/dto/get-task-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(title: string, status: string, user: User): Promise<Task> {
    const task = await this.create({
      id: uuid(),
      title: title,
      status: status,
      user,
    });
    // await this.create(task);
    await this.save(task);
    return task;
  }
  async getQuery() {
    const query = await this.createQueryBuilder('task');
    return query;
  }
  async findAll(filterDto: GetTaskFilterDto, user: User) {
    const { title, status } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (title) {
      query.andWhere('task.title = :title', { title });
    }

    // if (search) {
    //   query.andWhere(
    //     '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
    //     { search: `%${search}%` },
    //   );
    // }

    const tasks = await query.getMany();
    return tasks;
  }
}
