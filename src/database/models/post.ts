import * as mongoose from 'mongoose';

interface IPostSchema extends mongoose.Document {
  title: string,
  description: string,
  content: string
}

const postSchema: mongoose.Schema = new mongoose.Schema({
  title:  String,
  description: String,
  content: String
});

const postModel: mongoose.Model<IPostSchema> = mongoose.model('post', postSchema);

export {
  IPostSchema,
  postModel
}