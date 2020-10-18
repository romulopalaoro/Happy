import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602796276448 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    //realizar alterações: criar nova tabela, criar novo campo,...
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true, //sempre numero positivo
          isPrimary: true,
          isGenerated: true, //gerada automaticamente
          generationStrategy: 'increment', //cada registro novo ele incrementa o id.
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar'
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
   //desfazer o que foi feito no "up"
   await queryRunner.dropTable('orphanages');
  }

}
//para criar a tabela => yarn typeorm migration:run
