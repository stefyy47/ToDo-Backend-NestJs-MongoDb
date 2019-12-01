import { Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { CreateToDoDto } from './dtos/create-toDo.dto';
import { Model } from 'mongoose';
import { ToDo } from './interfaces/todo.interface';
@Injectable()
export class TodoService {
  constructor(@InjectModel('ToDo') private ToDoModel: Model<ToDo>) { }
  async createToDo(created: CreateToDoDto) {
    console.log(created);
    const ToDo = new this.ToDoModel();
    ToDo.checked = created.checked;
    ToDo.desc = created.desc;
    console.log(ToDo);
    const result = await ToDo.save();
    console.log(result.desc);
    return result.desc as String;
  }
  async updateToDo(_id: string, created: CreateToDoDto): Promise<ToDo> {
    return await this.ToDoModel.findOneAndUpdate(
      { id: _id },
      { $set: { checked: created.checked } },
    );
  }
  async getOne(_id: string): Promise<ToDo> {
    return await this.ToDoModel.findById({ _id });
  }
  async getAll(): Promise<ToDo[]> {
    return await this.ToDoModel.find();
  }
  async delete(_id: string): Promise<ToDo> {
    return await this.ToDoModel.findOneAndRemove({ _id });
  }
  async deleteAll(): Promise<ToDo> {
    return await this.ToDoModel.find().remove();
  }
}
