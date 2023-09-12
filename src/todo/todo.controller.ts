import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodosEntity } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<TodosEntity[]> {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() todoData: Partial<TodosEntity>): Promise<TodosEntity> {
    return this.todoService.create(todoData);
  }
}