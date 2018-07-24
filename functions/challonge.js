

function challongeSubDirectory(url,user, userID, channelID, message, evt){
	var challongeMSG = 'Displaying open tournaments for ' + url + '\n```PHP\n';
	rp(webScrape('https://'+url+'.challonge.com/'))
		.then(($) => {
			var hrefs = new Array();
			var linkName = new Array();
			var ids = new Array();
			var j = 0;
			$('tr').find('.progress-bar-success').each(function(i,elem){

				var thisWidth = $(this).attr().style;
				
				if(thisWidth[6] == '0'){
					console.log(thisWidth)
					hrefs[j] = elem.parent.parent.parent.children[1].children[1].attribs.href;
					linkName[j] = elem.parent.parent.parent.children[1].children[1].children[0].data;
					
					j++
				}
				console.log(j)
				
			});
			for(i=0;i<j;i++){
				var x = 0;
				rp(webScrape(hrefs[i]))
				.then(($) => {
					
					$('div').find('#presence-mount').each(function(k,elem1){
						var temp = (($(this).attr()));
						ids[x] = temp['data-tournament-id'];
						challongeMSG += eval(eval(x)+1) + ' - (' + ids[x] + ') ' + linkName[x] + '\n      ' + hrefs[x] + '\n';
						x++;
						//console.log(challongeMSG)
					});
					
					
				})
				.catch((err1) => {
					console.log(err1)
				});
			}
			setTimeout(function(){	
				challongeMSG += '\n```';
				bot.sendMessage({
					to: channelID,
					message: challongeMSG
				});
			}
			,eval(1000));
		})
		.catch((err) => {
			console.log(err)
			});
}

