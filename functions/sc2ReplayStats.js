



// SC2ReplayStats.com Functions
function SC2ReplayStatsSearch(sendMSG,name,placeHolderName,desiredRace,user, userID, channelID, message, evt,iteration){
	
	var playerName = new Array();
	var playerRace = new Array();
	var playerLeague = new Array();
	var playerLeagueNum = new Array();
	var playerMMR = new Array();
	var playerStatsProfile = new Array();
	var playerSC2Profile = new Array();
	var playerRankedFTW = new Array();
	var playerRegion = new Array();
	var playerID = new Array();
	var playerWins = new Array();
	var playerLosses = new Array();
	var totalCount = 0;
	var returnMMR = -iteration;
	var returnName = '';
	
	rp(webScrape('http://sc2replaystats.com/ladder/search?server=all&type=1v1&player=' + name)).then(($) => {
		$('th:contains(Player)').parents('table').find('tr').each(function(i,elem){
			var tds = $(elem).find('td');
			if (i>0){
				playerLeagueNum[eval(i-1)] = ($(tds.eq(0)).text().trim())[0]
				playerName[eval(i-1)] = ($(tds.eq(0)).text().trim()).substring(1).trim();
				playerMMR[eval(i-1)] = ($(tds.eq(1)).text())[0];
				playerWins[eval(i-1)] = ($(tds.eq(3)).text().trim()).trim();
				playerLosses[eval(i-1)] = ($(tds.eq(4)).text().trim()).trim();
				for(j=1;j<4;j++)
					playerMMR[eval(i-1)] += ($(tds.eq(1)).text())[j];
			}
		});
		$('tr').find('.races').each(function(i,elem){
			var race = $(this).attr().class.split(' ')[1];
			playerRace[eval(i)] = race[0].toUpperCase();
			playerRace[eval(i)] +=  race.substring(1);
		});
		$('tr').find('.leagues').each(function(i,elem){
			if (eval((i+1) % 2) == 1){
				var league = $(this).attr().class.split('-')[1];
				playerLeague[eval((i + (i % 2))/2)] = league[0].toUpperCase();
				playerLeague[eval((i + (i % 2))/2)] += league.substring(1);
				//console.log(eval((i + (i % 2))/2)+ ' ' + eval((i+1) % 2))
			}
		});
		$('tr').find('.flag').each(function(i,elem){
			var region = $(this).attr().class.split('-')[1];
			playerRegion[i] = region.toUpperCase();
		});
		$('a').each(function(i,elem){
			if($(this).text().trim().toLowerCase() == 'sc2replaystats profile'){
				if(i>0){
					var hrefURL = $(this).attr().href;
					playerStatsProfile[eval(((i-1)-24)/4)] = 'https://sc2replaystats.com' + hrefURL;
				}
			}
		});
		$('a').each(function(i,elem){
			if($(this).text().trim().toLowerCase() == 'battle.net profile'){
				if(i>0){
					var hrefURL = $(this).attr().href;
					var splitURL = hrefURL.split('/');
					playerID[eval(((i)-26)/4)] = splitURL[6];
					playerSC2Profile[eval(((i)-26)/4)] = hrefURL;
					var current = eval(((i)-26)/4);
					
					rp(webScrape('http://www.rankedftw.com/search/?name=' + hrefURL)).then(($) => {
						$('a').each(function(j,elem2){
							if($(this).text().trim().toLowerCase() == '1v1'){
								if(j>0){
									var rankedFTW = $(this).attr().href;
									playerRankedFTW[current] = 'https://rankedFTW.com' + rankedFTW;
								}
							}
						});
					
					})
					.catch((err) => {
						console.log(err);
						
					});
				}
			}
		});
		var MSG = 'SC2ReplayStatist Search Results for **' + name + '**\n```CSS';
		if (playerName.length > 5)
			var length = 5;
		else if (playerName.length < 1)
			MSG = 'No SC2ReplayStatist Results for ' + name;
		else
			var length = playerName.length;
		
		var sortMMR = {};
		var sortPlayerName = {};
		var sortPlayerRace = {};
		var sortPlayerLeague = {};
		var sortPlayerLeagueNum = {};
		var sortPlayerStatsProfile = {};
		var sortPlayerSC2Profile = {};
		var sortPlayerRankedFTW = {};
		var sortPlayerRegion = {};
		var sortPlayerID = {};
		var sortPlayerWins = {};
		var sortPlayerLosses = {};
		
		// calledIDs commented for explination below
		//var calledIDs = {};
		setTimeout(function(current){	
			for( var i=0,n=playerMMR.length; i<n; i++){
			  sortMMR[playerMMR[i]] = playerMMR[i];
			  sortPlayerName[playerMMR[i]] = playerName[i];
			  sortPlayerRace[playerMMR[i]] = playerRace[i];
			  sortPlayerLeague[playerMMR[i]] = playerLeague[i];
			  sortPlayerLeagueNum[playerMMR[i]] = playerLeagueNum[i];
			  sortPlayerStatsProfile[playerMMR[i]] = playerStatsProfile[i];
			  sortPlayerSC2Profile[playerMMR[i]] = playerSC2Profile[i];
			  sortPlayerRankedFTW[playerMMR[i]] = playerRankedFTW[i];
			  sortPlayerRegion[playerMMR[i]] = playerRegion[i];
			  sortPlayerID[playerMMR[i]] = playerID[i];
			  sortPlayerWins[playerMMR[i]] = playerWins[i];
			  sortPlayerLosses[playerMMR[i]] = playerLosses[i];
			}
			var i = 1;		
			for( var key in keys=Object.keys(sortMMR).sort().reverse() ){
				if(i < 6){
					var prop = keys[key];
					
					if(sortPlayerRace[prop].toLowerCase() == desiredRace.toLowerCase() || desiredRace == ''){
						if(i == 1) {
						returnMMR = sortMMR[prop]; returnName = sortPlayerName[prop]}
						var totalGames = eval(eval(sortPlayerWins[prop])+eval(sortPlayerLosses[prop]));
						var winRate = (eval(eval(sortPlayerWins[prop])/eval(totalGames))*100).toFixed(0);
						if (sortPlayerRace[playerMMR[i]] == 'Zerg')
							var ftwRace = 0;
						else if (sortPlayerRace[playerMMR[i]] == 'Tterran')
							var ftwRace = 1;							
						else if (sortPlayerRace[playerMMR[i]] == 'Protoss')
							var ftwRace = 2;							
						else 
							var ftwRace = 3;
						
						
						
		 /* 		
			THIS IS FOR COMPARING SC2STATS INFORMATION WITH BATTLE.NET'S API; HOWEVER AFTER TESTING THE INFORMATION IS ALMOST THE SAME (keeping in case there's an update made for the character_link piece in the battlenet API)
			===============================
					 if(typeof calledIDs[sortPlayerID[prop]] === 'undefined'){
						  var matchups = bnetStats(sortPlayerID[prop],sortPlayerName[prop],sortPlayerRegion[prop],sortPlayerRace[prop]);
						  calledIDs[sortPlayerID[prop]] = sortPlayerID[prop];
					  }
		  */	
						MSG += '\n' + eval(i) + ': ' + sortPlayerName[prop] + ' [' + sortPlayerRace[prop] + '].' + sortPlayerLeague[prop] + ' ' + sortPlayerLeagueNum[prop] + ' [' + sortPlayerRegion[prop] + '] {MMR:' + sortMMR[prop] + '} {Games: ' + eval(totalGames) + '} {WR:' + eval(winRate) + '%(' + eval(sortPlayerWins[prop]) + '-' + eval(sortPlayerLosses[prop]) + ')} #' + sortPlayerID[prop] + '\n/***   SC2ReplayStats: ' + sortPlayerStatsProfile[prop] + '   feel */\n/***   BNet: ' + sortPlayerSC2Profile[prop] + ' */\n/***   RankedFTW: ' + sortPlayerRankedFTW[prop] + '#ra=' + ftwRace + ' */';
						i++;
					}
				}
			}
			if (i > 1){
				//MSG += '\n==============================================================';
				//MSG += '\n##/*   RankedFTW: http://rankedftw.com/search/?name=' + name + '   */##```';
				MSG += '```';
			}
			else MSG += '\n``` No results for ' + name + ' ' + desiredRace + '```';
			if (sendMSG == 1)
			bot.sendMessage({
				to: channelID,
				message: MSG
			});
			else{
				setStructMMR(returnMMR,placeHolderName);
				console.log(returnName + ' ' + returnMMR)
				return returnMMR;
			}
		},2000);
		
				
		
	})
	.catch((err) => {
		console.log(err);
		bot.sendMessage({
			to: channelID,
			message: 'An error occured:\n`' + err + '`\nPlease try again in a minute.'
		});
	});
}

function sc2StatsGroupSeeding(allPlayerNames,user,userID,channelID,message,evt){
	bot.sendMessage({
		to: channelID,
		message: 'Seeding based on MMR. A lot of number crunching going on, this may take a minute...'
	});
	var timeout1 = eval(allPlayerNames.length)*400;
	var timeout2 = eval(timeout1)*2;
	var set = '';
	var bracketName;
	var MSG = '**Seeding Order Based on MMR** (sc2ReplayStats Name Search): ```PHP';
	
	//console.log(allPlayerNames.length)
	
	/*   NEW TIMEOUT HERE */
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
			//structMMR[allPlayerNames[i]] = 
			SC2ReplayStatsSearch(0,thisName,allPlayerNames[i],'',user, userID, channelID, message, evt,(i+1));
		}
	},eval(timeout1));
	
	setTimeout(function(){			
			var j = 0;
			for(var key in keys=Object.keys(structMMR).sort().reverse() ){
				var prop = keys[key];
				var mmr = prop;
				var iteration = j + 1;
				if (mmr < 1)
					mmr = 'Not Found'
				MSG += '\n' +  iteration + ': ' + structMMR[prop] + ' - MMR: ' + mmr;
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
