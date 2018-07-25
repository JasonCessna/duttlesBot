//Liquipedia Unit Call
//LiquipediaUnit('zealot','',1,'1','test','test');
function LiquipediaUnit(name,user, userID, channelID, message, evt,iteration){
	name = name.charAt(0).toUpperCase() + name.substr(1);
	var content = new Array();
	var MSG = '```md\nUnit Information for ' + name + ':\n';
	if(iteration < 2){
		if(iteration == 1)
			name += '_(Legacy_of_the_Void)';
		rp(webScrape('https://liquipedia.net/starcraft2/' + name)).then(($) => {
			
			$('div').find('.infobox-cell-2').each(function(i,elem){
				content[i] = ($(this).text().trim());
				//console.log(content[i] + ' ' + eval(i));
				
				if(i>0  && (eval(i%2) == 1))
					if(content[i-1] == 'Cost:'){
						//console.log(content[i] + '!!!!!!!!')
						var cost = content[i].split('  ')
						if(!cost[0]) cost[0] = 0;
						if(!cost[1]) cost[1] = 0;
						if(!cost[2]) cost[2] = 0;
						if(!cost[3]) cost[3] = 0;
					MSG += cost[0] + ' Minerals, ' + cost[1] + ' Gas, ' + cost[2] + ' Second Build-Time, ' + cost[3] + ' Supply ]\n';
					}
					else if(content[i-1] == 'Defence:'){
						//console.log(content[i] + '!!!!!!!!')
						var cost = content[i].split('  ')
						if(!cost[0]) cost[0] = 0;
						if(!cost[1]) cost[1] = 0;
						if(cost[2])
							var exra = ', ' + cost[2] + ' Shields ]\n';
						else
							var extra = ']\n';
					MSG += cost[0] + ' Health, ' + cost[1] + ' Armor' + extra;
					}
					else if (content[i-1].split(' ')[1] && content[i-1].split(' ')[1].toLowerCase() == 'against:'){
						var units = content[i].split('\n');
						console.log(units)
						MSG += units[0];
						for(x=1;x<units.length;x++){
							MSG += ', ' + units[x];
						}
					MSG += ' ]\n'
					}
					else{
					MSG += content[i] + ' ]\n';
					}
				else{
					
					MSG += '[ ' + content[i] + ' ][ ';
				}
			});
			MSG += 'Credit to <RoyalAlchemist> for the idea and <Liquipedia> for the information.```';
			//console.log(MSG)
			bot.sendMessage({
				to: channelID,
				message: MSG
			});
				

		}).catch((err) => {
			 LiquipediaUnit(name,user, userID, channelID, message, evt,1)
			console.log(err);
			
		});
	}
}		