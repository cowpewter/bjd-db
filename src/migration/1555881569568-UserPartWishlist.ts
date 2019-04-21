import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPartWishlist1555881569568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_61f9e44a5d6fc70c3250183530` ON `create_ban`");
        await queryRunner.query("DROP INDEX `IDX_17d1f3b665c9189e0ebb40b875` ON `edit_ban`");
        await queryRunner.query("ALTER TABLE `user_part` ADD `wishlistId` bigint NULL");
        await queryRunner.query("ALTER TABLE `user_description` CHANGE `description` `description` text NOT NULL");
        await queryRunner.query("ALTER TABLE `doll_configuration` CHANGE `height` `height` int NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `doll_description` CHANGE `description` `description` text NOT NULL");
        await queryRunner.query("ALTER TABLE `user_part` ADD CONSTRAINT `FK_6b3f8b17fcee47f6598706519e3` FOREIGN KEY (`wishlistId`) REFERENCES `doll_wishlist`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_part` DROP FOREIGN KEY `FK_6b3f8b17fcee47f6598706519e3`");
        await queryRunner.query("ALTER TABLE `doll_description` CHANGE `description` `description` text NOT NULL DEFAULT ''''");
        await queryRunner.query("ALTER TABLE `doll_configuration` CHANGE `height` `height` int NOT NULL");
        await queryRunner.query("ALTER TABLE `user_description` CHANGE `description` `description` text NOT NULL DEFAULT ''''");
        await queryRunner.query("ALTER TABLE `user_part` DROP COLUMN `wishlistId`");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_17d1f3b665c9189e0ebb40b875` ON `edit_ban` (`userId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_61f9e44a5d6fc70c3250183530` ON `create_ban` (`userId`)");
    }

}
