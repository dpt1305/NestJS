import { Repository, EntityRepository } from 'typeorm';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(title: string, status: string): Promise<Task> {
    const task = await this.create({
      id: uuid(),
      title: title,
      status: status,
    });
    // await this.create(task);
    await this.save(task);
    return task;
  }
  async getQuery() {
    const query = await this.createQueryBuilder('task');
    return query;
  }
}
