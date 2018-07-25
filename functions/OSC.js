// OSC seeding function

const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');


function OSCGroupSeeding(allPlayerNames,user,userID,channelID,message,evt){
	bot.sendMessage({
		to: channelID,
		message: 'Seeding based on OSC Rankings. A lot of number crunching going on, this may take a minute...'
	});
	var timeout1 = eval(allPlayerNames.length)*400;
	var timeout2 = eval(timeout1)*2;
	var set = '';
	var bracketName;
	var MSG = '**Seeding Order Based on OSC Rankings**: ```PHP';
	
	for(i=0;i<allPlayerNames.length;i++){
		aligulacPlayer(0, allPlayerNames[i], user, userID, channelID, message, evt, i);
	}
	setTimeout(function(){	
		for(i=0;i<allPlayerNames.length;i++){
			console.log(tempPlayerTag[i] + ' ' + allPlayerNames[i])
			if(tempPlayerTag[i])
				var thisName = tempPlayerTag[i]
			else
				var thisName = allPlayerNames[i]
			
				OSCRankingsSearch(0,thisName,allPlayerNames[i],user, userID, channelID, message, evt,(i+1));
				
		}
	},eval(timeout1));
	
	setTimeout(function(){			
			var j = 0;
			console.log(structMMR)
			for(var key in keys=Object.keys(structMMR).sort(function(a, b){return a-b}).reverse() ){
				var prop = keys[key];
				var osc = prop;
				var iteration = j + 1;
				if (osc < 1)
					osc = 'Not Found'
				MSG += '\n' +  iteration + ': ' + structMMR[prop] + ' - OSC Ranking: ' + osc;
				j++;
			}
			MSG += '```';
			bot.sendMessage({
				to: channelID,
				message: MSG
			});
			structMMR = {};
			tempPlayerTag = new Array();
			tempPlayerID = new Array();
		},eval(timeout2));
	
}

function OSCRankingsSearch(sendMSG,placeHolderName,searchName,user,userID,channelID,message,evt,iteration){	
	request.get('https://sheets.googleapis.com/v4/spreadsheets/1PpG3jsJLiojyTRvKgSOljNVcDtmbJb8KCYg9QGO-1gg/values/OSC6!B%3AC?key=' + api.GOOGLE_API,function (error,response,body){
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			var playerFound = 0;
			var returnOSC = -iteration;
			var thisPlayer = '';
			//console.log(body)
			for(i=0;i<info.values.length;i++){
				if(info.values[i][1].toLowerCase() == searchName.toLowerCase()){
					returnOSC = info.values[i][0].toLowerCase();
					thisPlayer = info.values[i][1];
					playerFound = 1;
					console.log(i + ' ' + info.values[i][1].toLowerCase() + ' ' + info.values[i][0].toLowerCase())
				}
				
			}
			if(sendMSG) {
				if(playerFound)
					bot.sendMessage({
						to: channelID,
						message: '```PHP\nOSC Ranking for ' + thisPlayer + ': ' + returnOSC + '```'
					});
				else
						bot.sendMessage({
						to: channelID,
						message: '```PHP\nNo OSC Rankings Found for '+ searchName + '```'
					});
			}
			else{
				setStructMMR(returnOSC,placeHolderName);				
			}
		}
		
		else {
			if(error)
				console.log(error)
			else
				console.log(body)
			
		}
	});
	
}
