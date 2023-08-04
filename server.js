require('dotenv').config();
const sequelize = require('./app/config/db.config.js');
const Index = require('./app/models/index.js');

const server = new Index(sequelize);


server.listen();

// async function createDatabase() {
//     try {
//         await sequelize.sync({ force: true });
//         server.listen();
//     } catch (error) {
//         console.error('Error al crear la base de datos:', error);
//     }
// }

// createDatabase();