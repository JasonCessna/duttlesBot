
// Aligulac.com Functions
function aligulacGroupSeeding(sendMSG, allPlayerNames,tempPlayerID, allPlayerIDS, user, userID, channelID, message, evt){
	var set = '';
	var bracketName;
	var MSG = 'Seeding order with predicted results (based on Aligulac):\n ```PHP';
	for(i=0;i<tempPlayerID.length;i++){
		set += tempPlayerID[i];
		if (i != tempPlayerID.length-1)
			set += ',';
	}
	if (tempPlayerID.length > 0){
		console.log('http://aligulac.com/api/v1/predictrrgroup/' + set + '/?apikey=mI7ShQL8LhcHR4Cs5dck&format=json&bo=3');
		request.get('http://aligulac.com/api/v1/predictrrgroup/' + set + '/?apikey=mI7ShQL8LhcHR4Cs5dck&format=json&bo=3',
		function (error,response,body){
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				info = info.mtable;
				for (i=0;i<info.length;i++){
					tag = JSON.stringify(info[i].player.tag);
					tag = tag.substring(1,tag.length-1);
					id = JSON.stringify(info[i].player.id);
					wins = JSON.stringify(info[i].exp_match_wins);
					losses = JSON.stringify(info[i].exp_match_losses);
					for(j=0;j<allPlayerIDS.length;j++){
						if(allPlayerIDS[j] == id){
							bracketName = allPlayerNames[j];
							break;
						}
					}
					MSG += '\n' +  eval(i + 1) + ': ' + tag + ' - Expected Win/Loss: ' + Number(wins).toFixed(0) + '/' + Number(losses).toFixed(0);
				}
				MSG += '```';
				bot.sendMessage({
					to: channelID,
					message: MSG
				});
				tempPlayerID = [];
			}
			else{
				bot.sendMessage({
					to: channelID,
					message: body
				});
			}
		});
	}
	else 
		bot.sendMessage({
			to: channelID,
			message: 'No players found in aligulac. Try to seed by MMR instead.'
		});
}

function aligulacPlayer(sendMSG, name, user, userID, channelID, message, evt, iteration){
	request.get('http://aligulac.com/search/json/?q=' + name + '&apikey=' + api.ALIGULAC_API_KEY,
	 tempID = function (error,response,body){
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			var playerID = new Array();
			var playerTag = new Array();
			var playerRace = new Array();
			playerID[0] = 'null';
			if (info.players[0]){
				//console.log(info.players[0].tag)
				setTempID(JSON.stringify(info.players[0].id),iteration);
				setTempTag(JSON.stringify(info.players[0].tag),iteration);
				for(i=0;i<info.players.length;i++){
					playerID[i] = JSON.stringify(info.players[i].id);
					playerTag[i] = JSON.stringify(info.players[i].tag);
					playerRace[i] = JSON.stringify(info.players[i].race);
					playerTag[i] = playerTag[i].substring(1,playerTag[i].length-1);
					playerRace[i] = playerRace[i].substring(1,playerRace[i].length-1);
					
				}
				if (sendMSG)
				{
					var aligMSG = ' \nAligulac results for ' + name + ':\n```PHP';
					var WvsP = new Array();
					var WvsT = new Array();
					var WvsZ = new Array();
					var LvsP = new Array();
					var LvsT = new Array();
					var LvsZ = new Array();
					var rating = new Array();
					var iter = 0;
					for (i=0;i<playerID.length;i++){
						//console.log(i);
						request.get('http://aligulac.com/api/v1/player/' + playerID[i] + '/?apikey=' + api.ALIGULAC_API_KEY + '&format=json',
						function (error1,response1,body1){
							
								
							
							if (!error1 && response1.statusCode == 200) {
								var info2 = JSON.parse(body1);
									//console.log(info2)
								//console.log(info2.form.P[0])
								rating[i] = JSON.stringify(info2.rating);
								WvsP[iter] = JSON.stringify(info2.form.P[0]);
								LvsP[iter] = JSON.stringify(info2.form.P[1]);
								WvsT[iter] = JSON.stringify(info2.form.T[0]);
								LvsT[iter] = JSON.stringify(info2.form.T[1]);
								WvsZ[iter]  = JSON.stringify(info2.form.Z[0]);
								LvsZ[iter]  = JSON.stringify(info2.form.Z[1]);
								iter += 1;
							}
							else{ 
								aligMSG += 'Could not find additional data\n';
							}
						});
					}
					setTimeout(function(){
						for(i=0;i<info.players.length;i++){
							var totalT = eval(WvsT[i]) + eval(LvsT[i]);
							var totalP = eval(WvsP[i]) + eval(LvsP[i]);
							var totalZ = eval(WvsZ[i]) + eval(LvsZ[i]);
							aligMSG += '\nTag: ' + playerTag[i] + ', ID: ' + playerID[i] + ', Race: ' + playerRace[i];
							aligMSG += '\n Matchups:  vs Terran: ' + WvsT[i] + '-' + LvsT[i] + ' (';
							if (totalT > 0)
								aligMSG += eval(((eval(WvsT[i]) / totalT))*100).toFixed(0) + '%) ';
							else aligMSG += '0%)';
							aligMSG +=  ' vs Protoss: ' + WvsP[i] + '-' + LvsP[i] + ' (';
							if (totalP > 0)
								aligMSG += eval(((eval(WvsP[i]) / totalP))*100).toFixed(0) + '%) ';
							else aligMSG += '0%)';
							aligMSG +=  ' vs Zerg: ' + WvsZ[i] + '-' + LvsZ[i] + ' (';
							if (totalP > 0)
								aligMSG += eval(((eval(WvsZ[i]) / totalZ))*100).toFixed(0) + '%) ';
							else aligMSG += '0%)';
						}
						aligMSG += '```'
						bot.sendMessage({
							to: channelID,
							message: aligMSG
						});
					},2000);
					
				}
				
			}else{
				if(sendMSG){
					bot.sendMessage({
						to: channelID,
						message: name + ' not found in aligulac database.'
					});
				}
				else{
					
				}
			}
		}
		else {
			bot.sendMessage({
				to: channelID,
				message: name + ' had no results found in system due to this:\n' + body
			});
		}
	});
	//return tempID;
}	