import { 
  Request, 
  Response
} from 'express-serve-static-core';

export const createPostController = (request: Request, response: Response) => {
  response.render('create-post');
}