import { Database } from './src/database';
import { ExpressServer } from "./src/webserver";

Database.connectToDatabase();
// Database.createPost([
//   {
//     title: 'My first blog post',
//     description: 'Blog post description',
//     content: 'Here we have some content...'
//   },
//   {
//     title: 'My second blog post',
//     description: 'Another blog post description',
//     content: 'Here we have some content for the second post...'
//   }
// ]);
// Database.readPosts({
//   title: 'My first blog post'
// });
Database.updateById('5b99cd12811e612518f27d19', {
  title: 'Gigi Becali'
})
Database.readPostById('5b99cd12811e612518f27d19');


ExpressServer.createServer(); 
ExpressServer.startServer();