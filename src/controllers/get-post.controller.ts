import { 
  Request, 
  Response
} from 'express-serve-static-core';

import { Database } from '../database';

export const getPostController = async (request: Request, response: Response) => {
  response.render('get-post', { post: await Database.readPostById(request.params.id) }); 
}