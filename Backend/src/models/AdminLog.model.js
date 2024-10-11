import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConfig.js';

const Log = sequelize.define('Log', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'logs',
  timestamps: false,
});

export default Log;
