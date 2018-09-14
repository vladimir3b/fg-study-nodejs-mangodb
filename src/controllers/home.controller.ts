import { 
  Request, 
  Response
} from 'express-serve-static-core';

import { Database } from '../database';

export const homeController = async (request: Request, response: Response) => {
  response.render('home', { posts: await Database.readPosts() });
}