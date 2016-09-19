var Sequelize = require('sequelize');

var connection;

var Entity;


function setup(dbName, username, password) {
    connection = new Sequelize(dbName, username, password, {
        dialect: 'postgres'
    });

    //Define the entity model
    Entity = connection.define('conference_transcription_db', {
        UUID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        voicebase_rating: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        watson_rating: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

}

//Exporting this function for external usage.
exports.insertInfo = function(dbName, username, password, uuid, ratingWatson, ratingVoicebase, email) {

    setup(dbName, username, password);

    connection.sync().then(function() {

        //Constructing the data object
        var data = {
            UUID: uuid,
            voicebase_rating: ratingVoicebase,
            watson_rating: ratingWatson,
            user_email: email
        };

        //Insert the data and verify
        Entity.create(data).then(function(post) {
            console.dir(post.get());
        })

    }).catch(function(error) {
        console.log(error);
    });

}

exports.getStats = function(dbName, username, password) {

    var result = {};

    var numRatings;

    var sumWatson = 0;
    var sumVoicebase = 0;

    var meanWatson = 0;
    var meanVoicebase = 0;

    setup(dbName, username, password);

    //Select all items that occur within the next minute
    Entity.findAll().then(function(entities) {
        numRatings = entities.length;

        entities.forEach(calcStats);

        meanWatson = sumWatson / numRatings;
        meanVoicebase = sumVoicebase / numRatings;

        result.numWatsonRatings = numRatings;
        result.numVoicebaseRatings = numRatings;
        result.meanWatsonRatings = meanWatson;
        result.meanVoicebaseRatings = meanVoicebase;
        console.log(result);
        return result;
    })


    // Display properties of the entities objects
    var calcStats = function(currEntity) {
        sumWatson += currEntity.watson_rating;
        sumVoicebase += currEntity.voicebase_rating;

    }

}
