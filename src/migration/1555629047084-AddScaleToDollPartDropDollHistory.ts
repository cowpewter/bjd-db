import {MigrationInterface, QueryRunner} from "typeorm";

export class AddScaleToDollPartDropDollHistory1555629047084 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doll_part` ADD `scale` varchar(255) NOT NULL");
        await queryRunner.query("DROP TABLE `doll_history`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `doll_history` (`id` bigint NOT NULL AUTO_INCREMENT, `purchaseDate` datetime NULL, `arrivalDate` datetime NULL, `purchasedFrom` varchar(255) NULL, `paid` int NULL, `traded` varchar(255) NULL, `tradeValue` int NULL, `createTimestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateTimestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `doll_part` DROP COLUMN `scale`");
    }

}
