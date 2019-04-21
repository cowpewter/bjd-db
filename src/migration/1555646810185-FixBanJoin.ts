import {MigrationInterface, QueryRunner} from "typeorm";

export class FixBanJoin1555646810185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `create_ban` ADD `userId` bigint NULL");
        await queryRunner.query("ALTER TABLE `create_ban` ADD UNIQUE INDEX `IDX_61f9e44a5d6fc70c3250183530` (`userId`)");
        await queryRunner.query("ALTER TABLE `edit_ban` ADD `userId` bigint NULL");
        await queryRunner.query("ALTER TABLE `edit_ban` ADD UNIQUE INDEX `IDX_17d1f3b665c9189e0ebb40b875` (`userId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_61f9e44a5d6fc70c3250183530` ON `create_ban` (`userId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_17d1f3b665c9189e0ebb40b875` ON `edit_ban` (`userId`)");
        await queryRunner.query("ALTER TABLE `create_ban` ADD CONSTRAINT `FK_61f9e44a5d6fc70c32501835307` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `edit_ban` ADD CONSTRAINT `FK_17d1f3b665c9189e0ebb40b875f` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `edit_ban` DROP FOREIGN KEY `FK_17d1f3b665c9189e0ebb40b875f`");
        await queryRunner.query("ALTER TABLE `create_ban` DROP FOREIGN KEY `FK_61f9e44a5d6fc70c32501835307`");
        await queryRunner.query("DROP INDEX `REL_17d1f3b665c9189e0ebb40b875` ON `edit_ban`");
        await queryRunner.query("DROP INDEX `REL_61f9e44a5d6fc70c3250183530` ON `create_ban`");
        await queryRunner.query("ALTER TABLE `edit_ban` DROP INDEX `IDX_17d1f3b665c9189e0ebb40b875`");
        await queryRunner.query("ALTER TABLE `edit_ban` DROP COLUMN `userId`");
        await queryRunner.query("ALTER TABLE `create_ban` DROP INDEX `IDX_61f9e44a5d6fc70c3250183530`");
        await queryRunner.query("ALTER TABLE `create_ban` DROP COLUMN `userId`");
    }

}
