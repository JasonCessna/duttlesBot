

function SC2ReplayStats(players_id,name,race,user, userID, channelID, message, evt){
	request.get('http://api.sc2replaystats.com/player?player_id=' + players_id,
		{
			headers: {
				'Authorization': api.SC2STATS_API_KEY
			},
			json: {
				'player_id': players_id
			}
		},
	function (error,response,body){
		if (!error && response.statusCode == 200) {
			//var info = JSON.parse(body);
			console.log(body);
			
		}
		else{
			console.log('error');
			console.log(response)
		}
	
	});
	

}	

	
function SC2ReplayStatsSearch(name,race,user, userID, channelID, message, evt){
	var playerName = new Array();
	var playerRace = new Array();
	var playerLeague = new Array();
	var playerLeagueNum = new Array();
	var playerMMR = new Array();
	var playerStatsProfile = new Array();
	var playerSC2Profile = new Array();
	var playerRegion = new Array();
	var playerID = new Array();
	var totalCount = 0;
	
	request.post('http://api.sc2replaystats.com/player/search?players name=' + name ,
		{
			headers: {
				'Authorization': api.SC2STATS_API_KEY
			},
			form: {
				'players_name': name,
				'race': race
			}
		},
	function (error,response,body){
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log(info.items[0].players_id);
			SC2ReplayStats(info.items[0].players_id,name,race,user, userID, channelID, message, evt);
		}
		else{
			console.log('error');
			console.log(response)
		}
	
	});
	