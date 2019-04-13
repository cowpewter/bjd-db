import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteTimestamps1555192203184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doll_wishlist` ADD `deleteTimestamp` datetime NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `image` ADD `deleteTimestamp` datetime NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `doll_configuration` ADD `deleteTimestamp` datetime NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `doll` ADD `deleteTimestamp` datetime NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `comment` ADD `deleteTimestamp` datetime NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `album` ADD `deleteTimestamp` datetime NULL DEFAULT null");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `album` DROP COLUMN `deleteTimestamp`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `deleteTimestamp`");
        await queryRunner.query("ALTER TABLE `doll` DROP COLUMN `deleteTimestamp`");
        await queryRunner.query("ALTER TABLE `doll_configuration` DROP COLUMN `deleteTimestamp`");
        await queryRunner.query("ALTER TABLE `image` DROP COLUMN `deleteTimestamp`");
        await queryRunner.query("ALTER TABLE `doll_wishlist` DROP COLUMN `deleteTimestamp`");
    }

}
