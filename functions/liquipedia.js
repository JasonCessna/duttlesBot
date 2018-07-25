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
/*
		<div class="fo-nttax-infobox wiki-bordercolor-light">
<div>
<div class="infobox-header wiki-backgroundcolor-light"><span class="infobox-buttons">[<a target="_blank" rel="nofollow noreferrer noopener" class="external text" href="https://liquipedia.net/starcraft2/index.php?title=Zealot_(Legacy_of_the_Void)&amp;action=edit&amp;section=0">e</a>][<a href="/starcraft2/Template:Infobox_unit" title="Template:Infobox unit">h</a>]</span><a href="/starcraft2/Protoss" title="Protoss"><img alt="" src="/commons/images/thumb/e/e4/ProtossIcon.png/30px-ProtossIcon.png" width="30" height="30" srcset="/commons/images/thumb/e/e4/ProtossIcon.png/45px-ProtossIcon.png 1.5x, /commons/images/thumb/e/e4/ProtossIcon.png/60px-ProtossIcon.png 2x"></a> Zealot</div>
</div><div>
<div class="infobox-image"><div class="center"><div class="floatnone"><a href="/starcraft2/File:Zealot_sc2.png" class="image"><img alt="" src="/commons/images/d/db/Zealot_sc2.png" width="600" height="632"></a></div></div></div>
</div><div>
<div class="infobox-header wiki-backgroundcolor-light infobox-header-2">Unit Information</div>
</div><div>
<div class="infobox-cell-2 infobox-description">Description:</div>
<div class="infobox-cell-2"> Ground Unit</div>
</div><div>
<div class="infobox-cell-2 infobox-description">Built From:</div>
<div class="infobox-cell-2"><a href="/starcraft2/Gateway_(Legacy_of_the_Void)" title="Gateway (Legacy of the Void)">Gateway</a></div>
</div><div>
<div class="infobox-cell-2 infobox-description">Cost:</div>
<div class="infobox-cell-2"><a href="/starcraft2/Minerals" title="Minerals"><img alt="" src="/commons/images/a/a4/Minerals.gif" width="14" height="14" style="vertical-align: baseline"></a> 100 <a href="/starcraft2/Gas" title="Gas"><img alt="" src="/commons/images/2/2e/Vespene-protoss.gif" width="15" height="15" style="vertical-align: baseline"></a> 0 <a href="/starcraft2/Game_Speed" title="Game Speed"><img alt="" src="/commons/images/a/a4/Buildtime_protoss.gif" width="18" height="16" style="vertical-align: baseline"></a> 27 <a href="/starcraft2/Supply" title="Supply"><img alt="" src="/commons/images/8/86/Supply-protoss.gif" width="16" height="16" style="vertical-align: baseline"></a> 2</div>
</div><div>
<div class="infobox-cell-2 infobox-description">Attributes:</div>
<div class="infobox-cell-2"><a href="/starcraft2/Light" title="Light">Light</a>, <a href="/starcraft2/Biological" title="Biological">Biological</a></div>
</div><div>
<div class="infobox-cell-2 infobox-description">Attack 1:</div>
<div class="infobox-cell-2"><table style="text-align:left;background-color:transparent" cellpadding="0" cellspacing="0">
		<tbody><tr valign="top"><td>Targets:</td><td>&nbsp;</td><td>Ground</td></tr><tr valign="top"><td>Damage:</td><td>&nbsp;</td><td>8 (+1) (x2)</td></tr><tr valign="top"><td><a href="/starcraft2/Damage_Per_Second" class="mw-redirect" title="Damage Per Second">DPS</a>:</td><td>&nbsp;</td><td>18.6 (+2.33)</td></tr><tr valign="top"><td><a href="/starcraft2/Cooldown" title="Cooldown">Cooldown</a>:</td><td>&nbsp;</td><td>0.86</td></tr><tr valign="top"><td><a href="/starcraft2/Range" title="Range">Range</a>:</td><td>&nbsp;</td><td>0.1</td></tr></tbody></table></div>
</div><div>
<div class="infobox-cell-2 infobox-description">Defence:</div>
<div class="infobox-cell-2"><a href="/starcraft2/File:Icon_Hitpoints.png" class="image"><img alt="" src="/commons/images/e/e2/Icon_Hitpoints.png" width="16" height="16"></a> 100 <a href="/starcraft2/Plasma_Shield" title="Plasma Shield"><img alt="" src="/commons/images/8/82/Icon_Shields.png" width="16" height="16"></a> 50 <a href="/starcraft2/Armor" title="Armor"><img alt="" src="/commons/images/5/5e/Icon_Armor.png" width="16" height="15"></a> 1 (+1)</div>
</div><div>
<div class="infobox-cell-2 infobox-description"><a href="/starcraft2/Hotkeys_per_Race" title="Hotkeys per Race">Hotkey</a>:</div>
<div class="infobox-cell-2"><span style="background-color: #F0F0F0; width: 32px; font-size: 9pt; border-style: outset; border-width: 2px; margin: 0px; padding: 0px 3px 0px 3px; clear: none"><b>Z</b></span></div>
</div><div>
<div class="infobox-cell-2 infobox-description">Sight:</div>
<div class="infobox-cell-2">9</div>
</div><div>
<div class="infobox-cell-2 infobox-description">Speed:</div>
<div class="infobox-cell-2">3.15<br>4.13 (+4.62) with <a href="/starcraft2/Charge" title="Charge">Charge</a></div>
</div><div>
<div class="infobox-cell-2 infobox-description">Cargo Size:</div>
<div class="infobox-cell-2">2</div>
</div><div>
<div class="infobox-cell-2 infobox-description">Strong against:</div>
<div class="infobox-cell-2">
<ul><li><a href="/starcraft2/Marauder_(Legacy_of_the_Void)" title="Marauder (Legacy of the Void)">Marauder</a></li>
<li><a href="/starcraft2/Immortal_(Legacy_of_the_Void)" title="Immortal (Legacy of the Void)">Immortal</a></li>
<li><a href="/starcraft2/Zergling_(Legacy_of_the_Void)" title="Zergling (Legacy of the Void)">Zergling</a></li></ul>
</div>
</div><div>
<div class="infobox-cell-2 infobox-description">Weak against:</div>
<div class="infobox-cell-2">
<ul><li><a href="/starcraft2/Hellion_(Legacy_of_the_Void)" title="Hellion (Legacy of the Void)">Hellion</a></li>
<li><a href="/starcraft2/Colossus_(Legacy_of_the_Void)" title="Colossus (Legacy of the Void)">Colossus</a></li>
<li><a href="/starcraft2/Roach_(Legacy_of_the_Void)" title="Roach (Legacy of the Void)">Roach</a></li></ul>
</div>
</div></div>
		
		*/