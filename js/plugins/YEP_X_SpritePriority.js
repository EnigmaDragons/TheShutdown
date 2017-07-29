//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Sprite Priority
// YEP_X_SpritePriority.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_SpritePriority = true;

var Yanfly = Yanfly || {};
Yanfly.BSP = Yanfly.BSP || {};

//=============================================================================
 /*:
 * @plugindesc vWIP If this is enabled, it will keep sideview sprites
 * prioritized based on who the active battler is.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BattleEngineCore. Make sure this plugin is located
 * under YEP_BattleEngineCore in the plugin list.
 *
 * If this is enabled, this will cause the sprite priorities to update through
 * the battle. If the currently active battler is an actor, then actors will
 * have priority above enemies. If the active battler is an enemy, then enemies
 * will have priority above actors. If none of the cases match, then priority
 * is given to whatever the default setting is set for the Battle Engine Core.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version WIP:
 * - Started Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.BSP.BattleManager_getSpritePriority = BattleManager.getSpritePriority;
BattleManager.getSpritePriority = function() {
  if (this._subject && this._subject.isActor()) {
    return 1;
  } else if (this._subject && this._subject.isEnemy()) {
    return 2;
  } else {
    return Yanfly.BSP.BattleManager_getSpritePriority.call(this);
  } 
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
  var priority = BattleManager.getSpritePriority();
  if (a._battler && b._battler && priority !== 0) {
    if (priority === 1) {
      if (a._battler.isActor() && b._battler.isEnemy()) return 1;
      if (a._battler.isEnemy() && b._battler.isActor()) return -1;
    } else if (priority === 2) {
      if (a._battler.isActor() && b._battler.isEnemy()) return -1;
      if (a._battler.isEnemy() && b._battler.isActor()) return 1;
    }
  }
  if (a.z < b.z) return -1;
  if (a.z > b.z) return 1;
  if (a.y < b.y) return -1;
  if (a.y > b.y) return 1;
  return 0;
};

//=============================================================================
// End of File
//=============================================================================
}; //Imported.YEP_BattleEngineCore