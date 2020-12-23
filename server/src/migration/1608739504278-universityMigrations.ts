import {MigrationInterface, QueryRunner} from "typeorm";

export class universityMigrations1608739504278 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`
		update university set document_with_weights = setweight(to_tsvector(name), 'A') ||
	  setweight(to_tsvector(tags), 'B');
	CREATE INDEX document_weights_idx
	  ON university
	  USING GIN (document_with_weights);
			CREATE FUNCTION university_tsvector_trigger() RETURNS trigger AS $$
	begin
	  new.document_with_weights :=
	  setweight(to_tsvector('english', coalesce(new.name, '')), 'A')
	  || setweight(to_tsvector('english', coalesce(new.tags, '')), 'B');
	  return new;
	end
	$$ LANGUAGE plpgsql;
	CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
		ON university FOR EACH ROW EXECUTE PROCEDURE university_tsvector_trigger();
			`);
	}

	async down(): Promise<any> {
		
	}

}
