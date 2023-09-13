import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodosEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodosEntity)
    private todoRepository: Repository<TodosEntity>,
  ) {}

  async findAll(): Promise<TodosEntity[]> {
    return this.todoRepository.find();
  }

  async create(todo: Partial<TodosEntity>): Promise<TodosEntity> {
    const newTodo = this.todoRepository.create(todo);
    return this.todoRepository.save(newTodo);
  }
}
