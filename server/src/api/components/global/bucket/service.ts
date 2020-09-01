import { bind } from 'decko';
import { Repository, getManager, FindManyOptions, FindOneOptions } from 'typeorm';
import { Bucket } from './model';

import { CacheService } from '@services/cache';

import { IComponentServiceStrict } from '../../index';

export class BucketService implements IComponentServiceStrict<Bucket> {
	readonly cacheService: CacheService = new CacheService();
	readonly defaultRelations: string[] = ['todos'];
	readonly repo: Repository<Bucket> = getManager().getRepository(Bucket);

	/**
	 * Read all buckets from db
	 *
	 * @param options Find options
	 * @param cached Read buckets from cache
	 * @returns Returns an array of buckets
	 */
	@bind
	public readAll(options: FindManyOptions<Bucket> = {}, cached: boolean = false): Promise<Bucket[]> {
		try {
			if (Object.keys(options).length) {
				return this.repo.find({
					relations: this.defaultRelations,
					...options
				});
			}

			return this.repo.find({
				relations: this.defaultRelations
			});
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Read a certain bucket from db
	 *
	 * @param options Find options
	 * @returns Returns a single bucket
	 */
	@bind
	public read(options: FindOneOptions<Bucket> = {}): Promise<Bucket | undefined> {
		try {
			return this.repo.findOne({
				relations: this.defaultRelations,
				...options
			});
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Save new or updated bucket to db
	 *
	 * @param bucket Bucket to save
	 * @returns Returns saved bucket
	 */
	@bind
	public async save(bucket: Bucket): Promise<Bucket> {
		try {
			const newBucket: Bucket = await this.repo.save(bucket);

			// Clear bucket cache
			this.cacheService.delete('bucket');

			return newBucket;
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Delete bucket from db
	 *
	 * @param bucket Bucket to delete
	 * @returns Returns deleted bucket
	 */
	@bind
	public async delete(bucket: Bucket): Promise<Bucket> {
		try {
			const deletedBucket = await this.repo.remove(bucket);

			// Clear bucket cache
			this.cacheService.delete('bucket');

			return deletedBucket;
		} catch (err) {
			throw new Error(err);
		}
	}
}
