import { Router } from 'express';

import { IComponentRoutes } from '../../index';

import { TodoController } from './controller';

export class TodoRoutes implements IComponentRoutes<TodoController> {
	readonly controller: TodoController = new TodoController();
	readonly router: Router = Router();

	public constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.controller.readTodos);
		this.router.post('/', this.controller.createTodo);
		this.router.get('/:todoID', this.controller.readTodo);
		this.router.put('/:todoID', this.controller.updateTodo);
		this.router.delete('/:todoID', this.controller.deleteTodo);
	}
}
