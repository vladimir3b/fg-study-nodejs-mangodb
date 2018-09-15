import { 
  Request, 
  Response, 
  NextFunction
} from 'express-serve-static-core';

export const storePostMiddleware = (request: any, response: Response, next: NextFunction) => {      
  if (request.files) {
    if (
      !request.files.image || 
      !request.body.username || 
      !request.body.title ||
      !request.body.subtitle ||
      !request.body.content) {
      return response.redirect('/post/new'); //return exits the function here
    }
  }      
  next();
}