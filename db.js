const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', '1150pass', {
    host: 'localhost',
    dialect: 'postgres'
  });

sequelize.authenticate().then(
    function(){
        console.log('connected to workout-log postgres database');
    },
    function(err){
        console.log(err);
    }
);
//found in documentation, not working with await/async
//  try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

module.exports = sequelize;