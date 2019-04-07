import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedSubscriptions1554575977023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('INSERT INTO subscription_tag (name) VALUES ("security")');
        await queryRunner.query('INSERT INTO subscription_tag (name) VALUES ("newsletter")');
        await queryRunner.query('INSERT INTO subscription_tag (name) VALUES ("dollComment")');
        await queryRunner.query('INSERT INTO subscription_tag (name) VALUES ("albumComment")');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DELETE FROM subscription_tag WHERE name="security"');
        await queryRunner.query('DELETE FROM subscription_tag WHERE name="newsletter"');
        await queryRunner.query('DELETE FROM subscription_tag WHERE name="dollComment"');
        await queryRunner.query('DELETE FROM subscription_tag WHERE name="albumComment"');
    }

}
