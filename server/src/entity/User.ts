import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	username?: string;

	@Column()
	email?: string;

	@Column('json')
	password?: string;

	@Column()
	scope?: string;

	@Column()
	stripe_customer_id?: string;

	@Column()
	stripe_sub_id?: string;
}