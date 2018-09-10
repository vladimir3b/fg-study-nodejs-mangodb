import * as express from 'express';
import * as path from 'path';

export class ExpressServer {

  public static PORT: number = 4000;
  public static app: express.Express = express();

  public static createRoutes(): void  {

    this.app.use(express.static('public'));
    
    this.app.get('/', (request: express.Request, response: express.Response) => {
      response.sendFile(path.resolve(__dirname, '../../public/html/home.html'));
    });
    this.app.get('/about', (request: express.Request, response: express.Response) => {
      response.sendFile(path.resolve(__dirname, '../../public/html/about.html'));
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