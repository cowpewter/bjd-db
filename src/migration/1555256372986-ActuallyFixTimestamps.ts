import {MigrationInterface, QueryRunner} from "typeorm";

export class ActuallyFixTimestamps1555256372986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `resin_color` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `faceup_artist` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll_wishlist` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `subscription_tag` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `email_address` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `image` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `jwt` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `purchase` CHANGE `purchaseDate` `purchaseDate` timestamp NULL");
        await queryRunner.query("ALTER TABLE `purchase` CHANGE `arrivalDate` `arrivalDate` timestamp NULL");
        await queryRunner.query("ALTER TABLE `purchase` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user_description` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `social_media_link` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `company` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll_part` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user_part` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll_configuration` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll_description` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `album` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `album` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll_description` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll_configuration` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user_part` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll_part` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `company` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `social_media_link` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user_description` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `purchase` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `purchase` CHANGE `arrivalDate` `arrivalDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'");
        await queryRunner.query("ALTER TABLE `purchase` CHANGE `purchaseDate` `purchaseDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `jwt` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `image` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `email_address` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `subscription_tag` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `doll_wishlist` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `faceup_artist` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `resin_color` CHANGE `updateTimestamp` `updateTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

}
