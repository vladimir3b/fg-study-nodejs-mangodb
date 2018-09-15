import { 
  Request, 
  Response
} from 'express-serve-static-core';
import * as path from 'path';
import * as fileUpload from 'express-fileupload';

import { Database } from '../database';

export const storePostController = (request: Request, response: Response) => {
  // this would not exist without this.app.use(bodyParser.json());
  
  if (request.files) {
    const now: Date = new Date();
    const uniqueId: string = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    const image: fileUpload.UploadedFile = <fileUpload.UploadedFile>request.files.image;
    image.mv(path.resolve(__dirname, '../../public/posts/img', `${uniqueId}_${image.name}`), (error: Error) => {
      if (error) {
        throw error;
      } else {
        Database.createPosts([{
          ...request.body,                
          // this is equivalent with
          // title: request.body.title,
          // username: request.body.username, etc.
          image: `/posts/img/${uniqueId}_${image.name}`
          }], () => { response.redirect('/'); });
      }
    }); 
  }
}