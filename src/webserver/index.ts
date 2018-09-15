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
import { storePostMiddleware } from '../middleware/store-post.middleware';
import { Routes } from './routes';


export class ExpressServer {

  public static PORT: number = 4000;
  public static app: Express = express();

  public static createServer(): void {
 
    //setting middlewares
    this.app.use(fileUpload());
    this.app.use(express.static('public'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use('/post/store', storePostMiddleware);

    //setting the view engine
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

    //setting the routes
    this.app.use(Routes.create());    

  }

  public static startServer(port?: number): void {
    this.PORT = port || this.PORT;
    this.app.listen(this.PORT, () => {
      console.log(`Server is listening to port ${this.PORT}...`);
    });
  }

}