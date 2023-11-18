import { DataTypes } from 'sequelize';
import { db } from '../database/db.js'

const Specialty = db.define('Specialty', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  default_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  default_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'specialties',
  timestamps: false,
}
);

export default Specialty;
