import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  findAll(@Query() taskFilterDto: GetTaskFilterDto, @GetUser() user: User) {
    // console.log(taskFilterDto);
    // if (!taskFilterDto) {
    //   return this.tasksService.getTasksFilter(taskFilterDto, user);
    // }
    return this.tasksService.findAll(taskFilterDto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User): Promise<string> {
    return this.tasksService.remove( id, user );
  }
}
