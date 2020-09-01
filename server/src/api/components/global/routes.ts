import { Router } from 'express';

import { TodoRoutes } from './todo/routes';
import { BucketRoutes } from './bucket/routes';

/**
 * Init Express api routes (Global)
 *
 * @param router Router the routes are attached to
 * @param prefix Prefix for attached routes
 * @returns
 */
export function registerGlobalRoutes(router: Router, prefix: string = ''): void {
	router.use(`${prefix}/buckets`, new BucketRoutes().router);
	router.use(`${prefix}/todos`, new TodoRoutes().router);
}
