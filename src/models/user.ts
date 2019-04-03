import * as Sequelize from 'sequelize';

interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  isAdmin: boolean;
  isMod: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;
type UserModel = Sequelize.Model<UserInstance, UserAttributes>;

export function initUser(sequalize: Sequelize.Sequelize): UserModel {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    isAdmin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    isMod: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  };
  const User = sequalize.define<UserInstance, UserAttributes>("User", attributes);
  return User;
};
