import { postModel, IPostModel } from './models/post';
import * as mongoose from 'mongoose';
import { AnyARecord } from 'dns';

export class Database {

  public static post: mongoose.Model<IPostModel> = postModel;

  public static connectToDatabase() {
    mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true });
  }

  public static createPosts(posts: Array<IPostModel>, callback: Function) {
    posts.forEach((post: IPostModel) => {
      this.post.create(post, 
        (error: mongoose.Error, post: mongoose.Model<IPostModel>) => {
          if (error) {
            console.error(error);
          } else {
            callback();
          }   
        }
      );
    });
  }

  public static readPosts(queryObject: object = {}): mongoose.DocumentQuery<Array<IPostModel>, IPostModel> {
    return this.post.find(queryObject);
  }

  public static readPostById(id: string): mongoose.DocumentQuery<IPostModel | null, IPostModel> {
    return this.post.findById(id);
  }

  // public static updateById(id: string, newPost: object) {
  //   this.post.findByIdAndUpdate(id, newPost, 
  //     (error: mongoose.Error) => {
  //       if (error) {
  //         console.error(error);
  //       }        
  //     }      
  //   );
  // }

  // public static removeById(id: string) {
  //   this.post.findByIdAndRemove(id, 
  //     (error: mongoose.Error) => {
  //       if (error) {
  //         console.error(error);
  //       }        
  //     }      
  //   );
  // }

}