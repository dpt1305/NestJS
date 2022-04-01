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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() taskFilterDto: GetTaskFilterDto) {
    console.log(taskFilterDto);
    if (!taskFilterDto) {
      return this.tasksService.getTasksFilter(taskFilterDto);
    }
    return this.tasksService.findAll();

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<string> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.tasksService.remove(id);
  }

  // @Get()
  // getTasksFilter(@Query() taskFilterDto: GetTaskFilterDto) {
  //   console.log(taskFilterDto);
  //   // if (!taskFilterDto) {
  //   //   return this.tasksService.findAll();
  //   // } else {
  //   //   return this.tasksService.getTasksFilter(taskFilterDto);
  //   // }
  //   return this.tasksService.getTasksFilter(taskFilterDto);
  // }
}
