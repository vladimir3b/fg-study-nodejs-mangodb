import { postModel, IPostSchema } from './models/post';
import * as mongoose from 'mongoose';

export class Database {

  public static post: mongoose.Model<IPostSchema> = postModel;

  public static connectToDatabase() {
    mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true });
  }

  public static createPost() {
    console.log('Writing data to database...');
    this.post.create({
      title: 'My first blog post',
      description: 'Blog post description',
      content: 'Here we have some content...'
    }, (error: mongoose.Error, post: mongoose.Model<IPostSchema>) => {
      console.log(error, post);
    });
  }

}