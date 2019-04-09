import * as S3 from 'aws-sdk/clients/s3';
import { Connection } from 'typeorm';
import { getConnection as dbConnection } from './mysql';
import { getConnection as s3Connection } from './s3';

export interface Connections {
  mysql: Connection;
  s3: S3;
}

export const getConnections = async (): Promise<Connections> => {
  return {
    mysql: await dbConnection(),
    s3: await s3Connection(),
  };
};
