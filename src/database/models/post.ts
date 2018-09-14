import * as mongoose from 'mongoose';

interface IPostModel extends mongoose.Document {
  title: string,
  subtitle: string,
  content: string,
  image: string
  username: string,
  createdAt: Date
};

const postSchema: mongoose.Schema = new mongoose.Schema({
  title:  String,
  subtitle: String,
  content: String,
  image: String,
  username: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const postModel: mongoose.Model<IPostModel> = mongoose.model('post', postSchema);

export {
  IPostModel,
  postModel
}