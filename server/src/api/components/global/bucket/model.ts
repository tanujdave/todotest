import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Timestamp,
	UpdateDateColumn
} from 'typeorm';
import { Todo } from '../todo/model';

@Entity()
export class Bucket {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		nullable: false,
		unique: true
	})
	public name: string;

	@OneToMany(
		(type) => Todo,
		(todo) => todo.bucket
	)
	public todos: Todo[];

	@CreateDateColumn()
	public createdAt: Timestamp;

	@UpdateDateColumn()
	public updatedAt: Timestamp;

	public static mockTestBucket(): Bucket {
		const bucket = new Bucket();
		bucket.id = 1;
		bucket.name = 'testBucket';

		return bucket;
	}
}
