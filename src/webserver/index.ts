import { 
  Express, 
  Request, 
  Response, 
  NextFunction
} from 'express-serve-static-core';
import * as express from 'express';
import * as path from 'path';
import * as handlebars from 'express-handlebars';
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload';

import { createPostController } from '../controllers/create-post.controller';
import { homeController } from '../controllers/home.controller';
import { storePostController } from '../controllers/store-post.controller';
import { getPostController } from '../controllers/get-post.controller';


export class ExpressServer {

  public static PORT: number = 4000;
  public static app: Express = express();

  public static createServer(): void  {

    const validateCreatePostMiddleware = (request: Request, response: Response, next: NextFunction) => {      
      if (request.files) {
        if (
          !request.files.image || 
          !request.body.username || 
          !request.body.title ||
          !request.body.subtitle ||
          !request.body.content) {
          return response.redirect('/posts/new'); //return exits the function here
        }
      }      
      next();
    }

    this.app.use(fileUpload());
    this.app.use(express.static('public'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use('/posts/store', validateCreatePostMiddleware);

    this.app.engine('hbs', handlebars({ 
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: path.resolve(__dirname, '../../views/layouts'),
        helpers: {
          niceDate: (date: Date) => date.toDateString()
        }
    }));
    this.app.set('views', path.resolve(__dirname, '../../views'));       
    this.app.set('view engine', 'hbs');
    

    //app routes
    this.app.get('/', homeController);
    this.app.get('/post/:id', getPostController);
    this.app.get('/posts/new', createPostController);
    this.app.post('/posts/store', storePostController);
  }

  public static startServer(port?: number): void {
    this.PORT = port || this.PORT;
    this.app.listen(this.PORT, () => {
      console.log(`Server is listening to port ${this.PORT}...`);
    });
  }

}