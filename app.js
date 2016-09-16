var Sequelize = require('sequelize');

var connection = new Sequelize('demo', 'postgres', 'Sweileh95', {
    dialect: 'postgres'
});


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



connection.sync({
  force: true
}).then(function() {

var currentTime = new Date();


//Select all items that occur within the next minute
Entity.findAll({
  where: {
    conference_time: {

      //Greater than or equal to current time
      $gte: new Date(currentTime.getTime()),

      //less than 1 minute from now
      $lt: new Date(currentTime.getTime() + 60*1000)
    }
  }
}).then(function(entities){

  //Display the result(s)
  entities.forEach(entityLog)
})


/*
  //Insert multiple items at once. For testing purposes
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
    ).then(function()
  {

  //Select all items that occur within the next minute
  Entity.findAll({
    where: {
      conference_time: {

        //Greater than or equal to current time
        $gte: new Date(currentTime.getTime()),

        //less than 1 minute from now
        $lt: new Date(currentTime.getTime() + 60*1000)
      }
    }
  }).then(function(entities){

    //Display the result(s)
    entities.forEach(entityLog)
  })

  })
*/

}).catch(function(error) {
    console.log(error);
});


// Display properties of the entities objects
var entityLog = function(currEntity) {
  console.dir(currEntity.get());
}
