//=============================================================================
// Enigma Dragons Track by ZavixDragon
// ED_Track.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc Track how many times a thing occurs by using plugin command.
 * @author ZavixDragon
 *
 * @param Track Battle Start
 * @desc At the start of battle sends "Started " + troop info.
 * @default false
 *
 * @param Track Battle Victory
 * @desc After a victory sends "Won " + troop info.
 * @default true
 *
 * @param Track Battle Defeat
 * @desc After a defeat sends "Lost " + troop info.
 * @default true
 *
 * @param Track Battle Abort/Escape
 * @desc After a abort sends "Aborted " + troop info.
 * @default true
 *
 * @param Troop Info Formatter
 * @desc Function used for formatting troop info, returns a string.
 * If empty default will be used.
 * @default 
 *
 * @help
 * Just add a plugin command like this 
 * Track I can write whatever I want to track here
 */
//=============================================================================
var battleResultSent = false;
var ED_Track_BattleManager_startBattle = BattleManager.startBattle;
if(String(PluginManager.parameters('ED_Track')['Track Battle Start']) == "true"){
    BattleManager.startBattle = function(){
	   battleResultSent = false;
	   ED_Track_BattleManager_startBattle.call(this);
	   TrackData("Started " + GetActiveTroopInfo());
    }
}
else{
    BattleManager.startBattle = function(){
	   battleResultSent = false;
	   ED_Track_BattleManager_startBattle.call(this);
    }
}

if(String(PluginManager.parameters('ED_Track')['Track Battle Victory']) == "true"){
    var ED_Track_BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function(){
        if(!battleResultSent){
	       battleResultSent = true;
		  TrackData("Won " + GetActiveTroopInfo());
        }
        ED_Track_BattleManager_processVictory.call(this);
    }
}

if(String(PluginManager.parameters('ED_Track')['Track Battle Defeat']) == "true"){
    var ED_Track_BattleManager_processAbort = BattleManager.processAbort;
    BattleManager.processAbort = function(){
        if(!battleResultSent){
	       battleResultSent = true;
		  TrackData("Aborted " + GetActiveTroopInfo());
        }
        ED_Track_BattleManager_processAbort.call(this);
    }
}

if(String(PluginManager.parameters('ED_Track')['Track Battle Abort/Escape']) == "true"){
    var ED_Track_BattleManager_processDefeat = BattleManager.processDefeat;
    BattleManager.processDefeat = function(){
        if(!battleResultSent){
	       battleResultSent = true;
		  TrackData("Lost " + GetActiveTroopInfo());
        }
        ED_Track_BattleManager_processDefeat.call(this);
    }
}

if(String(PluginManager.parameters('ED_Track')['Troop Info Formatter']) != ""){
    eval("GetActiveTroopInfo = function(){" + String(PluginManager.parameters('ED_Track')['Troop Info Formatter']) + "}");
}
else{
    GetActiveTroopInfo = function(){
	   var Troop = "" + $gameTroop._troopId;
        for(var i = 0; i < $gameTroop.members().length; i++){
            Troop = Troop + "+" + $gameTroop.members()[i].originalName().split(' ').join('_');
        }
        return Troop;
    }
}

var MetricsPluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    MetricsPluginCommand.call(this, command, args);
    if (command === 'Track') {
	   TrackData(args.join(" "));
    }
};

function TrackData(s){
    var request = new XMLHttpRequest();
    var decision = {};
    decision.content = s;
    request.onreadystatechange = function() { 
        if (request.readyState != 4  || request.status != 200)
            return;
	   console.log(s);
	   console.log(request);
    };
    request.open("POST", "https://enigmadragons-ld39metrics.azurewebsites.net/api/event?code=9sKkJ1clnDUSxEFEOpz/Bcaaqx1Pay/euwoImYvTfsRMjhazSr7Pbw==", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(decision));
}