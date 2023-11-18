import { DataTypes } from 'sequelize';
import { db } from '../database/db.js'

const User = db.define('User', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.CHAR(11),
    allowNull: false,
  },
  rg: {
    type: DataTypes.CHAR(9),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.CHAR(60),
    defaultValue: null,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

export default User;