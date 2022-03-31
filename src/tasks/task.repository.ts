import { Repository, EntityRepository } from 'typeorm';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getQuery() {
    const query = await this.createQueryBuilder('task');
    return query;
  }
}
