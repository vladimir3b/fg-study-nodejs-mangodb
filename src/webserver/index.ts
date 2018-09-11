import * as express from 'express';
import * as path from 'path';
import * as handlebars from 'express-handlebars';
import * as handlebarsSections from 'express-handlebars-sections';


export class ExpressServer {

  public static PORT: number = 4000;
  public static app: express.Express = express();

  public static createServer(): void  {

    this.app.use(express.static('public'));

    this.app.engine('hbs', handlebars({ 
        extname: 'hbs',
        defaultLayout: 'base',
        layoutsDir: path.resolve(__dirname, '../../views/layouts')
    }));
    this.app.set('views', path.resolve(__dirname, '../../views'));       
    this.app.set('view engine', 'hbs');
    
    this.app.get('/', (request: express.Request, response: express.Response) => {
      response.render('home');
    });
    this.app.get('/about', (request: express.Request, response: express.Response) => {
      response.sendFile(path.resolve(__dirname, '../../public/html/about.html'));
    });
    this.app.get('/post', (request: express.Request, response: express.Response) => {
      response.sendFile(path.resolve(__dirname, '../../public/html/post.html'));
    });
    this.app.get('/contact', (request: express.Request, response: express.Response) => {
      response.sendFile(path.resolve(__dirname, '../../public/html/contact.html'));
    });
  }

  public static startServer(port?: number): void {
    this.PORT = port || this.PORT;
    this.app.listen(this.PORT, () => {
      console.log(`Server is listening to port ${this.PORT}...`);
    });
  }

}