import { Database } from './src/database';
import { ExpressServer } from "./src/webserver";

import * as path from 'path';

Database.connectToDatabase();
ExpressServer.createServer(); 
ExpressServer.startServer();
