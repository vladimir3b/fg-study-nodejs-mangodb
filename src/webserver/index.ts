import * as express from 'express';
import * as path from 'path';
import * as handlebars from 'express-handlebars';
import * as bodyParser from 'body-parser';
import { Database } from '../database';

export class ExpressServer {

  public static PORT: number = 4000;
  public static app: express.Express = express();

  public static createServer(): void  {

    this.app.use(express.static('public'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

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
    this.app.get('/', async (request: express.Request, response: express.Response) => {
      response.render('home', { posts: await Database.readPosts() });
    });
    this.app.get('/about', (request: express.Request, response: express.Response) => {
      response.render('about');
    });
    this.app.get('/post/:id', async (request: express.Request, response: express.Response) => {
      console.log(await Database.readPostById(request.params.id));
      response.render('post', { post: await Database.readPostById(request.params.id) });      
    });
    this.app.get('/contact', (request: express.Request, response: express.Response) => {
      response.render('contact', {
        scripts: `
          <script src="vendor/jquery/jquery.min.js"></script>
          <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>    
        `
      });
    });

    this.app.get('/posts/new', (request: express.Request, response: express.Response) => {
      response.render('create');
    });

    //post-routes
    this.app.post('/posts/store', (request: express.Request, response: express.Response) => {
      // this would not exist without this.app.use(bodyParser.json());
      Database.createPosts([request.body], () => {
        response.redirect('/');
      });
    });
  }

  public static startServer(port?: number): void {
    this.PORT = port || this.PORT;
    this.app.listen(this.PORT, () => {
      console.log(`Server is listening to port ${this.PORT}...`);
    });
  }

}