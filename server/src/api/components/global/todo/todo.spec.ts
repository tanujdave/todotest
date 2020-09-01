import 'module-alias/register';
import { assert } from 'chai';

import { Todo } from './model';
import { Bucket } from '../bucket/model';
import { TestFactory } from '../../../../test/factory';

describe('Testing apis endpoints', () => {
	const factory: TestFactory = new TestFactory();
	const testTodo: Todo = Todo.mockTestTodo();
	const testTodoModified: Todo = {
		...testTodo,
		name: 'testNameModified'
	};

	before(async () => {
		await factory.init();
	});

	after(async () => {
		await factory.close();
	});

	describe('POST /todos', () => {
		it('responds with status 400', (done) => {
			factory.app
				.post('/api/v1/todos')
				.send()
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(400, done);
		});

		it('responds with new todo', (done) => {
			factory.app
				.post('/api/v1/todos')
				.send({
					todo: testTodo
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const { status } = res.body;
						const todo: Todo = res.body.data;

						// Assert status
						assert(status === res.status, 'status does not match');

						// Assert todo
						assert.isObject(todo, 'todo should be an object');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('PUT /todos/1', () => {
		it('responds with updated todo', (done) => {
			factory.app
				.put('/api/v1/todos/1')
				.send({
					todo: testTodoModified
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					try {
						if (err) throw err;

						const { status } = res.body;
						const todo: Todo = res.body.data;

						// Assert status
						assert(status === res.status, 'status does not match');

						// Assert todo
						assert.isObject(todo, 'todo should be an object');
						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('GET /todos', () => {
		it('responds with todo array', (done) => {
			factory.app
				.get('/api/v1/todos')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const { status } = res.body;
						const todos: Todo[] = res.body.data;

						// Assert status
						assert(status === res.status, 'status does not match');

						// Assert todos
						assert.isArray(todos, 'todos should be an array');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('GET /todos/1', () => {
		it('responds with single todo', (done) => {
			factory.app
				.get('/api/v1/todos/1')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const { status } = res.body;
						const todo: Todo = res.body.data;

						// Assert status
						assert(status === res.status, 'status does not match');

						// Assert todo
						assert.isObject(todo, 'todo should be an object');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('DELETE /todos/1', () => {
		it('responds with status 204', (done) => {
			factory.app
				.delete('/api/v1/todos/1')
				.set('Accept', 'application/json')
				.expect(204, done);
		});

		it('responds with status 404', (done) => {
			factory.app
				.delete('/api/v1/todos/1')
				.set('Accept', 'application/json')
				.expect(404, done);
		});
	});

	describe('GET /buckets', () => {
		it('responds with bucket array', (done) => {
			factory.app
				.get('/api/v1/buckets')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const { status } = res.body;
						const buckets: Bucket[] = res.body.data;

						// Assert status
						assert(status === res.status, 'status does not match');

						// Assert buckets
						assert.isArray(buckets, 'buckets should be an array');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});
});
