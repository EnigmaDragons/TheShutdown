//=============================================================================
// Skip Command Select by timeracers
// SkipCommandSelect.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc v1.00 Skip the command selection by going right to the skill selection requires Attack to be disabled.
 * @author timeracers
 */
//=============================================================================
var SkipCommandSelect_Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
	SkipCommandSelect_Scene_Battle_startActorCommandSelection.call(this);
    this._actorCommandWindow.processOk();
};