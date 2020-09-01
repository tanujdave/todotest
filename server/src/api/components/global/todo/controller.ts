import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { TodoService } from './service';
import { BucketService } from '../bucket/service';

import { Todo } from './model';
import { Bucket } from '../bucket/model';

export class TodoController {
	private readonly todoService: TodoService = new TodoService();
	private readonly bucketService: BucketService = new BucketService();

	/**
	 * Read todos
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns HTTP response
	 */
	@bind
	public async readTodos(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const todos: Todo[] = await this.todoService.readAll({}, true);

			return res.json({
				status: res.statusCode,
				data: todos
			});
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read todo
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns HTTP response
	 */
	@bind
	public async readTodo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { todoID } = req.params;

			if (!todoID) {
				return res.status(400).json({
					status: 400,
					error: 'Invalid request'
				});
			}

			const todo: Todo | undefined = await this.todoService.read({
				where: {
					id: parseInt(todoID, 10)
				}
			});

			return res.json({
				status: res.statusCode,
				data: todo
			});
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Create todo
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns HTTP response
	 */
	@bind
	public async createTodo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { todo } = req.body;

			if (!todo) {
				return res.status(400).json({
					status: 400,
					error: 'Invalid request'
				});
			}

			let bucket: Bucket | undefined = await this.bucketService.read({
				where: {
					name: todo.bucket
				}
			});

			if (!bucket) {
				bucket = await this.bucketService.save({ ...({ name: todo.bucket } as any) });
			}

			const newTodo: Todo = await this.todoService.save({
				...todo,
				bucket: bucket.id
			});

			return res.json({
				status: res.statusCode,
				data: newTodo
			});
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Update todo
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns HTTP response
	 */
	@bind
	public async updateTodo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { todoID } = req.params;
			let { todo } = req.body;

			if (!todoID || !req.body.todo) {
				return res.status(400).json({
					status: 400,
					error: 'Invalid request'
				});
			}

			const existingTodo: Todo | undefined = await this.todoService.read({
				where: {
					id: parseInt(todoID, 10)
				}
			});

			if (!existingTodo) {
				return res.status(404).json({
					status: 404,
					error: 'Todo not found'
				});
			}

			let bucket: Bucket | undefined = await this.bucketService.read({
				where: {
					name: todo.bucket
				}
			});

			if (!bucket) {
				bucket = await this.bucketService.save({ ...({ name: todo.bucket } as any) });
			}

			const updatedTodo: Todo = await this.todoService.save({
				...todo,
				bucket: bucket.id
			});

			return res.json({
				status: res.statusCode,
				data: updatedTodo
			});
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete todo
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns HTTP response
	 */
	@bind
	public async deleteTodo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { todoID } = req.params;

			if (!todoID) {
				return res.status(400).json({
					status: 400,
					error: 'Invalid request'
				});
			}

			const todo: Todo | undefined = await this.todoService.read({
				where: {
					id: parseInt(todoID, 10)
				}
			});

			if (!todo) {
				return res.status(404).json({
					status: 404,
					error: 'Todo not found'
				});
			}

			await this.todoService.delete(todo);

			return res.status(204).send();
		} catch (err) {
			return next(err);
		}
	}
}
