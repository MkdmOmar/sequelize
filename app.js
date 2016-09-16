var Sequelize = require('sequelize');

var connection = new Sequelize('demo', 'postgres', 'Sweileh95', {
    dialect: 'postgres'
});

/*
var Article = connection.define('article', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});
*/

var Entity = connection.define('conference_transcription_db', {
    conference_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    meeting_subject: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

connection.sync().then(function() {

var currentTime = new Date();
/*
var tenSecPlus = new Date();
var fortySecPlus = new Date();
var twoMinPlus = new Date();
 tenSecPlus = currentTime.setSeconds(currentTime.getSeconds + 10);
 fortySecPlus = currentTime.setSeconds(currentTime.getSeconds + 40);
 twoMinPlus = currentTime.setMinutes(currentTime.getMinutes + 2);
*/

  //Insert multiple items at once
    Entity.bulkCreate(
      [

      //current time
      {
        conference_time: currentTime,
        meeting_subject: 'Conference call now'
      },

        //10 seconds later
        {
        conference_time: new Date(currentTime.getTime() + 10*1000),
        meeting_subject: 'Conference call +10sec'
      },

        //40 seconds later
        {
        conference_time: new Date(currentTime.getTime() + 40*1000),
        meeting_subject: 'Conference call +20sec'
      },

        //2 minutes later
        {
        conference_time: new Date(currentTime.getTime() + 2*60*1000),
        meeting_subject: 'Conference call +2min'
      }
      ]
    )
}).catch(function(error) {
    console.log(error);
});
