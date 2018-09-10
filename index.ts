import { TypescriptBasics } from "./modules/typescript-basics";
import { NodejsBasics } from "./modules/nodejs-basics";
import { ExpressServer } from "./modules/nodejs-express";


TypescriptBasics.typescriptIsWorking('Hello NodeJs!');

// NodejsBasics.startWebSever(4000);
ExpressServer.createRoutes();
ExpressServer.startServer();