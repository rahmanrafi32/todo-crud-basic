import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../DTO/create-todo.dto';
import { Todo } from '../types/Todo';

@Injectable()
export class TodoService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Test',
      description: 'This is a test Tod',
      isDone: true,
    },
  ];

  async addTodo(createTodo: CreateTodoDto): Promise<Todo> {
    this.todos.push(createTodo);
    return this.todos.at(-1);
  }

  async getTodo(): Promise<Todo[]> {
    return this.todos;
  }

  async getTodoById(todoID: number): Promise<Todo> {
    return this.todos.find((element: Todo) => element.id == todoID);
  }

  async editTodo(postID: number, createTodoDTO: CreateTodoDto): Promise<Todo> {
    await this.deleteTodo(postID);
    this.todos.push(createTodoDTO);
    return this.todos.at(-1);
  }

  async deleteTodo(todoID: number): Promise<any> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoID);
    return this.todos.splice(todoIndex, 1);
  }
}
