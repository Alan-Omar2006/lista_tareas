import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; description?: string }) {
    return this.tasksService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { title?: string; description?: string; completed?: boolean }) {
    return this.tasksService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(Number(id));
  }
}
