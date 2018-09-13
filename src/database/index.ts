import { postModel, IPost, IPostSchema } from './models/post';
import * as mongoose from 'mongoose';

export class Database {

  public static post: mongoose.Model<IPost> = postModel;

  public static connectToDatabase() {
    mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true });
  }

  public static createPost(posts: Array<IPostSchema>) {
    posts.forEach((post: IPostSchema) => {
      this.post.create(post, 
        (error: mongoose.Error, post: mongoose.Model<IPost>) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Data has been added.');
          }   
        }
      );
    });
  }

  public static readPosts(queryObject: object = {}) {
    this.post.find(queryObject, 
      (error: mongoose.Error, posts: Array<mongoose.Model<IPost>>) => {
        if (error) {
          console.error(error);
        } else {
          console.log(posts);
        }        
      }
    );
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