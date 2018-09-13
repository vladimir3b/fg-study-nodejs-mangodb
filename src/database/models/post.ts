import * as mongoose from 'mongoose';

interface IPostSchema {
  title: string,
  description: string,
  content: string
}

interface IPost extends IPostSchema, mongoose.Document {};

const postSchema: mongoose.Schema = new mongoose.Schema({
  title:  String,
  description: String,
  content: String
});

const postModel: mongoose.Model<IPost> = mongoose.model('post', postSchema);

export {
  IPost,
  IPostSchema,
  postModel
}