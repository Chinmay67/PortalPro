// Import Sequelize and DataTypes
import { Sequelize } from 'sequelize';

// Function to initialize and test Sequelize connection

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER,process.env.MYSQL_PASSWORD , {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });


  export default sequelize;