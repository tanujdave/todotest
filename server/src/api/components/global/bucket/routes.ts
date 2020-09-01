import { Router } from 'express';

import { IComponentRoutes } from '../../index';

import { BucketController } from './controller';

export class BucketRoutes implements IComponentRoutes<BucketController> {
	readonly controller: BucketController = new BucketController();
	readonly router: Router = Router();

	public constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.controller.readBuckets);
		this.router.put('/:bucketID', this.controller.updateBucket);
	}
}
