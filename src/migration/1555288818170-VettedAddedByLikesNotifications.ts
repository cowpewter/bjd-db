import {MigrationInterface, QueryRunner} from "typeorm";

export class VettedAddedByLikesNotifications1555288818170 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `userId` `authorId` bigint NULL");
        await queryRunner.query("CREATE TABLE `create_ban` (`id` bigint NOT NULL AUTO_INCREMENT, `reason` varchar(255) NOT NULL, `createTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `edit_ban` (`id` bigint NOT NULL AUTO_INCREMENT, `reason` varchar(255) NOT NULL, `createTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `notification` (`id` bigint NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL, `read` tinyint NOT NULL, `data` text NOT NULL, `createTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `userId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `like` (`id` bigint NOT NULL AUTO_INCREMENT, `createTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `albumId` bigint NULL, `companyId` bigint NULL, `commentId` bigint NULL, `dollId` bigint NULL, `faceupArtistId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `resin_color` ADD `vetted` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `resin_color` ADD `addedById` bigint NULL");
        await queryRunner.query("ALTER TABLE `social_media_link` ADD `vetted` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `social_media_link` ADD `deleteTimestamp` timestamp NULL");
        await queryRunner.query("ALTER TABLE `social_media_link` ADD `addedById` bigint NULL");
        await queryRunner.query("ALTER TABLE `social_media_link` ADD `deletedById` bigint NULL");
        await queryRunner.query("ALTER TABLE `faceup_artist` ADD `vetted` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `faceup_artist` ADD `addedById` bigint NULL");
        await queryRunner.query("ALTER TABLE `company` ADD `vetted` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `company` ADD `addedById` bigint NULL");
        await queryRunner.query("ALTER TABLE `doll_part` ADD `vetted` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `doll_part` ADD `addedById` bigint NULL");
        await queryRunner.query("ALTER TABLE `notification` ADD CONSTRAINT `FK_1ced25315eb974b73391fb1c81b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `resin_color` ADD CONSTRAINT `FK_066348fdaa16de9cf27231e4db5` FOREIGN KEY (`addedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `social_media_link` ADD CONSTRAINT `FK_9c6885fce625413fa27c2a47e4e` FOREIGN KEY (`addedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `social_media_link` ADD CONSTRAINT `FK_274ba8974de12eaf03f353deceb` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `faceup_artist` ADD CONSTRAINT `FK_8dd8d02fd2d89f11e23e55b7ce3` FOREIGN KEY (`addedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_212222d4c6b03d8c66056fcf4f9` FOREIGN KEY (`albumId`) REFERENCES `album`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_a166a08b685e7f3a2cba749c8ee` FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_d86e0a3eeecc21faa0da415a18a` FOREIGN KEY (`commentId`) REFERENCES `comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_47f77f7bfa056e7a058c603afa5` FOREIGN KEY (`dollId`) REFERENCES `doll`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_75564bcf435cc3d409f3a13cf21` FOREIGN KEY (`faceupArtistId`) REFERENCES `faceup_artist`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `company` ADD CONSTRAINT `FK_bf2b3ac72bf08c68ea5a3504aa6` FOREIGN KEY (`addedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `doll_part` ADD CONSTRAINT `FK_240e11e60685ccb907da3496855` FOREIGN KEY (`addedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_276779da446413a0d79598d4fbd`");
        await queryRunner.query("ALTER TABLE `doll_part` DROP FOREIGN KEY `FK_240e11e60685ccb907da3496855`");
        await queryRunner.query("ALTER TABLE `company` DROP FOREIGN KEY `FK_bf2b3ac72bf08c68ea5a3504aa6`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_75564bcf435cc3d409f3a13cf21`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_47f77f7bfa056e7a058c603afa5`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_d86e0a3eeecc21faa0da415a18a`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_a166a08b685e7f3a2cba749c8ee`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_212222d4c6b03d8c66056fcf4f9`");
        await queryRunner.query("ALTER TABLE `faceup_artist` DROP FOREIGN KEY `FK_8dd8d02fd2d89f11e23e55b7ce3`");
        await queryRunner.query("ALTER TABLE `social_media_link` DROP FOREIGN KEY `FK_274ba8974de12eaf03f353deceb`");
        await queryRunner.query("ALTER TABLE `social_media_link` DROP FOREIGN KEY `FK_9c6885fce625413fa27c2a47e4e`");
        await queryRunner.query("ALTER TABLE `resin_color` DROP FOREIGN KEY `FK_066348fdaa16de9cf27231e4db5`");
        await queryRunner.query("ALTER TABLE `notification` DROP FOREIGN KEY `FK_1ced25315eb974b73391fb1c81b`");
        await queryRunner.query("ALTER TABLE `doll_part` DROP COLUMN `addedById`");
        await queryRunner.query("ALTER TABLE `doll_part` DROP COLUMN `vetted`");
        await queryRunner.query("ALTER TABLE `company` DROP COLUMN `addedById`");
        await queryRunner.query("ALTER TABLE `company` DROP COLUMN `vetted`");
        await queryRunner.query("ALTER TABLE `faceup_artist` DROP COLUMN `addedById`");
        await queryRunner.query("ALTER TABLE `faceup_artist` DROP COLUMN `vetted`");
        await queryRunner.query("ALTER TABLE `social_media_link` DROP COLUMN `deletedById`");
        await queryRunner.query("ALTER TABLE `social_media_link` DROP COLUMN `addedById`");
        await queryRunner.query("ALTER TABLE `social_media_link` DROP COLUMN `deleteTimestamp`");
        await queryRunner.query("ALTER TABLE `social_media_link` DROP COLUMN `vetted`");
        await queryRunner.query("ALTER TABLE `resin_color` DROP COLUMN `addedById`");
        await queryRunner.query("ALTER TABLE `resin_color` DROP COLUMN `vetted`");
        await queryRunner.query("DROP TABLE `like`");
        await queryRunner.query("DROP TABLE `notification`");
        await queryRunner.query("DROP TABLE `edit_ban`");
        await queryRunner.query("DROP TABLE `create_ban`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `authorId` `userId` bigint NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
