import { Database } from './src/database';
import { ExpressServer } from "./src/webserver";

Database.connectToDatabase();
Database.createPost();

ExpressServer.createServer(); 
ExpressServer.startServer();