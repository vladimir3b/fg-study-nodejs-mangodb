import * as http from 'http';

export class NodejsBasics {
  private static _webServer: http.Server;
  private static _port: number = 3000;

  private static _createSimpleWebServer(): http.Server {
    const webServer: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
      console.log(request.url);
      response.end('This is the simplest Web Server ever made...');      
    });
    return webServer
  }
  public static startWebSever(port?: number): void {
    this._port = port || this._port;
    this._webServer = this._webServer || this._createSimpleWebServer();
    console.log(`Listening on port ${this._port}...`);
    this._webServer.listen(this._port);
  }
}