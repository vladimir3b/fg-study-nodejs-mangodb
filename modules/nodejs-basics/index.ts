import * as http from 'http';

export class NodejsBasics {
  private static _webServer: http.Server;
  private static _port: number = 3000;

  private static _createSimpleWebServer(): http.Server {
    const webServer: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
      console.log(request.url);
      switch (request.url) {
        case '/':
          response.end('This is the home-page...');   
          break;
        case '/about':
          response.end('This is the about-page...');  
          break;
        case '/contact':
          response.end('Contact us...');  
          break;
        default:
          response.writeHead(404);
          response.end('Error 404. Page not found...');
      }      
    });
    return webServer;
  }

  public static startWebSever(port?: number): void {
    this._port = port || this._port;
    this._webServer = this._webServer || this._createSimpleWebServer();
    console.log(`Listening on port ${this._port}...`);
    this._webServer.listen(this._port);
  }
}