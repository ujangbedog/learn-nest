import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosServiceFallback {
  private todos: Todo[] = [];
  private nextId = 1;

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: createTodoDto.completed ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.push(todo);
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todos.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async findOne(id: number): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);

    Object.assign(todo, updateTodoDto);
    todo.updatedAt = new Date();

    return todo;
  }

  async remove(id: number): Promise<{ message: string }> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.todos.splice(todoIndex, 1);
    return { message: `Todo with ID ${id} has been deleted` };
  }
}
