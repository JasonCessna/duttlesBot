
// Battle Net Functions
function bnetMatchupStats(playerID,playerRace,ladderID){
	
	request.get('https://us.api.battle.net/data/sc2/ladder/'+ ladderID + '?locale=en_US&access_token='+ api.BNET_ACCESS_TOKEN,
	function (error,response,body){
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body)
			info = info.team;
			for(i=0;i<info.length;i++){
				if(info[i].member[0].legacy_link.id.trim() == playerID.trim()){
					var bnetMMR = info[i].rating;
					var bnetWins = info[i].wins;
					var bnetLosses = info[i].losses;
					var bnetTies = info[i].ties;
					var bnetRace = info[i].member[0].played_race_count[0].race;
					var bnetCharacterID = info[i].id;
					/* CURRENTLY NO RESULTS FOR MATCHUPS, SO FINDING THE LADDER IS OF NO USE WITH THE WEB SCRAPE TAKING MUCH LESS BANDWIDTH TO USE AND RETURNING ESSENTIALLY THE EXACT SAME RESULTS */
				}
			}	
		}
		else{
			console.log(response)
		}
	});
		
}

function bnetStats(playerID,playerName,playerRegion,playerRace){
	request.get('https://' + playerRegion.trim() + '.api.battle.net/sc2/profile/' + playerID.trim() + '/1/' + playerName.trim() + '/ladders?locale=en_US&apikey=' + api.BNET_API_KEY,
	function (error,response,body){
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			//console.log(body)
			if(info.currentSeason.length){
				info = info.currentSeason;
				for(i=0;i<info.length;i++){
					if (info[i].ladder[0] != '' && info[i].ladder[0] != null) {
						//console.log(info[i].ladder[0].matchMakingQueue)
						if(info[i].ladder[0].matchMakingQueue && info[i].ladder[0].matchMakingQueue.trim() == 'LOTV_SOLO')// && !info[i].nonRanked)
						{
							var playerLadder = info[i].ladder[0].ladderId;
							bnetMatchupStats(playerID,playerRace,playerLadder)			
						}
					}
				}
			}
		}
		else{
			console.log(response)
			
		}
	});
	
	
}