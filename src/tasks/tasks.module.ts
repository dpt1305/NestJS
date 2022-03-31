import { TaskRepository } from './task.repository';
// import { TypeOrmModule } from '@nestjs/orm';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([TaskRepository])],
})
export class TasksModule {}
