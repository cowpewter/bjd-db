import {MigrationInterface, QueryRunner} from "typeorm";

export class ColorTypeToColorFamily1555634976530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `resin_color` CHANGE `colorType` `colorFamily` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `resin_color` CHANGE `colorFamily` `colorType` varchar(255) NOT NULL");
    }

}
