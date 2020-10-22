require('dotenv').config();
let express = require('express');
const app = express();
const sequelize = require('./db');

let workoutLog = require('./controllers/workoutcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());
app.use('/test', function(req,res){
    res.send('This is the test endpoint on the workout log server...');
});

app.use('/user', user);

app.use('/log', workoutLog);

app.listen(process.env.PORT, function(){
    console.log(`The app is listening on port ${process.env.PORT}`);
})

