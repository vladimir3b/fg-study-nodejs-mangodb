import { postModel, IPost, IPostSchema } from './models/post';
import * as mongoose from 'mongoose';

export class Database {

  public static post: mongoose.Model<IPost> = postModel;

  public static connectToDatabase() {
    mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true });
  }

  public static createPosts(posts: Array<IPostSchema>, callback: Function) {
    posts.forEach((post: IPostSchema) => {
      this.post.create(post, 
        (error: mongoose.Error, post: mongoose.Model<IPost>) => {
          if (error) {
            console.error(error);
          } else {
            callback();
          }   
        }
      );
    });
  }

  public static async readPosts(queryObject: object = {}): Promise<Array<IPost>> {
    return this.post.find(queryObject);
  }

  public static readPostById(id: string) {
    this.post.findById(id, 
      (error: mongoose.Error, post: mongoose.Model<IPost>) => {
        if (error) {
          console.error(error);
        } else {
          console.log(post);
        }        
      }
    );
  }

  public static updateById(id: string, newPost: object) {
    this.post.findByIdAndUpdate(id, newPost, 
      (error: mongoose.Error) => {
        if (error) {
          console.error(error);
        }        
      }      
    );
  }

  public static removeById(id: string) {
    this.post.findByIdAndRemove(id, 
      (error: mongoose.Error) => {
        if (error) {
          console.error(error);
        }        
      }      
    );
  }

}