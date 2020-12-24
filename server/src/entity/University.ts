import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";

@Entity()
export class University {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name?: string;

	@Column()
	tags?: string;

	@Column('json')
	university_data?: string;

	@Column("tsvector", {select: false})
	document_with_weights: any;
}