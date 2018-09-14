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

    const image: fileUpload.UploadedFile = <fileUpload.UploadedFile>request.files.image;
    image.mv(path.resolve(__dirname, '../../public/posts/img', image.name), (error: Error) => {
      if (error) {
        throw error;
      } else {
        Database.createPosts([{
          ...request.body,                
          // this is equivalent with
          // title: request.body.title,
          // username: request.body.username, etc.
          image: `/posts/img/${image.name}`
          }], () => { response.redirect('/'); });
      }
    }); 
  }
}