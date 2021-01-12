import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";

@Entity()
export class AddedUniversity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name?: string;

	@Column()
	tags?: string;

	@Column('json')
	university_data?: string;
}