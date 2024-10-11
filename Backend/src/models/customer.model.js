import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConfig.js';

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  // Auto-increment the ID field
    primaryKey: true,     // Mark this as the primary key
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pdfUrl: {
    type: DataTypes.STRING,
    allowNull: true, // Stores the URL to the generated PDF
  },
  userId:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'customers',
  timestamps: true,
});

export default Customer;
