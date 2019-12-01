import * as mongoose from 'mongoose';
export interface ToDo extends mongoose.Document {
  id: String;
  desc: String;
  checked: Boolean;
}
