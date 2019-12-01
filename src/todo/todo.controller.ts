import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDo } from './interfaces/todo.interface';
import { CreateToDoDto } from './dtos/create-toDo.dto';
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get(':id')
  async getone(@Param('id') id: string): Promise<ToDo> {
    return this.todoService.getOne(id);
  }

  @Get()
  async getall(): Promise<ToDo[]> {
    return this.todoService.getAll();
  }

  @Post()
  async create(@Body() created: CreateToDoDto) {
    await this.todoService.createToDo(created);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ToDo> {
    return this.todoService.delete(id);
  }
  @Delete()
  removeAll(): Promise<ToDo> {
    return this.todoService.deleteAll();
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createToDoDto: CreateToDoDto,
  ): Promise<ToDo> {
    return this.todoService.updateToDo(id, createToDoDto);
  }
}
