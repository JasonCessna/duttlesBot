//CANNOT GET WINSTON TO WORK?

var Discord = require('discord.io');
//var logger = require('winston');
var auth = require('./auth.json');
var api = require('./apiKey.json');
const blizzard = require('blizzard.js').initialize({ apikey: api.BNET_API_KEY });
const rp = require('request-promise');
const cheerio = require('cheerio');
const http = require('http')
const https = require('https')
const port = 3000
const request = require('request')

var fs = require('fs');

// include functions:
eval(fs.readFileSync('./functions/aligulac.js')+'');
eval(fs.readFileSync('./functions/challonge.js')+'');
eval(fs.readFileSync('./functions/sc2ReplayStats.js')+'');
eval(fs.readFileSync('./functions/bNet.js')+'');
eval(fs.readFileSync('./functions/setsAndGlobals.js')+'');
	
function webScrape(URI) {
	var options = {
	  uri: URI,
	  transform: function (body) {
		return cheerio.load(body);
	  }
	};
	return options;
}
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');


// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
   
});
bot.on('ready', function (evt) {
	//set game to display starcraft 4, not sure if this doesn't work because it's not a real game or what.
 //bot.duttlesBot.setPresence({ status: 'online', game: { name: 'Starcraft 4' } });
	
});


// MAIN BOT MESSAGE HANDLING
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0].toLowerCase();
        args = args.splice(1);
        switch(cmd) {
			case "november":
				bot.sendMessage({
						to: channelID,
						message: '```November, you have a command in mitosis gaming. It\'s where the bot calls you a weeb.```'
				});
			break
			case 'testing':
				bot.sendMessage({
						to: channelID,
						message: userID
				});
			break
			// !test responses
			case 'aligulac':
				if (args[0] == '' || !args[0])
				{
					bot.sendMessage({
						to: channelID,
						message: 'Provide a name to search Aligulac\'s page. Example: !aligulac Duttles'
				});
				}
				else{
					aligulacPlayer(1,args[0],user,userID,channelID,message,evt, 0);		
					tempPlayerID = new Array();
					tempPlayerTag = new Array();
				}
			break
			case 'update':
				bot.sendMessage({
						to: channelID,
						message: 'Respond with one of these options:\n 1 2 3, or type \'quit\' to exit'
				});
				var answer = 0;
				bot.on('message', function (user2, userID2, channelID, message2, evt2) {
					if (user2 == user && answer == 0){
						var args2 = message2.split(' ');
						var cmd2 = args2[0].toLowerCase();
						args2 = args2.splice(1);
						switch(cmd2) {
							case '1':
								bot.sendMessage({
									to: channelID,
									message: 'You selected One'
							});
							answer = 1;
							break
							case '2':
								bot.sendMessage({
									to: channelID,
									message: 'You selected Two'
							});
							answer = 1;
							break
							case '3':
								bot.sendMessage({
									to: channelID,
									message: 'You selected Three'
							});
							answer = 1;
							break
							case 'quit':
								answer = 1;
							break
							default:
								bot.sendMessage({
									to: channelID,
									message: 'Unrecognized command, please try again'
							});
							break	
						} 
					}
				});
				break
				
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			// !sc2stats
			case 'sc2stats':
				if(args[0] == '' || !args[0]){
					bot.sendMessage({
						to: channelID,
						message: 'Requires a player name to search. Example: !sc2stats Duttles'
					});
					break
				}
				else{
					if(args[1])
						SC2ReplayStatsSearch(1,args[0],'',args[1],user, userID, channelID, message, evt,0);
					else 
						SC2ReplayStatsSearch(1,args[0],'','',user, userID, channelID, message, evt,0);
					break
				}
            // !challonge
			case 'challonge':
				if (args[0] == '' || !args[0])
					args[0] = 'pending';
				if(args[0] == 'help') {
					bot.sendMessage({
						to: channelID,
						message: '```Supported !challonge commands: !challonge, SD <one-word sub directory>, seed <tournament id>,participants <tournament id>, all, pending, in_progress, ended.\n !challonge will give all pending Duttles Tournament results.\n !challonge seed <tournament id> will display the recommended seeding based on player\'s MMR. Requires the tournament id (can be found through !challonge <status>)```'
						});
						break
				}
				else if (args[0].toLowerCase() == 'sd')
				{
					if(args[1] && args[1] != ''){
					challongeSubDirectory(args[1],user, userID, channelID, message, evt)
					break
					}
					else
						bot.sendMessage({
						to: channelID,
						message: 'Provide a single-word sub-directory after ' + args[0] + '. Example: !challonge ' + args[0] + ' proxytempest'
						});	
						break
				}
				else if (args[0] == 'seed' || args[0] == 'participants'){
					var cont = 0;
					var allPlayerIDS = new Array();
					var allPlayerNames = new Array();
					if (args[1] == '' || !args[1]){
						bot.sendMessage({
						to: channelID,
						message: 'You must provide a tournament id after ' + args[0] + '. Example: !challonge ' + args[0] + ' 534400'
						});						
					}
					else {
						request.get('https://' + api.CHALLONGE_USERNAME + ':' + api.CHALLONGE_API_KEY + '@api.challonge.com/v1/tournaments/'+ args[1] + '/participants.json',
						function (error,response,body){
							if (!error && response.statusCode == 200) {
								var info = JSON.parse(body);
								
								var challongeMSG = 'Participants for Touranment ID (' + args[1] + ') \n';
								challongeMSG += '```PHP' 
								//if (args[0].toLowerCase() == 'participants')
									
								for (i=0;i<info.length;i++){
									var playerID = JSON.stringify(info[i].participant.id);
									//playerID = playerID.substring(1,playerID.length-1);
									var playerName = JSON.stringify(info[i].participant.display_name);
									playerName = playerName.substring(1,playerName.length-1);
									allPlayerNames[i] = playerName;
									
									challongeMSG += '\n' + eval(i+1);
									if (i>=9)
										challongeMSG += '  - ' ;
									else if (i>99)
										challongeMSG += ' - ' ;
									else challongeMSG += '   - ';
									
									challongeMSG += playerName + ' (' + playerID + ')';
									if (args[0] == 'seed')
									cont = 1;
								}	challongeMSG += '```';
								//console.log(allPlayerNames);
								if (args[0].toLowerCase() == 'participants'){
									bot.sendMessage({
										to: channelID,
										message: challongeMSG
									});
								}
								else if (args[0].toLowerCase() == 'seed') {
									if(!args[2])
										args[2] = ' ';
									if(args[2].toLowerCase() == 'aligulac'){
										for(i=0;i<allPlayerNames.length;i++){
											aligulacPlayer(0, allPlayerNames[i], user, userID, channelID, message, evt, eval(i))
											//msg += allPlayerIDS[i] + '\n';
											//console.log(tempPlayerID[i]);
										}
											setTimeout(function(){aligulacGroupSeeding(1, allPlayerNames, tempPlayerID, allPlayerIDS, user, userID, channelID, message, evt); console.log(tempPlayerID);},5000);
									}
									else{
										//console.log(allPlayerNames.length)
										sc2StatsGroupSeeding(allPlayerNames, user, userID, channelID, message, evt);
										
									}
								}
							}		
							else {
								bot.sendMessage({
								to: channelID,
								message: body
								});
							}
						});				
					}
					
					break
				}
				var challongeMSG =  '```PHP'
				challongeMSG += '\nCurrent Duttles Tournaments with the status "' + args[0].toUpperCase() + '".\n /## If the status is wrong, make sure to !challonge <all, pending, in_progress, ended>\n'
					
				request.get('https://' + api.CHALLONGE_USERNAME + ':' + api.CHALLONGE_API_KEY + '@api.challonge.com/v1/tournaments.json?state=' + args[0],
					function (error,response,body){
					if (!error && response.statusCode == 200) {
						var info = JSON.parse(body);
						
						for (i=0;i<info.length;i++){
							challongeMSG +=	'(' + JSON.stringify(info[i].tournament.id) + ') - ' + JSON.stringify(info[i].tournament.name).substring(1, JSON.stringify(info[i].tournament.name).length-1);
							if (!isNaN(JSON.stringify(info[i].tournament.start_at)[1])){
								challongeMSG += ' Date: ';
								for(k=1;k<10;k++) {challongeMSG += JSON.stringify(info[i].tournament.start_at)[k]}
								challongeMSG += ' (';
								for (j = 12;j<17;j++) {challongeMSG +=  JSON.stringify(info[i].tournament.start_at)[j]}
								challongeMSG += ')';
							}
							challongeMSG += ' URL: ' + JSON.stringify(info[i].tournament.full_challonge_url);
							if(info.length > i) { challongeMSG += '\n';} 
							
						};challongeMSG += '```';
						bot.sendMessage({
							to: channelID,
							message: challongeMSG
						});
					}
					else {
						bot.sendMessage({
						to: channelID,
						message: body
						});
					}
				});
				
				break;
         }
     }
	 
});
function stateChange(newState) {
    setTimeout(function () {
        if (newState == -1) {
            alert('VIDEO HAS STOPPED');
        }
    }, 5000);
}
