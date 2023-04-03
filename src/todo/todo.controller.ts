import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateTodoDto } from '../DTO/create-todo.dto';
import { TodoService } from './todo.service';
import { Todo } from '../types/Todo';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async createTODO(@Res() res, @Body() createTodo: CreateTodoDto) {
    await this.todoService.addTodo(createTodo);
    return res.status(HttpStatus.OK).json({ message: 'Todo has been  added' });
  }

  @Get()
  async getTodo(@Res() res): Promise<Todo[]> {
    const todos: Todo[] = await this.todoService.getTodo();
    return res.status(HttpStatus.OK).json(todos);
  }

  @Get(':/todoID')
  async getTodoById(@Res() res, @Param('todoID') todoID) {
    const todo: Todo = await this.todoService.getTodoById(todoID);
    if (!todo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json(todo);
  }

  @Put('/')
  async editTodo(@Res() res, @Query('todoID') todoID, @Body() createTodoDTO: CreateTodoDto) {
    const editedTodo = await this.todoService.editTodo(todoID, createTodoDTO);
    if (!editedTodo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated',
      todo: editedTodo,
    });
  }

  @Delete('/delete')
  async deleteTodo(@Res() res, @Query('todoID') todoID) {
    const deletedTodo = await this.todoService.deleteTodo(todoID);
    if (!deletedTodo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({ message: 'Todo has been deleted!' });
  }
}
