
// Create Global Variables
var tempPlayerID = new Array();
var tempPlayerTag = new Array();
var botMessage = '';
var blizzID = new Array();
var SC2Profile = new Array();
var structMMR = {};


		
// Global Variable Functions
function setTempID(b,){
	tempPlayerID[tempPlayerID.length] = b;
//	console.log(b);
}

function setTempTag(b,x){
	tempPlayerTag[x] = b.substring(1,b.length-1);
	console.log(tempPlayerTag[eval(x)] + ' ' + eval(x))
}

function setStructMMR(b,i){
	structMMR[b] = i;
	
}

function clearMSG(){
	botMessage = '';
}
	
function setMSG(msg){
	botMessage += msg;
}

function setPlaceHolder(i){
	var placeHolder = i;
}


function setBlizzID(ID){
	blizzID[blizzID.length] = ID;
}

function setSC2Profile(URL){
	SC2Profile[SC2Profile.length] = URL;
}	
