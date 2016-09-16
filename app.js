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
    Entity.create({
        conference_time: new Date(),
        meeting_subject: 'earnings call'
    })
}).catch(function(error) {
    console.log(error);
});
