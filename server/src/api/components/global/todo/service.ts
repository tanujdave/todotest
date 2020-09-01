import { bind } from 'decko';
import { Repository, getManager, FindManyOptions, FindOneOptions } from 'typeorm';
import { Todo } from './model';

import { CacheService } from '@services/cache';

import { IComponentServiceStrict } from '../../index';

export class TodoService implements IComponentServiceStrict<Todo> {
	readonly cacheService: CacheService = new CacheService();
	readonly defaultRelations: string[] = ['bucket'];
	readonly repo: Repository<Todo> = getManager().getRepository(Todo);

	/**
	 * Read all todos from db
	 *
	 * @param options Find options
	 * @param cached Read todos from cache
	 * @returns Returns an array of todos
	 */
	@bind
	public readAll(options: FindManyOptions<Todo> = {}, cached: boolean = false): Promise<Todo[]> {
		try {
			if (Object.keys(options).length) {
				return this.repo.find({
					relations: this.defaultRelations,
					...options
				});
			}

			if (cached) {
				return this.cacheService.get('todo', this.readAll);
			}

			return this.repo.find({
				relations: this.defaultRelations
			});
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Read a certain todo from db
	 *
	 * @param options Find options
	 * @returns Returns a single todo
	 */
	@bind
	public read(options: FindOneOptions<Todo> = {}): Promise<Todo | undefined> {
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
	 * Save new or updated todo to db
	 *
	 * @param todo Todo to save
	 * @returns Returns saved todo
	 */
	@bind
	public async save(todo: Todo): Promise<Todo> {
		try {
			const newTodo: Todo = await this.repo.save(todo);

			// Clear todo cache
			this.cacheService.delete('todo');

			return newTodo;
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Delete todo from db
	 *
	 * @param todo Todo to delete
	 * @returns Returns deleted todo
	 */
	@bind
	public async delete(todo: Todo): Promise<Todo> {
		try {
			const deletedTodo = await this.repo.remove(todo);

			// Clear todo cache
			this.cacheService.delete('todo');

			return deletedTodo;
		} catch (err) {
			throw new Error(err);
		}
	}
}
