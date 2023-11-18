import { DataTypes } from 'sequelize';
import { db } from '../database/db.js'

const Translation = db.define('Translation', {
  specialty_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  language_code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  translated_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  translated_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  local_currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'translations',
  timestamps: false,
});

export default Translation;
