import {MigrationInterface, QueryRunner} from "typeorm";

export class ExtraPartsToAccessories1556225389558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doll_configuration_extra_parts_user_part` DROP FOREIGN KEY `FK_25c9ff9822e0cec3e04af3aa99e`");
        await queryRunner.query("ALTER TABLE `doll_configuration_extra_parts_user_part` DROP FOREIGN KEY `FK_948ede8f15d42224f3cdb9e5189`");
        await queryRunner.query("DROP TABLE `doll_configuration_extra_parts_user_part`");
        await queryRunner.query("CREATE TABLE `doll_configuration_accessories_user_part` (`dollConfigurationId` bigint NOT NULL, `userPartId` bigint NOT NULL, INDEX `IDX_d49a926e5af1e1ab90c357d4e9` (`dollConfigurationId`), INDEX `IDX_081138bcb705fd3382681b190e` (`userPartId`), PRIMARY KEY (`dollConfigurationId`, `userPartId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `doll_configuration` CHANGE `height` `height` int NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `doll_configuration_accessories_user_part` ADD CONSTRAINT `FK_d49a926e5af1e1ab90c357d4e9b` FOREIGN KEY (`dollConfigurationId`) REFERENCES `doll_configuration`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `doll_configuration_accessories_user_part` ADD CONSTRAINT `FK_081138bcb705fd3382681b190e8` FOREIGN KEY (`userPartId`) REFERENCES `user_part`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doll_configuration_accessories_user_part` DROP FOREIGN KEY `FK_081138bcb705fd3382681b190e8`");
        await queryRunner.query("ALTER TABLE `doll_configuration_accessories_user_part` DROP FOREIGN KEY `FK_d49a926e5af1e1ab90c357d4e9b`");
        await queryRunner.query("ALTER TABLE `doll_configuration` CHANGE `height` `height` int NULL");
        await queryRunner.query("DROP INDEX `IDX_081138bcb705fd3382681b190e` ON `doll_configuration_accessories_user_part`");
        await queryRunner.query("DROP INDEX `IDX_d49a926e5af1e1ab90c357d4e9` ON `doll_configuration_accessories_user_part`");
        await queryRunner.query("DROP TABLE `doll_configuration_accessories_user_part`");
        await queryRunner.query("CREATE TABLE `doll_configuration_extra_parts_user_part` (`dollConfigurationId` bigint(20) NOT NULL, `userPartId` bigint(20) NOT NULL, PRIMARY KEY (`dollConfigurationId`,`userPartId`), KEY `IDX_948ede8f15d42224f3cdb9e518` (`dollConfigurationId`), KEY `IDX_25c9ff9822e0cec3e04af3aa99` (`userPartId`), CONSTRAINT `FK_25c9ff9822e0cec3e04af3aa99e` FOREIGN KEY (`userPartId`) REFERENCES `user_part` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT `FK_948ede8f15d42224f3cdb9e5189` FOREIGN KEY (`dollConfigurationId`) REFERENCES `doll_configuration` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    }

}
