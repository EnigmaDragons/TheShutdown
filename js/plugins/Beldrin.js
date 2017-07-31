function BeldrinTheDarkMage() {
    this.moveChoices = [];
    this.choice = "";
    this.skillsOnCooldown = 0;
    this.turnsBeforePoisonCloudAvailable = 0;
    this.isPoisonCloudOnCooldown = false;
    this.isDarknessOnCooldown = false;
    this.isShadowNovaOnCooldown = false;
    this.isAcidRageOnCooldown = false;
    this.isDeathOnCooldown = false;
    this.isBloodied = false;
    this.isCritical = false;

    this.ignore = false;

    this.determineAction = function(boss) {
        if (this.ignore) {
            this.ignore = false;
            return false;
        }
        if (this.skillsOnCooldown >= 3)
            this.choice = "Guard";
        else
            this.decideAttack(boss);
        this.updateState();
        this.ignore = true;
        return false;
    };

    this.decideAttack = function(boss) {
        this.setupDecision(boss);
        this.addAllSkillChances();
        this.choice = this.moveChoices[Math.floor(Math.random() * this.moveChoices.length)];
    };

    this.setupDecision = function(boss) {
        this.moveChoices = [];
        if (boss.mhp / boss.hp >= 2)
            this.isBloodied = true;
        if (boss.mhp / boss.hp >= 4)
            this.isCritical = true;
    };

    this.addAllSkillChances = function() {
        if (!this.isPoisonCloudOnCooldown && this.turnsBeforePoisonCloudAvailable === 0)
            this.addChances("Poison Cloud", 5);
        this.addChances("Summon Wraith", 2);
        this.addChances("Attack", 7);
        if (!this.isDarknessOnCooldown)
            this.addChances("Darkness", 2);
        if (!this.isShadowNovaOnCooldown)
            this.addChances("Shadow Nova", 2);
        if (this.isBloodied && !this.isAcidRageOnCooldown)
            this.addChances("Acid Rain", 3);
        if (this.isCritical && !this.isDeathOnCooldown)
            this.addChances("Death", 3);
    };

    this.addChances = function(choice, times) {
        for (var i = 0; i < times; i++)
        this.moveChoices.push(choice);
    };

    this.updateState = function() {
        if (this.turnsBeforePoisonCloudAvailable > 0)
            this.turnsBeforePoisonCloudAvailable--;
        if (this.choice === "Poison Cloud") {
            this.turnsBeforePoisonCloudAvailable = 3;
            this.isPoisonCloudOnCooldown = true;
            this.skillsOnCooldown++;
        }
        if (this.choice === "Darkness") {
            this.isDarknessOnCooldown = true;
            this.skillsOnCooldown++;
        }
        if (this.choice === "Shadow Nova") {
            this.isShadowNovaOnCooldown = true;
            this.skillsOnCooldown++;
        }
        if (this.choice === "Acid Rain") {
            this.isAcidRageOnCooldown = true;
            this.skillsOnCooldown++;
        }
        if (this.choice === "Death") {
            this.isDeathOnCooldown = true;
            this.skillsOnCooldown++;
        }
        if (this.choice === "Guard") {
            this.isPoisonCloudOnCooldown = false;
            this.isDarknessOnCooldown = false;
            this.isShadowNovaOnCooldown = false;
            this.isAcidRageOnCooldown = false;
            this.isDeathOnCooldown = false;
            this.skillsOnCooldown = 0;
        }
    }
}

var beldrinTheDarkMage = new BeldrinTheDarkMage();