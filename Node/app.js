/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
const result = require('dotenv').config();

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3988, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
   // openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

bot.on('conversationUpdate', function (activity) {

    // when user joins conversation, send welcome message

    if (activity.membersAdded) {

        activity.membersAdded.forEach(function (identity) {

            //console.log(activity);

            if (identity.id === activity.address.bot.id) {

                //bot.beginDialog(activity.address, 'welcomemsg');

            }

        });

    }

});

bot.dialog('/', function (session) {
    session.send('You said that:' + session.message.text);
});