import { Database } from './src/database';
import { ExpressServer } from "./src/webserver";

Database.connectToDatabase();
ExpressServer.createServer(); 
ExpressServer.startServer();