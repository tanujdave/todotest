import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	Timestamp,
	ManyToOne,
	UpdateDateColumn
} from 'typeorm';

import { Bucket } from '../bucket/model';

@Entity()
export class Todo {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		nullable: false
	})
	public name: string;

	@Column({
		default: false
	})
	public isCompleted: boolean;

	@ManyToOne(
		(type) => Bucket,
		(bucket) => bucket.todos,
		{
			nullable: true
		}
	)
	public bucket: Bucket;

	@CreateDateColumn()
	public createdAt: Timestamp;

	@UpdateDateColumn()
	public updatedAt: Timestamp;

	public static mockTestTodo(): Todo {
		const todo = new Todo();
		const bucket = new Bucket();
		bucket.id = 1;
		bucket.name = 'testBucket';

		todo.id = 1;
		todo.name = 'test@email.com';
		todo.bucket = bucket;

		return todo;
	}
}
