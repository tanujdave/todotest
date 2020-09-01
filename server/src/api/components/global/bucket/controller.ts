import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { BucketService } from './service';
import { Bucket } from './model';

export class BucketController {
	public readonly bucketService: BucketService = new BucketService();
	
	/**
	 * Read buckets
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns HTTP response
	 */
	@bind
	public async readBuckets(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const buckets: Bucket[] = await this.bucketService.readAll({}, true);			

			return res.json({
				status: res.statusCode,
				data: buckets
			});
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Update bucket
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns HTTP response
	 */
	@bind
	public async updateBucket(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { bucketID } = req.params;
			let { bucket } = req.body;

			if (!bucketID || !req.body.bucket) {
				return res.status(400).json({
					status: 400,
					error: 'Invalid request'
				});
			}

			const existingBucket: Bucket | undefined = await this.bucketService.read({
				where: {
					id: parseInt(bucketID, 10)
				}
			});

			if (!existingBucket) {
				return res.status(404).json({
					status: 404,
					error: 'Bucket not found'
				});
			}

			const updateBucket: Bucket = await this.bucketService.save(bucket);

			return res.json({
				status: res.statusCode,
				data: updateBucket
			});
		} catch (err) {
			return next(err);
		}
	}
}
