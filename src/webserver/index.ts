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

import { Database } from '../database';


export class ExpressServer {

  public static PORT: number = 4000;
  public static app: Express = express();

  public static createServer(): void  {

    const myMiddleware = (request: Request, response: Response, next: NextFunction) => {
      (<any>request).aCustomProperty = 'This is a new property...';
      next();
    }

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

    this.app.use(myMiddleware);
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
    

    //get-routes
    this.app.get('/', async (request: Request, response: Response) => {
      //console.log((<any>request).aCustomProperty);
      response.render('home', { posts: await Database.readPosts() });
    });
    this.app.get('/about', (request: Request, response: Response) => {
      response.render('about');
    });
    this.app.get('/post/:id', async (request: Request, response: Response) => {
      response.render('post', { post: await Database.readPostById(request.params.id) });      
    });
    this.app.get('/contact', (request: Request, response: Response) => {
      response.render('contact', {
        scripts: `
          <script src="vendor/jquery/jquery.min.js"></script>
          <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>    
        `
      });
    });

    this.app.get('/posts/new', (request: Request, response: Response) => {
      response.render('create');
    });

    //post-routes
    this.app.post('/posts/store', (request: Request, response: Response) => {
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
    });
  }

  public static startServer(port?: number): void {
    this.PORT = port || this.PORT;
    this.app.listen(this.PORT, () => {
      console.log(`Server is listening to port ${this.PORT}...`);
    });
  }

}