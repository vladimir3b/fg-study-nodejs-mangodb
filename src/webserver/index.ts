import * as express from 'express';
import * as path from 'path';
import * as handlebars from 'express-handlebars';

export class ExpressServer {

  public static PORT: number = 4000;
  public static app: express.Express = express();

  public static createServer(): void  {

    this.app.use(express.static('public'));

    this.app.engine('hbs', handlebars({ 
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: path.resolve(__dirname, '../../views/layouts')
    }));
    this.app.set('views', path.resolve(__dirname, '../../views'));       
    this.app.set('view engine', 'hbs');
    
    this.app.get('/', (request: express.Request, response: express.Response) => {
      response.render('home');
    });
    this.app.get('/about', (request: express.Request, response: express.Response) => {
      response.render('about');
    });
    this.app.get('/post', (request: express.Request, response: express.Response) => {
      response.render('post');;
    });
    this.app.get('/contact', (request: express.Request, response: express.Response) => {
      response.render('contact', {
        scripts: `
          <script src="vendor/jquery/jquery.min.js"></script>
          <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>    
        `
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