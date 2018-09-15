
import { Router } from 'express-serve-static-core';
import * as express from 'express';

import { homeController } from '../../controllers/home.controller';
import { getPostController } from '../../controllers/get-post.controller';
import { createPostController } from '../../controllers/create-post.controller';
import { storePostController } from '../../controllers/store-post.controller';

export class Routes {
  public static router: Router;

  public static create(): Router {
    this.router = express.Router();
    this._getRoutes();
    this._postRoutes();
    return this.router;
  }

  private static _getRoutes(): void {
    this.router.get('/', homeController);
    this.router.get('/post/get/:id', getPostController);
    this.router.get('/post/new', createPostController);
    // this.router.get('/user/new', create)
  }

  private static _postRoutes(): void {
    this.router.post('/post/store', storePostController);
  }

}