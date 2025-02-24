
fileInfo = {character:{class_name:""},skills:[]};
character = {};
var skill_bonuses = {stamina_skillup:0, frw_skillup:0, defense_skillup:0, resistance_skillup:0, cstrike_skillup:0, ar_skillup:0, pierce_skillup:0, fRes_skillup:0, cRes_skillup:0, lRes_skillup:0, pRes_skillup:0, edged_skillup:[0,0,0], pole_skillup:[0,0,0], blunt_skillup:[0,0,0], thrown_skillup:[0,0,0], claw_skillup:[0,0,0], mana_regen_skillup:0, cPierce_skillup:0, lPierce_skillup:0, fPierce_skillup:0, cDamage_skillup:0, lDamage_skillup:0, fDamage_skillup:0, block_skillup:0, velocity_skillup:0};
var base_stats = {level:1, skillpoints:0, statpoints:0, quests_completed:-1, running:-1, difficulty:3, strength_added:0, dexterity_added:0, vitality_added:0, energy_added:0, fRes_penalty:100, cRes_penalty:100, lRes_penalty:100, pRes_penalty:100, mRes_penalty:100, fRes:0, cRes:0, lRes:0, pRes:0, mRes:0, fRes_max_base:75, cRes_max_base:75, lRes_max_base:75, pRes_max_base:75, mRes_max_base:75, set_bonuses:[0,0,{},{},{},{},{}]}

var effects = {};
var duplicateEffects = {};
var skillList = []; var skillOptions = [];
var selectedSkill = [" ­ ­ ­ ­ Skill 1", " ­ ­ ­ ­ Skill 2"];

var offhandSetup = "";
var mercenary = {name:"",level:1,base_aura:"",base_aura_level:1};
var offhandType = "none";
var lastCharm = "";
var lastSocketable = "";
var lastSelected = "";
var settings = {coupling:1, autocast:1}
var MAX = 20;	// Highest Skill Hardpoints
var LIMIT = 60; // Highest Skill Data
var RES_CAP = 95;

var socketed = {
	helm:{sockets:0, socketsFilled:0, totals:{}, items:[{id:"",name:""},{id:"",name:""},{id:"",name:""}]},
	armor:{sockets:0, socketsFilled:0, totals:{}, items:[{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""}]},
	weapon:{sockets:0, socketsFilled:0, totals:{}, items:[{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""}]},
	offhand:{sockets:0, socketsFilled:0, totals:{}, items:[{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""}]},
};

// Charm Inventory
var inv = [
{onpickup:"?",pickup_x:0,pickup_y:0,empty:1,charms:[],in:["",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
{x:1,y:1,empty:1,id:"h11"},{x:1,y:1,empty:1,id:"h21"},{x:1,y:1,empty:1,id:"h31"},{x:1,y:1,empty:1,id:"h41"},{x:1,y:1,empty:1,id:"h51"},{x:1,y:1,empty:1,id:"h61"},{x:1,y:1,empty:1,id:"h71"},{x:1,y:1,empty:1,id:"h81"},{x:1,y:1,empty:1,id:"h91"},{x:1,y:1,empty:1,id:"h01"},
{x:1,y:1,empty:1,id:"h12"},{x:1,y:1,empty:1,id:"h22"},{x:1,y:1,empty:1,id:"h32"},{x:1,y:1,empty:1,id:"h42"},{x:1,y:1,empty:1,id:"h52"},{x:1,y:1,empty:1,id:"h62"},{x:1,y:1,empty:1,id:"h72"},{x:1,y:1,empty:1,id:"h82"},{x:1,y:1,empty:1,id:"h92"},{x:1,y:1,empty:1,id:"h02"},
{x:1,y:1,empty:1,id:"h13"},{x:1,y:1,empty:1,id:"h23"},{x:1,y:1,empty:1,id:"h33"},{x:1,y:1,empty:1,id:"h43"},{x:1,y:1,empty:1,id:"h53"},{x:1,y:1,empty:1,id:"h63"},{x:1,y:1,empty:1,id:"h73"},{x:1,y:1,empty:1,id:"h83"},{x:1,y:1,empty:1,id:"h93"},{x:1,y:1,empty:1,id:"h03"},
{x:1,y:1,empty:1,id:"h14"},{x:1,y:1,empty:1,id:"h24"},{x:1,y:1,empty:1,id:"h34"},{x:1,y:1,empty:1,id:"h44"},{x:1,y:1,empty:1,id:"h54"},{x:1,y:1,empty:1,id:"h64"},{x:1,y:1,empty:1,id:"h74"},{x:1,y:1,empty:1,id:"h84"},{x:1,y:1,empty:1,id:"h94"},{x:1,y:1,empty:1,id:"h04"}
];

// update - Updates everything
// ---------------------------------
function update() {
	calculateSkillAmounts()
	updateStats()
	checkRequirements()
	updateSkills()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
}

// getCharacterInfo - 
// return: 
// ---------------------------------
function getCharacterInfo() {
	var not_applicable = [0,1,2,3,'getSkillData','getBuffData','updateSelectedSkill','weapon_frames','wereform_frames','edged_skillup','blunt_skillup','pole_skillup','thrown_skillup','claw_skillup','skill_layout','name','type','rarity','not','only','ctc','cskill','set_bonuses','group','size','upgrade','downgrade','aura'];	// TODO: Prevent item qualities from being added as character qualities
	var charInfo = "{character:{";
	for (stat in character) {
		var halt = 0;
		for (let i = 0; i < not_applicable.length; i++) { if (stat == not_applicable[i]) { halt = 1 } }
		if (halt == 0 && character[stat] != 0 && character[stat] != "") { charInfo += (stat+":"+character[stat]+",") }
	}
	// TODO: Add ctc, cskill, 'skillup' stats
	charInfo += "},skills:["
//	for (let s = 0; s < skills.length; s++) { charInfo += "{level:"+skills[s].level+",extra_levels:"+skills[s].extra_levels+",force_levels:"+skills[s].force_levels+"}," }
	for (let s = 0; s < skills.length; s++) { charInfo += "["+skills[s].level+","+skills[s].extra_levels+","+skills[s].force_levels+"]," }
	charInfo += "],equipped:{helm:{" + getArrayText(equipped.helm)
	charInfo += "},armor:{" + getArrayText(equipped.armor)
	charInfo += "},gloves:{" + getArrayText(equipped.gloves)
	charInfo += "},boots:{" + getArrayText(equipped.boots)
	charInfo += "},belt:{" + getArrayText(equipped.belt)
	charInfo += "},amulet:{" + getArrayText(equipped.amulet)
	charInfo += "},ring1:{" + getArrayText(equipped.ring1)
	charInfo += "},ring2:{" + getArrayText(equipped.ring2)
	charInfo += "},weapon:{" + getArrayText(equipped.weapon)
	charInfo += "},offhand:{" + getArrayText(equipped.offhand)
	charInfo += "},charms:{"
	for (let c = 0; c < equipped.charms.length; c++) { equipped.charms[c]+":{"+getArrayText(equipped.charms[c])+"}," }
	charInfo += "}},mercEquipped:{helm:{" + getArrayText(mercEquipped.helm)
	charInfo += "},armor:{" + getArrayText(mercEquipped.armor)
	charInfo += "},weapon:{" + getArrayText(mercEquipped.weapon)
	charInfo += "},offhand:{" + getArrayText(mercEquipped.offhand)
	charInfo += "}},corruptsEquipped:{helm:{" + getArrayText(corruptsEquipped.helm)
	charInfo += "},armor:{" + getArrayText(corruptsEquipped.armor)
	charInfo += "},gloves:{" + getArrayText(corruptsEquipped.gloves)
	charInfo += "},boots:{" + getArrayText(corruptsEquipped.boots)
	charInfo += "},belt:{" + getArrayText(corruptsEquipped.belt)
	charInfo += "},amulet:{" + getArrayText(corruptsEquipped.amulet)
	charInfo += "},ring1:{" + getArrayText(corruptsEquipped.ring1)
	charInfo += "},ring2:{" + getArrayText(corruptsEquipped.ring2)
	charInfo += "},weapon:{" + getArrayText(corruptsEquipped.weapon)
	charInfo += "},offhand:{" + getArrayText(corruptsEquipped.offhand)

	charInfo += "}}"
	// TODO: Add effects
	// TODO: Add duplicateEffects
	// TODO: Add skillList
	// TODO: Add skillOptions
	// TODO: Add selectedSkill
	// TODO: Add mercenary
	// TODO: Add offhandType
	// TODO: Add settings (coupling, autocast)
	// TODO: Add socketed (helm, armor, weapon, offhand)
	// TODO: Add inv (1-40)
	charInfo += "}"
	return charInfo
}

// getArrayText - 
// return: 
// ---------------------------------
function getArrayText(array) {
	// TODO: Add parameter for exceptions?
	var arrayText = "";
	for (stat in array) {
		if (character[stat] != 0 && character[stat] != "") {	// temporary? (stats with default values not added to reduce clutter)
			if (stat == "not" || stat == "ctc" || stat == "cskill" || stat == "set_bonuses") {
				// TODO: Implement
			} else if (stat == "name" || stat == "type" || stat == "base" || stat == "img" || stat == "rarity" || stat == "only" || stat == "aura" || stat == "group" || stat == "size" || stat == "upgrade" || stat == "downgrade") {
				arrayText += (stat+":'"+array[stat]+"',")
			} else {
				arrayText += (stat+":"+array[stat]+",")
			}
		}
	}
	return arrayText
}

// saveTextAsFile - 
// ---------------------------------
function saveTextAsFile() {
	document.getElementById("inputTextToSave").value = getCharacterInfo().split(",}").join("}").split(",]").join("]")
	fileInfo = getCharacterInfo().split(",}").join("}").split(",]").join("]")

	var textToSave = document.getElementById("inputTextToSave").value;
	var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
	var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

	var downloadLink = document.createElement("a");
	downloadLink.download = "pod_"+character.class_name.toLowerCase();
	downloadLink.innerHTML = "Download File";
	downloadLink.href = textToSaveAsURL;
	downloadLink.onclick = destroyClickedElement;
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);

	downloadLink.click();
}

// destroyClickedElement - 
// ---------------------------------
function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

// loadFileAsText - 
// ---------------------------------
function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var textFromFileLoaded = "";
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("inputTextToSave").value = fileLoadedEvent.target.result;
		parseFile(textFromFileLoaded)
		setCharacterInfo(fileInfo.character.class_name.toLowerCase())
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

// parseFile - 
//	file: text from file
// ---------------------------------
function parseFile(file) {
	var temp = file.split("character:{")[1].split("},skills:")[0].split(",");
	for (let i = 0; i < temp.length; i++) {
		var split = temp[i].split(":");
		var val = split[1];
		if (isNaN(Number(val)) == false) { val = Number(val) }
		fileInfo.character[split[0]] = val
	}
	temp = file.split("skills:[[")[1].split("]]")[0].split("],[");
	for (let s = 0; s < temp.length; s++) {
		//temp[s] = "["+temp[s]+"]"
		if (typeof(fileInfo.skills[s]) == 'undefined') { fileInfo.skills[s] = [] }
		fileInfo.skills[s][0] = temp[s][0]
		fileInfo.skills[s][1] = temp[s][1]
		fileInfo.skills[s][2] = temp[s][2]
	}
}

// setCharacterInfo - 
// ---------------------------------
function setCharacterInfo(className) {
	startup(className)
	// TODO: Add effects
	// TODO: Add duplicateEffects
	// TODO: Add skillList
	// TODO: Add skillOptions
	// TODO: Add selectedSkill
	// TODO: Add mercenary
	// TODO: Add offhandType
	// TODO: Add settings (coupling, autocast)
	// TODO: Add socketed (helm, armor, weapon, offhand)
	// TODO: Add inv (1-40)
	
	// TODO: charms
/*	for (item in info.equipped.charms) {
		addCharm(info.equipped.charms[item].name)
	}
	for (group in corruptsEquipped) {
		equip(group,info.equipped[group].name)
		corrupt(group,info.corruptsEquipped[group].name)
		//for (stat in info.equipped[group]) { equipped[group][stat] = info.equipped[group][stat] }
		//for (stat in info.corruptsEquipped[group]) { corruptsEquipped[group][stat] = info.corruptsEquipped[group][stat] }
	}
*/	// TODO: socketed
	// TODO: fix skill saving/loading
	for (let s = 0; s < skills.length; s++) { skills[s].level = fileInfo.skills[s][0]; skills[s].extra_levels = fileInfo.skills[s][1]; skills[s].force_levels = fileInfo.skills[s][2]; showBaseLevels(skills[s]) }
	for (stat in fileInfo.character) {
		character[stat] = fileInfo.character[stat]
	}
//	updateStats()
//	updateAllEffects()
}

// loadEquipment - Loads equipment/charm info to the appropriate dropdowns
//	className: name of character class
// ---------------------------------
function loadEquipment(className) {
	var equipmentTypes = ["helm", "armor", "gloves", "boots", "belt", "amulet", "ring1", "ring2", "weapon", "offhand", "charms"];
	var equipmentDropdowns = ["dropdown_helm", "dropdown_armor", "dropdown_gloves", "dropdown_boots", "dropdown_belt", "dropdown_amulet", "dropdown_ring1", "dropdown_ring2", "dropdown_weapon", "dropdown_offhand", "dropdown_charms"]
	for (let i = 0; i < equipmentTypes.length; i++) { loadItems(equipmentTypes[i], equipmentDropdowns[i], className) }
	loadMisc()
	loadMerc()
	loadCorruptions()
	loadSocketables()
}

// loadItems - Creates a dropdown menu option
//	group: equipment's group
//	dropdown: name of the dropdown to edit
//	className: name of the character class
// ---------------------------------
function loadItems(group, dropdown, className) {
	if (group.length == 0) { document.getElementById(dropdown).innerHTML = "<option></option>" }
	else {
		var choices = "";
		var choices_offhand = "";
		for (itemNew in equipment[group]) {
			var item = equipment[group][itemNew];
			if (typeof(item.only) == 'undefined' || item.only == className) {
				var halt = 0;
				if (className == "clear") { halt = 1 }
				if (typeof(item.not) != 'undefined') { for (let l = 0; l < item.not.length; l++) { if (item.not[l] == className) { halt = 1 } } }
				if (className == "Rogue Scout") { if (group == "offhand" || (group == "weapon" && item.type != "bow" && item.type != "crossbow" && item.name != "Weapon")) { halt = 1 } }
				if (className == "Desert Guard") { if (group == "offhand" || (group == "weapon" && item.type != "polearm" && item.type != "spear" && item.name != "Weapon")) { halt = 1 } }
				if (className == "Iron Wolf") { if ((group == "offhand" && item.type != "shield" && item.name != "Offhand") || (group == "weapon" && (item.type != "sword" || typeof(item.twoHanded) != 'undefined') && item.name != "Weapon")) { halt = 1 } }
				if (className == "Barb (merc)") { if (group == "offhand" || (group == "weapon" && item.type != "sword" && item.name != "Weapon")) { halt = 1 } }
				if (halt == 0) {
					var addon = "";
					if (choices == "") {
						if (group != "charms") { addon = "<option selected>" + "­ ­ ­ ­ " + item.name + "</option>" }
						else { addon = "<option disabled selected>" + "­ ­ ­ ­ " + item.name + "</option>" }
					} else {
						if (typeof(item.debug) != 'undefined') { addon = "<option class='dropdown-debug'>" + item.name + "</option>" }
						else if (typeof(item.rarity) != 'undefined') { addon = "<option class='dropdown-"+item.rarity+"'>" + item.name + "</option>" }
						else { addon = "<option class='dropdown-unique'>" + item.name + "</option>" }
					}
					choices += addon
					if (className == "assassin" && item.name == "Offhand") { choices += offhandSetup }	// weapons inserted into offhand list
					if (className == "assassin" && item.type == "claw") { choices_offhand += addon }
					if (className == "barbarian" && item.name != "Weapon" && (typeof(item.twoHanded) == 'undefined' || item.twoHanded != 1 || item.type == "sword")) { choices_offhand += addon }
				}
			}
		}
		if (group == "weapon") { offhandSetup = choices_offhand }
		if (className == "barbarian" && group == "offhand") { choices += offhandSetup }	// weapons inserted into offhand list
		document.getElementById(dropdown).innerHTML = choices
	}
}

// loadMisc - Loads non-item effects to the 'Miscellaneous' dropdown menu
// ---------------------------------
function loadMisc() {
	var choices = "<option class='gray' disabled selected>­ ­ ­ ­ Miscellaneous</option>";
	for (let m = 1; m < non_items.length; m++) { choices += "<option>" + non_items[m].name + "</option>" }
	document.getElementById("dropdown_misc").innerHTML = choices
}

// loadSocketables - Loads jewels, runes, and gems to the 'Socketables' dropdown menu
// ---------------------------------
function loadSocketables() {
	var choices = "<option class='gray' disabled selected>­ ­ ­ ­ Socketables</option>";
	for (let m = 1; m < socketables.length; m++) {
		if (socketables[m].type == "rune") { choices += "<option class='dropdown-craft'>" + socketables[m].name + "</option>" }
		else if (typeof(socketables[m].rarity) != 'undefined') { choices += "<option class='dropdown-"+socketables[m].rarity+"'>" + socketables[m].name + "</option>" }
		else { choices += "<option>" + socketables[m].name + "</option>" }
	}
	document.getElementById("dropdown_socketables").innerHTML = choices
}

// loadMerc - Loads mercenaries to the 'Mercenary' dropdown menu
// ---------------------------------
function loadMerc() {
	var choices = "<option>­ ­ ­ ­ Mercenary</option>";
	for (let m = 1; m < mercenaries.length; m++) { choices += "<option>" + mercenaries[m].name + "</option>" }
	document.getElementById("dropdown_mercenary").innerHTML = choices
}

// setMercenary - Handles mercenary selection, including adding auras and loading mercenary items to the appropriate dropdown menus
//	merc: selected mercenary name
// ---------------------------------
function setMercenary(merc) {
	var mercEquipmentGroups = ["helm", "armor", "weapon", "offhand"];
	var mercEquipmentDropdowns = ["dropdown_merc_helm", "dropdown_merc_armor", "dropdown_merc_weapon", "dropdown_merc_offhand"];
	if (document.getElementById("dropdown_merc_helm").innerHTML != "") { equipMerc('helm', 'helm'); }
	if (document.getElementById("dropdown_merc_armor").innerHTML != "") { equipMerc('armor', 'armor'); }
	if (document.getElementById("dropdown_merc_weapon").innerHTML != "") { equipMerc('weapon', 'weapon'); }
	if (document.getElementById("dropdown_merc_offhand").innerHTML != "") { equipMerc('offhand', 'offhand'); }
	if (mercenary.base_aura != "") { removeEffect(mercenary.base_aura.split(' ').join('_')+"-mercenary"); mercenary.base_aura = ""; }
	if (merc == "none" || merc == "­ ­ ­ ­ Mercenary") {
		for (let i = 0; i < mercEquipmentGroups.length; i++) { loadItems(mercEquipmentGroups[i], mercEquipmentDropdowns[i], "clear") }
		document.getElementById("dropdown_mercenary").selectedIndex = 0;
	} else {
		var mercType = merc;
		if (merc == mercenaries[1].name) { mercType = "Rogue Scout" }
		if (merc == mercenaries[2].name || merc == mercenaries[3].name || merc == mercenaries[4].name) { mercType = "Desert Guard" }
		if (merc == mercenaries[5].name || merc == mercenaries[6].name || merc == mercenaries[7].name) { mercType = "Iron Wolf" }
		if (merc == mercenaries[8].name) { mercType = "Barb (merc)" }
		for (let i = 0; i < mercEquipmentGroups.length; i++) { loadItems(mercEquipmentGroups[i], mercEquipmentDropdowns[i], mercType) }
		for (let m = 1; m < mercenaries.length; m++) {
			if (merc == mercenaries[m].name) { if (mercenary.base_aura == "") {
				mercenary.level = Math.max(1,character.level-1)
				mercenary.base_aura_level = getMercenaryAuraLevel(mercenary.level)
				mercenary.base_aura = mercenaries[m].aura
				addEffect("aura",mercenary.base_aura,mercenary.base_aura_level,"mercenary")
			} }
		}
	}
	mercenary.name = merc
}

// updateMercenary - updates mercenary base aura
// ---------------------------------
function updateMercenary() {
	mercenary.level = Math.max(1,character.level-1)
	if (mercenary.base_aura != "") {
		removeEffect(mercenary.base_aura.split(' ').join('_')+"-mercenary")	// TODO: merge with effect update functions. Use disable/enable instead.
		mercenary.base_aura_level = getMercenaryAuraLevel(mercenary.level)
		addEffect("aura",mercenary.base_aura,mercenary.base_aura_level,"mercenary")
	}
}

// getMercenaryAuraLevel - Get mercenary aura level
//	hlvl: level of mercenary (must be lower than clvl)
// return: aura level of mercenary
// ---------------------------------
function getMercenaryAuraLevel(hlvl) {
	var result = 1;
	var diff = 0.23;
	result = Math.min(18,Math.floor((1-diff)+diff*hlvl));
//	old calculation for aura level:
//	if (hlvl > 9 && hlvl < 31) { result = (3+((hlvl-9)*10/32)) }
//	else if (hlvl > 30 && hlvl < 55) { result = (10+((hlvl-31)*10/32)) }
//	else if (hlvl > 54) { result = 18 }
	// TODO: Is the Might aura still uncapped? (up to level 31)
	result += ~~mercenary.all_skills
	return result;
}

// loadCorruptions - Loads corruption options
// ---------------------------------
function loadCorruptions() {
	var types = ["helm", "armor", "gloves", "boots", "belt", "amulet", "ring1", "ring2", "weapon", "offhand"];
	for (let i = 0; i < types.length; i++) {
		var choices = "<option>­ ­ ­ ­ Corruption</option>";
		for (let m = 1; m < corruptions[types[i]].length; m++) {
			if (types[i] == "offhand") { if (corruptions[types[i]][m].base == "shield") { choices += "<option>" + corruptions[types[i]][m].name + "</option>" } }
			else { choices += "<option>" + corruptions[types[i]][m].name + "</option>" }
		}
		document.getElementById("corruptions_"+types[i]).innerHTML = choices
	}
}

// startup - Resets everything and starts a new character
//	choice: name of new character class
// ---------------------------------
function startup(choice) {
	setMercenary("none")
	loadEquipment(choice)
	clearIconSources()
	resetSkills()
	resetEquipment()
	resetEffects()
	calculateSkillAmounts()
	updateSkills()
	document.getElementById("quests").checked = 0
	document.getElementById("running").checked = 0
	document.getElementById("difficulty3").checked = 1
	skills = skills_all[choice]
	character_setup = character_all[choice]
	for (stat in base_stats) { character[stat] = base_stats[stat] }
	for (stat in unequipped) { character[stat] = unequipped[stat] }
	for (stat in character_setup) { character[stat] = character_setup[stat] }
	setIconSources(choice)
	updateSkillIcons()
	updateStats()
	document.getElementById("skill_tree").src = character_setup.skill_layout
	init()
}

// reset - Calls startup() with the specified class name
//	name: string class name
// ---------------------------------
function reset(name) { startup(name.toLowerCase()); }

// init - Initiates mouse functions
// ---------------------------------
function init() {
	document.getElementById("skillmap").onmouseout = function() {skillOut()};
	for (let s = 0, len = skills.length; s < len; s++) {
		document.getElementById("s"+skills[s].key).onmouseover = function() {skillHover(skills[s])};
		document.getElementById("s"+skills[s].key).onclick = function() {skillUp(event, skills[s])};
		document.getElementById("s"+skills[s].key).oncontextmenu = function() {skillDown(event, skills[s])};
	}
}

// clearIconSources - Removes all active skill icons
// ---------------------------------
function clearIconSources() {
	for (let s = 0; s < skills.length; s++) {
		var iconId = "i"+skills[s].key
		document.getElementById(iconId).src = "./images/skills/none.png"
		document.getElementById(iconId).style.visibility = "hidden"
	}
}

// setIconSources - Sets new active skill icons based on character class
//	className: name of character class
// ---------------------------------
function setIconSources(className) {
	var prefix = "./images/skills/"+className+"/";
	for (let s = 0, len = skills.length; s < len; s++) {
		var iconId = "i"+skills[s].key;
		document.getElementById(iconId).src = prefix+skills[s].name+".png"
	}
}

// updateSkillIcons - Handles whether active skill icons are hidden or shown
// ---------------------------------
function updateSkillIcons() {
	for (let s = 0; s < skills.length; s++) {
		var iconId = "i"+skills[s].key;
		var show = 1;
		if (skills[s].req.length > 0) { for (let i = 0; i < skills[s].req.length; i++) {
			if (skills[skills[s].req[i]].level == 0) { show = 0; }
		} }
		if (character.level < skills[s].reqlvl) { show = 0; }
		if (show == 1) { document.getElementById(iconId).style.visibility = "visible" }
		else { document.getElementById(iconId).style.visibility = "hidden" }
	}
}

// changeLevel - Modifies the character's level
//	input: positive or negative change (-1 or 1)
// ---------------------------------
function changeLevel(input) {
	var levels = 1
	if (event.shiftKey) { levels = 10 }
	if (event.ctrlKey) { levels = 100 }
	if (input < 0) {
		if (levels > character.level-1) { levels = (character.level-1) }
		if (levels > character.skillpoints) { levels = character.skillpoints }
		if (levels*5 > character.statpoints) { levels = Math.floor(character.statpoints/5) }
		levels *= input
	}
	var maxup = 99 - character.level
	if (levels > maxup) { levels = maxup }
	if (levels != 0) {
		character.level += levels
		character.skillpoints += levels
		character.statpoints += 5*levels
		character.stamina += character.levelup_stamina*levels
		character.life += character.levelup_life*levels
		character.mana += character.levelup_mana*levels
	}
	updateMercenary()
	update()
}

// reloadOffhandCorruptions - reloads corruption options for offhands (when the selected item changes types)
//	kind: the group/type of the selected item
// ---------------------------------
function reloadOffhandCorruptions(kind) {
	// trash socketed items first
	for (affix in socketed.offhand.totals) { character[affix] -= socketed.offhand.totals[affix] }
	socketed.offhand.totals = {}
	for (let i = 0; i < socketed.offhand.items.length; i++) { socketed.offhand.items[i] = {id:socketed.offhand.items[i].id,name:socketed.offhand.items[i].name} }
	
	corrupt("offhand", "offhand")
	var choices = "<option>­ ­ ­ ­ Corruption</option>";
	for (let m = 1; m < corruptions["offhand"].length; m++) {
		if (corruptions["offhand"][m].base == kind) {
			choices += "<option>" + corruptions["offhand"][m].name + "</option>"
		}
	}
	document.getElementById("corruptions_offhand").innerHTML = choices
	document.getElementById("corruptions_offhand").selectedIndex = 0
}

// adjustCorruptionSockets - Adjusts the sockets granted by corruptions
//	group: item group (helm, armor, weapon, offhand)
// ---------------------------------
function adjustCorruptionSockets(group) {
	var max = 0;
	if (equipped[group].max_sockets > 0 && corruptsEquipped[group].name != group) {
		max = ~~equipped[group].max_sockets;
		if (equipped[group].ethereal > 0 || equipped[group].sockets > 0 || equipped[group].rarity == "rw" || equipped[group].rarity == "common" || equipped[group].type == "quiver") { max = 0 }
		if (max != corruptsEquipped[group].sockets) {
			character.sockets -= corruptsEquipped[group].sockets
			corruptsEquipped[group].sockets = max
			character.sockets += max
		}
	}
	if (max == 0 && equipped[group].name != "none" && corruptsEquipped[group].name == "+ Sockets") { corrupt(group, group) }
	updateStats()
}

// corrupt - Sets a corruption outcome for an item
//	group: name of item's group
//	val: name of corruption
// ---------------------------------
function corrupt(group, val) {
	for (old_affix in corruptsEquipped[group]) {
		character[old_affix] -= corruptsEquipped[group][old_affix]
		corruptsEquipped[group][old_affix] = unequipped[old_affix]
	}
	if (val == "­ ­ ­ ­ Corruption" || val == "none" || val == group || equipped[group].ethereal > 0 || equipped[group].sockets > 0 || equipped[group].rarity == "rw" || equipped[group].rarity == "common" || (group == "offhand" && equipped[group].type != "quiver" && equipped.weapon.twoHanded == 1 && (equipped.weapon.type != "sword" || character.class_name != "Barbarian"))) { document.getElementById("corruptions_"+group).selectedIndex = 0 }
	else {
		for (outcome in corruptions[group]) {
			if (corruptions[group][outcome].name == val && (group != "offhand" || (offhandType == corruptions[group][outcome].base || offhandType == "none"))) {
				for (affix in corruptions[group][outcome]) {
					corruptsEquipped[group][affix] = corruptions[group][outcome][affix]
					if (affix != "name" && affix != "base") {
						character[affix] += corruptions[group][outcome][affix]
					}
					//if (affix == e_def) { corruptsEquipped[group].defense = equipped[group].defense * (1+corruptsEquipped[group][affix]) - equipped[group].defense; character.defense += corruptsEquipped.defense; }	// TODO: implement enhanced defense corruptions
				}
			}
		}
		if (val == "+ Sockets") { adjustCorruptionSockets(group) }
	}
	update()
}

// mercEquip - Equips or unequips a mercenary item
//	group: name of item's group
//	val: name of item
// ---------------------------------
function equipMerc(group, val) {
	for (old_affix in mercEquipped[group]) {
		if (old_affix == "aura" || old_affix == "aura_lvl" || old_affix == "name" || old_affix == "type" || old_affix == "base" || old_affix == "only" || old_affix == "not" || old_affix == "img") {
			if (old_affix == "aura") {
				removeEffect(mercEquipped[group][old_affix].split(' ').join('_')+"-mercenary_"+group)
			}
		} else {
			mercenary[old_affix] -= mercEquipped[group][old_affix]
		}
	}
	mercEquipped[group] = {name:"none"}
	if (group == val) { document.getElementById(("dropdown_merc_"+group)).selectedIndex = 0 }
	else {
		for (item in equipment[group]) {
			if (equipment[group][item].name == val) {
				// add affixes from base item
				if (typeof(equipment[group][item]["base"]) != 'undefined') {	// TODO: Combine with duplicate code from equip()
					var base = getBaseId(equipment[group][item].base);
					var multEth = 1;
					var multED = 1;
					var multReq = 1;
					var reqEth = 0;
					if (typeof(equipment[group][item]["ethereal"]) != 'undefined') { if (equipment[group][item]["ethereal"] == 1) { multEth = 1.5; reqEth = 10; } }
					if (typeof(equipment[group][item]["e_def"]) != 'undefined') { multED += (equipment[group][item]["e_def"]/100) }
					if (typeof(equipment[group][item]["req"]) != 'undefined') { multReq += (equipment[group][item]["req"]/100) }
					for (affix in bases[base]) {
						if (affix != "group" && affix != "type" && affix != "upgrade" && affix != "downgrade" && affix != "subtype" && affix != "only" && affix != "def_low" && affix != "def_high" && affix != "durability" && affix != "range" && affix != "twoHands") {
							if (typeof(mercEquipped[group][affix]) == 'undefined') { mercEquipped[group][affix] = unequipped[affix] }	// undefined (new) affixes get initialized to zero
							if (affix == "base_defense") {
								mercEquipped[group][affix] = Math.ceil(multEth*multED*bases[base][affix])
								mercenary[affix] += Math.ceil(multEth*multED*bases[base][affix])
							} else if (affix == "base_damage_min" || affix == "base_damage_max") {
								mercEquipped[group][affix] = Math.ceil(multEth*bases[base][affix])
								mercenary[affix] += Math.ceil(multEth*bases[base][affix])
							} else if (affix == "req_strength" || affix == "req_dexterity") {
								mercEquipped[group][affix] = Math.max(0,Math.ceil(multReq*bases[base][affix] - reqEth))
							} else {
								mercEquipped[group][affix] = bases[base][affix]
								mercenary[affix] += bases[base][affix]
							}
						}
					}
				}
				// add regular affixes
				for (affix in equipment[group][item]) {
					if (typeof(mercEquipped[group][affix]) == 'undefined') { mercEquipped[group][affix] = unequipped[affix] }
					if (affix == "damage_vs_undead") {
						mercEquipped[group][affix] += equipment[group][item][affix]
						mercenary[affix] += equipment[group][item][affix]
					} else if (affix == "name" || affix == "type" || affix == "base" || affix == "only" || affix == "not" || affix == "img" || affix == "rarity" || affix == "req" || affix == "ethereal" || affix == "indestructible" || affix == "autorepair" || affix == "autoreplenish" || affix == "stack_size" || affix == "set_bonuses" || affix == "pod_changes" || affix == "aura_lvl" || affix == "twoHanded" || affix == "sockets" || affix == "e_def" || affix == "ctc" || affix == "cskill" || affix == "aura" || affix == "req_strength" || affix == "req_dexterity") {
						if (affix == "req_strength" || affix == "req_dexterity") {
							if (equipment[group][item][affix] > mercEquipped[group][affix]) { mercEquipped[group][affix] = equipment[group][item][affix] }
						} else {
							mercEquipped[group][affix] = equipment[group][item][affix]
							if (affix == "aura" && equipment[group][item][affix] != mercenary.base_aura) { addEffect("aura",equipment[group][item][affix],equipment[group][item].aura_lvl,"mercenary_"+group) }
						}
					} else {
						if (affix == "sup" || affix == "e_damage") {
							if (affix == "sup") { mercEquipped[group][affix] = equipment[group][item][affix] }
							mercEquipped[group]["e_damage"] += equipment[group][item][affix]
							mercenary["e_damage"] += equipment[group][item][affix]
						} else {
							mercEquipped[group][affix] = equipment[group][item][affix]
							mercenary[affix] += equipment[group][item][affix]
						}
					}
				}
				// TODO: implement set bonuses
			}
		}
		updateMercenary()
	}
	updateStats()
	updateAllEffects()
}
	
// equip - Equips an item by adding its stats to the character, or unequips it if it's already equipped			// TODO: consider renaming... switchItem()?  Also, split into multiple smaller functions
//	group: equipment group
//	val: name of item
// ---------------------------------
function equip(group, val) {
	var auraName = "";
	var auraLevel = 0;
	var old_set_bonuses = "";
	var old_set = "";
	var old_set_before = 0;
	var old_set_after = 0;
	var set_bonuses = "";
	var set = "";
	var set_before = 0;
	var set_after = 0;
	
	// check if item was imported from a different category (offhand weapons)
	var src_group = group;
	var found = 0;
	if (group == "offhand") { for (item in equipment[group]) { if (equipment[group][item].name == val) { found = 1 } } }
	if (found == 0 && group == "offhand") { src_group = "weapon" }
	var itemType = "";
	var twoHanded = 0;
	for (item in equipment[src_group]) { if (equipment[src_group][item].name == val) { twoHanded = ~~equipment[src_group][item].twoHanded; if (typeof(equipment[src_group][item].type) != 'undefined') { itemType = equipment[src_group][item].type } } }
	
	for (old_affix in equipped[group]) { if (old_affix == "set_bonuses") { old_set_bonuses = equipped[group].set_bonuses } }
	for (item in equipment[src_group]) { if (equipment[src_group][item].name == val) { if (typeof(equipment[src_group][item].set_bonuses) != 'undefined') { set_bonuses = equipment[src_group][item].set_bonuses } } }
	if (set_bonuses != "") { set = set_bonuses[0]; set_before = character[set]; }
	if (old_set_bonuses != "") { old_set = old_set_bonuses[0]; old_set_before = character[old_set]; }
	
	// if replacing an item, previous item's affixes are removed from character
	for (old_affix in equipped[group]) {
		if (typeof(character[old_affix]) != 'undefined') { character[old_affix] -= equipped[group][old_affix] }
		if (old_affix == "aura") { removeEffect(equipped[group][old_affix].split(' ').join('_')+"-"+group) }
		if (old_affix != "set_bonuses") { equipped[group][old_affix] = unequipped[old_affix] }
	}
	// remove set bonuses from previous item
	if (old_set_bonuses != "") {
		old_set_after = character[old_set];
		if (old_set_before > old_set_after) {
			var before = Math.round(old_set_before,0)
			var after = Math.round(old_set_after,0)
			// remove set bonuses for old item
			for (let i = 1; i <= before; i++) {
				for (affix in equipped[group]["set_bonuses"][i]) {
					character[affix] -= equipped[group]["set_bonuses"][i][affix]
				}
			}
			equipped[group]["set_bonuses"][1] = 0	// save "state" for invalid/outdated set info
			if (before > after) {
				// remove old set bonus for other equipped items in the set (only if the removed set item wasn't a duplicate of another set item, i.e. ring)
				for (set_group in equipped) {
					if (set_group != group && equipped[set_group]["set_bonuses"] != null) {
						if (equipped[set_group]["set_bonuses"][0] == old_set && equipped[set_group]["set_bonuses"][1] == 1) {	// same set as removed item & set info is valid
							for (affix in equipped[set_group]["set_bonuses"][before]) {
								character[affix] -= equipped[set_group]["set_bonuses"][before][affix]
							}
						}
					}
				}
				// remove shared set bonuses
				for (affix in sets[old_set][before]) {
					if (character.class_name == "Sorceress" && (affix == "oskill_Fire_Ball" || affix == "oskill_Fire_Wall" || affix == "oskill_Meteor")) {
						character[affix] -= 3
					} else {
						character[affix] -= sets[old_set][before][affix]
					}
				}
			}
		}
	}
	
	// add affixes to character
	for (item in equipment[src_group]) {
		if (equipment[src_group][item].name == val) {
			// add affixes from base item
			if (typeof(equipment[src_group][item]["base"]) != 'undefined') {
				var base = getBaseId(equipment[src_group][item].base);
				var multEth = 1;
				var multED = 1;
				var multReq = 1;
				var reqEth = 0;
				if (typeof(equipment[src_group][item]["ethereal"]) != 'undefined') { if (equipment[src_group][item]["ethereal"] == 1) { multEth = 1.5; reqEth = 10; } }
				if (typeof(equipment[src_group][item]["e_def"]) != 'undefined') { multED += (equipment[src_group][item]["e_def"]/100) }
				if (typeof(equipment[src_group][item]["req"]) != 'undefined') { multReq += (equipment[src_group][item]["req"]/100) }
				if (typeof(bases[base]) != 'undefined') { for (affix in bases[base]) {
					if (affix != "group" && affix != "type" && affix != "upgrade" && affix != "downgrade" && affix != "subtype" && affix != "only" && affix != "def_low" && affix != "def_high" && affix != "durability" && affix != "range" && affix != "twoHands") {	// test: twoHands still unused elsewhere? okay here?
						if (typeof(equipped[group][affix]) == 'undefined') { equipped[group][affix] = unequipped[affix] }	// undefined (new) affixes get initialized to zero
						if (affix == "base_defense") {										// TODO: consider renaming? ...group_defense, combined_defense, item_def, etc
							equipped[group][affix] = Math.ceil(multEth*multED*bases[base][affix])
							character[affix] += Math.ceil(multEth*multED*bases[base][affix])
						} else if (affix == "base_damage_min" || affix == "base_damage_max" || affix == "throw_min" || affix == "throw_max" || affix == "base_min_alternate" || affix == "base_max_alternate") {
							equipped[group][affix] = Math.ceil(multEth*bases[base][affix])
							character[affix] += Math.ceil(multEth*bases[base][affix])
						} else if (affix == "req_strength" || affix == "req_dexterity") {
							equipped[group][affix] = Math.max(0,Math.ceil(multReq*bases[base][affix] - reqEth))
						} else {
							equipped[group][affix] = bases[base][affix]
							character[affix] += bases[base][affix]
						}
					}
				} }
			}
			// add regular affixes
			for (affix in equipment[src_group][item]) {
				if (typeof(equipped[group][affix]) == 'undefined') { equipped[group][affix] = unequipped[affix] }	// initialize undefined affixes
				if (affix == "damage_vs_undead") {									// damage_vs_undead is the only additive affix included in both bases[] (automods) and equipment[] (regular affixes)
					equipped[group][affix] += equipment[src_group][item][affix]
					character[affix] += equipment[src_group][item][affix]
				} else if (affix == "name" || affix == "type" || affix == "base" || affix == "only" || affix == "not" || affix == "img" || affix == "rarity" || affix == "req" || affix == "ethereal" || affix == "indestructible" || affix == "autorepair" || affix == "autoreplenish" || affix == "stack_size" || affix == "set_bonuses" || affix == "pod_changes" || affix == "aura_lvl" || affix == "twoHanded" || affix == "sockets" || affix == "e_def" || affix == "ctc" || affix == "cskill" || affix == "aura" || affix == "req_strength" || affix == "req_dexterity") {	// no need to add these as character affixes
					equipped[group][affix] = equipment[src_group][item][affix]
					if (affix == "req_strength" || affix == "req_dexterity") {
						if (equipment[src_group][item][affix] > equipped[group][affix]) { equipped[group][affix] = equipment[src_group][item][affix] }	// these affixes aren't additive (only the largest matters)
					} else {
						equipped[group][affix] = equipment[src_group][item][affix]
						if (affix == "aura") { auraName = equipment[src_group][item][affix]; auraLevel = equipment[src_group][item].aura_lvl; }
					}
				} else {
					if ((affix == "sup" || affix == "e_damage") && src_group == "weapon") {
						if (affix == "sup") { equipped[group][affix] = equipment[src_group][item][affix] }
						equipped[group]["e_damage"] += equipment[src_group][item][affix]
						character["e_damage"] += equipment[src_group][item][affix]
					} else {
						equipped[group][affix] = equipment[src_group][item][affix]
						var oskill_info = "";
						for (let o = 0; o < oskills.length; o++) { if (affix == oskills[o]) { oskill_info = oskills_info[oskills[o]] } }
						if (oskill_info != "") {
							if (oskill_info.native_class == character.class_name.toLowerCase()) { if (equipment[src_group][item][affix] > 3) { equipped[group][affix] -= (equipment[src_group][item][affix]-3) } }	// oskills are capped at 3 for 'native' classes
							character[affix] += equipped[group][affix]
						} else {
							character[affix] += equipment[src_group][item][affix]
						}
					}
				}
			}
		}
	}
	// add set bonuses
	if (set_bonuses != "") {
		set_after = character[set];
		if (set_before < set_after) {
			var before = Math.round(set_before,0)
			var after = Math.round(set_after,0)
			// add set bonuses for new item
			for (let i = 1; i <= after; i++) {
				for (affix in set_bonuses[i]) {
					character[affix] += set_bonuses[i][affix]
				}
			}
			equipped[group]["set_bonuses"][1] = 1	// valid set info
			if (before < after) {
				// add new set bonus for other equipped items in the set
				for (set_group in equipped) {
					if (set_group != group && equipped[set_group]["set_bonuses"] != null) {
						if (equipped[set_group]["set_bonuses"][0] == set && equipped[set_group]["set_bonuses"][1] == 1) {
							for (affix in equipped[set_group]["set_bonuses"][after]) {
								character[affix] += equipped[set_group]["set_bonuses"][after][affix]
							}
						}
					}
				}
				// add shared set bonuses
				for (affix in sets[set][after]) {
					if (character.class_name == "Sorceress" && (affix == "oskill_Fire_Ball" || affix == "oskill_Fire_Wall" || affix == "oskill_Meteor")) {
						character[affix] += 3
					} else {
						character[affix] += sets[set][after][affix]
					}
				}
			}
		}
	}
	// prevent incompatible weapon/offhand combinations
	if (equipped.weapon.name != "none" && equipped.offhand.name != "none") {
		if (group == "offhand") {
			if (itemType == "quiver" && equipped.weapon.type != "bow" && equipped.weapon.type != "crossbow") { equip('weapon', 'none') }
			else if (itemType != "quiver" && equipped.weapon.twoHanded == 1 && (equipped.weapon.type != "sword" || character.class_name != "Barbarian")) { equip('weapon', 'none') }
			else if (itemType == "claw" && equipped.weapon.type != "claw") { equip('weapon', 'none') }
		} else if (group == "weapon") {
			if (equipped.offhand.type == "quiver" && itemType != "bow" && itemType != "crossbow") { equip('offhand', 'none') }
			else if (equipped.offhand.type != "quiver" && twoHanded == 1 && (itemType != "sword" || character.class_name != "Barbarian")) { equip('offhand', 'none'); }
			else if (itemType != "claw" && equipped.offhand.type == "claw") { equip('offhand', 'none') }
		}
	}
	// adjust damage for 2-handed swords if wielded differently
	if (character.class_name == "Barbarian") {
		if (equipped.weapon.name != "none" && equipped.offhand.name != "none") {
			if (equipped.weapon.type == "sword" && equipped.weapon.twoHanded == 1) { checkWield("weapon", 1) }
			if (equipped.offhand.type == "sword" && equipped.offhand.twoHanded == 1) { checkWield("offhand", 1) }
		} else {
			if (equipped.weapon.type == "sword" && equipped.weapon.twoHanded == 1) { checkWield("weapon", 2) }
			if (equipped.offhand.type == "sword" && equipped.offhand.twoHanded == 1) { checkWield("offhand", 2) }
		}
	}
	// remove incompatible corruptions
	if (equipped[group].ethereal > 0 || equipped[group].sockets > 0 || equipped[group].rarity == "rw" || equipped[group].rarity == "common" || (group == "offhand" && (equipped[group].type == "shield" || equipped[group].type == "quiver") && equipped[group].type != corruptsEquipped[group].base)) { corrupt(group, group) }
	if (corruptsEquipped[group].name == "+ Sockets") { adjustCorruptionSockets(group) }
	if (group == "offhand") {
		// reload corruption options when the selected type changes
		if (equipped[group].type == "shield") { if (offhandType == "quiver" || offhandType == "weapon") { offhandType = "shield"; reloadOffhandCorruptions("shield"); } }
		else if (equipped[group].type == "quiver") { if (offhandType != "quiver") { offhandType = "quiver"; reloadOffhandCorruptions("quiver"); } }
		else if (equipped[group].name != "none") { if (offhandType != "weapon") { offhandType = "weapon"; reloadOffhandCorruptions("weapon"); } }
		else { if (offhandType == "quiver" || offhandType == "weapon") { offhandType = "none"; reloadOffhandCorruptions("shield"); } }
		if (equipped[group].type == "shield") { offhandType = "shield" } else if (equipped[group].name == "none") { offhandType = "none" }
	}
	else if (group == "weapon") {
		if (equipped.offhand.type != "quiver" && twoHanded == 1 && (itemType != "sword" || character.class_name != "Barbarian") && corruptsEquipped.offhand.name != "none") { reloadOffhandCorruptions("shield"); }
	}
	if (val == group || val == "none") { document.getElementById(("dropdown_"+group)).selectedIndex = 0; }
	// set inventory image
	if (equipped[group].name != "none") {
		var src = "";
		var base = "";
		if (typeof(equipped[group].img) != 'undefined') { src = equipped[group].img }
		if (typeof(equipped[group].base) != 'undefined') { base = equipped[group].base }
		document.getElementById(group+"_image").src = getItemImage(group,base,src)
	} else {
		document.getElementById(group+"_image").src = "./images/items/none.png"
	}
	
	if (auraName != "" && auraLevel != 0) {		// TODO: Why does this break things if called earlier? (item image wasn't appearing)
		addEffect("aura",auraName,auraLevel,group)
	}
	update()
	updateAllEffects()
}

// checkWield - Adjust base damage for two-handed swords (dependent on whether wielded with 1 or 2 hands)
//	group: item's group (weapon or offhand)
//	hands_used: number of hands used to wield the weapon
// ---------------------------------
function checkWield(group, hands_used) {
		var base_min = equipped[group].base_damage_min;
		var base_max = equipped[group].base_damage_max;
		var min_alt = equipped[group].base_min_alternate;
		var max_alt = equipped[group].base_max_alternate;
		var swap = 0;
		if (hands_used == 2) { if (base_min < min_alt) { swap = 1 } }
		else { if (base_min > min_alt) { swap = 1 } }
		if (swap == 1) {
			character.base_damage_min -= base_min
			character.base_damage_max -= base_max
			equipped[group].base_damage_min = min_alt
			equipped[group].base_damage_max = max_alt
			equipped[group].base_min_alternate = base_min
			equipped[group].base_max_alternate = base_max
			character.base_damage_min += min_alt
			character.base_damage_max += max_alt
		}
}

// resetSkills - Resets functionality for skills
// ---------------------------------
function resetSkills() {
	for (bonus in skill_bonuses) { character[bonus] = skill_bonuses[bonus] }
	for (s = 0, len = skills.length; s < len; s++) {
		skills[s].level = 0
		skills[s].extra_levels = 0
		skills[s].force_levels = 0
		document.getElementById("p"+skills[s].key).innerHTML = ""
		document.getElementById("s"+skills[s].key).onmouseover = function() {mouseOut};
		document.getElementById("s"+skills[s].key).onclick = function() {mouseOut};
		document.getElementById("s"+skills[s].key).oncontextmenu = function() {mouseOut};
	}
	document.getElementById("dropdown_skill1").innerHTML = "<option class='gray-all' style='color:gray' disabled selected>" + " ­ ­ ­ ­ Skill 1" + "</option>"
	document.getElementById("dropdown_skill2").innerHTML = "<option class='gray-all' style='color:gray' disabled selected>" + " ­ ­ ­ ­ Skill 2" + "</option>"
}

// resetEquipment - Resets all items
// ---------------------------------
function resetEquipment() {
	for (group in corruptsEquipped) { equip(group, "none") }
	resetCharms()
	resetCorruptions()
}

// resetCharms - Resets all charms
// ---------------------------------
function resetCharms() {
	var type = "charms"
	for (val in equipped[type]) {
		for (old_affix in equipped[type][val]) {
			character[old_affix] -= equipped[type][val][old_affix]
			equipped[type][val][old_affix] = unequipped[old_affix]
		}
	}
	for (let s = 1; s < inv[0]["in"].length; s++) { inv[0]["in"][s] = "" }
	for (let t = 1; t < inv.length; t++) {
		inv[t].empty = 1
		inv[t].id
		document.getElementById(inv[t].id).innerHTML = ""
	}
}

// resetCorruptions - Resets all corruptions
// ---------------------------------
function resetCorruptions() {
	for (group in corruptsEquipped) { corrupt(group, "none") }
}

// addCharm - Adds a charm to the inventory
//	val: the name of the charm
// ---------------------------------
function addCharm(val) {
	var charm_img = {prefix:"./images/items/charms/", small:["charm1_paw.png","charm1_disc.png","charm1_coin.png"], large:["charm2_page.png","charm2_horn.png","charm2_lantern.png"], grand:["charm3_lace.png","charm3_eye.png","charm3_monster.png"]};
	var charmImage = charm_img.prefix+"debug_plus.png";
	var charmHeight = "";
	var charmWidth = "29";
	var size = "";
	var charm_y = 1;
	var nameVal = val;
	var charmItem = "";
	for (item in equipment["charms"]) {
		if (equipment["charms"][item].name == val) {
			charmItem = equipment["charms"][item]
			size = charmItem.size
		}
	}
	var autoCast = settings.autocast;
	var r = Math.floor((Math.random() * 3));
	if (size == "grand") { charmHeight = "88"; charmImage = charm_img.prefix+charm_img.grand[r]; charm_y = 3; }
	else if (size == "large") { charmHeight = "59"; charmImage = charm_img.prefix+charm_img.large[r]; charm_y = 2; }
	else if (size == "small") { charmHeight = "29"; charmImage = charm_img.prefix+charm_img.small[r]; charm_y = 1; }
	if (typeof(charmItem.debug) != 'undefined') {
		if (val == "+20 skills") { charmHeight = "29"; charmImage = charm_img.prefix+"debug_II.png"; charm_y = 1; }
		else if (val == "+1 skill") { charmHeight = "29"; charmImage = charm_img.prefix+"debug_D.png"; charm_y = 1; }
		else if (val == "+1 (each) skill") { charmHeight = "29"; charmImage = charm_img.prefix+"debug_P.png"; charm_y = 1;
			if (autoCast == 1) { toggleAutocast("autocast"); document.getElementById("autocast").checked = 0; }
		}
		else if (val == "everything") { charmHeight = "29"; charmImage = charm_img.prefix+"debug_face.png"; charm_y = 1; }
		else { charmHeight = "29"; charmImage = charm_img.prefix+"debug_skull.png"; charm_y = 1; }
	}
	
	var allow = 1;
	for (let c = 1; c <= inv[0].in.length; c++) {
		if (inv[0].in[c] == val) {
			if (val == "Annihilus" || val == "Hellfire Torch" || val == "Gheed's Fortune") { allow = 0 } }
	}
	if (allow == 1) {
		if (val != "Annihilus" && val != "Hellfire Torch" && val != "Gheed's Fortune") {
			var append = "" + Math.floor((Math.random() * 999999) + 1);	// generate "unique" ID for charm
			val = val + "_" + append
		}
		if (nameVal == "Annihilus") { charmImage = charm_img.prefix+"charm1u.png"; }
		if (nameVal == "Hellfire Torch") { charmImage = charm_img.prefix+"charm2u.png"; }
		if (nameVal == "Gheed's Fortune") { charmImage = charm_img.prefix+"charm3u.png"; }
		if (nameVal == "Horadric Sigil") { charmImage = charm_img.prefix+"charm3s.png"; }
		var charmHTML = '<img style="width: ' + charmWidth + '; height: ' + charmHeight + '; pointer-events: auto;" id="' + val + '" src="' + charmImage + '" draggable="true" ondragstart="drag(event)" width="' + charmWidth + '" height="' + charmHeight + '" oncontextmenu="trash(event)" onmouseover="itemHover(event, this.value)" onmouseout="itemOut()" onclick="itemSelect(event)">';
		var insertion = "";
		var space_found = 0;
		var empty = 1;
		var i = 0;
		for (let x = 1; x <= 10; x++) {
			for (let y = 0; y < 4; y++) {
				i = y*10 + x
				empty = 1
				if (space_found == 0 && charm_y + (y+1) <= 5) {
					if (inv[i].empty == 0) { empty = 0 }
					if (charm_y > 1 && inv[i+10].empty == 0) { empty = 0 }
					if (charm_y > 2 && inv[i+20].empty == 0) { empty = 0 }
				} else { empty = 0 }
				if (empty == 1) { space_found = i }
			}
		}
		if (space_found > 0) {
			var i = space_found;
			insertion = inv[i].id;
			inv[i].empty = 0
			inv[0].in[i] = val
			if (charm_y > 1) { inv[i+10].empty = 0; inv[0].in[i+10] = val; }
			if (charm_y > 2) { inv[i+20].empty = 0; inv[0].in[i+20] = val; }
			document.getElementById(insertion).innerHTML += charmHTML;
			var ch = "charms";
			equipped[ch][val] = {}
			for (item in equipment[ch]) {
				if (equipment[ch][item].name == nameVal) {
					for (affix in equipment[ch][item]) {
						equipped[ch][val][affix] = equipment[ch][item][affix]
						if (affix != "name" && affix != "only" && affix != "rarity" && affix != "size" && affix != "pod_changes" && affix != "req_level") {
							character[affix] += equipment[ch][item][affix]
						}
					}
				}
			}
		}
	}
	document.getElementById("dropdown_charms").selectedIndex = 0
	// update
//	calculateSkillAmounts()
//	updateStats()
//	updateSkills()
//	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
//	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateAllEffects()
	if (settings.autocast != autoCast) { toggleAutocast("autocast"); settings.autocast = 1; document.getElementById("autocast").checked = 1; }
}

// addSocketable - Adds a jewel, rune, or gem to the inventory
//	val: the name of the socketable item
// ---------------------------------
function addSocketable(val) {
	// TODO: Reduce duplicated code from addCharm()?
	var prefix = "./images/items/socketables/";
	var jewels = ["Jewel_blue.png","Jewel_green.png","Jewel_peach.png","Jewel_purple.png","Jewel_red.png","Jewel_white.png",];
	var itemImage = "";
	var nameVal = val;
	var item = "";
	for (sock in socketables) { if (socketables[sock].name == val) { item = socketables[sock] } }
	var r = Math.floor((Math.random() * 6));
	if (item.type == "jewel") { itemImage = prefix + "jewel/" + jewels[r] }
	else if (item.type == "rune" || item.type == "gem") { itemImage = prefix + item.type+"/" + item.name.split(' ').join('_') + ".png" }
	else if (item.type == "other") { itemImage = prefix + item.name+".png" }
	else { itemImage = prefix + "debug_plus.png" }
	
	var append = "_" + Math.floor((Math.random() * 999999) + 1);	// generate "unique" ID for item
	val = val + append
	
	var socketable = 'socketable';
	var itemHTML = '<img style="width: 28; height: 28; pointer-events: auto; z-index:5;" id="' + val + '" src="' + itemImage + '" draggable="true" ondragstart="dragSocketable(event)" width="28" height="28" oncontextmenu="trashSocketable(event)" onmouseover="itemHover(event, this.value)" onmouseout="itemOut()" onclick="socketableSelect(event)">';
	var insertion = "";
	var space_found = 0;
	var empty = 1;
	var i = 0;
	for (let x = 1; x <= 10; x++) {
		for (let y = 0; y < 4; y++) {
			i = y*10 + x
			empty = 1
			if (space_found == 0 && 1 + (y+1) <= 5) {
				if (inv[i].empty == 0) { empty = 0 }
			} else { empty = 0 }
			if (empty == 1) { space_found = i }
		}
	}
	if (space_found > 0) {
		var i = space_found;
		insertion = inv[i].id;
		inv[i].empty = 0
		inv[0].in[i] = val
		document.getElementById(insertion).innerHTML += itemHTML;
	}
	document.getElementById("dropdown_socketables").selectedIndex = 0
}

// addEffect - 
//	origin: what kind of source the effect has ("skill", "aura", "misc")
//	name: name of the chosen effect
//	num: index, or aura level
//	other: "mercenary" for auras
// ---------------------------------
function addEffect(origin, name, num, other) {
	if (origin == "misc") { name = non_items[num].effect; document.getElementById("dropdown_misc").selectedIndex = 0; }
	var id = name.split(' ').join('_');
	if (other != "") { id += ("-"+other) }
	if (document.getElementById(id) == null) { initializeEffect(origin,name,num,other) }
	else { trackDuplicateEffects(name) }
	updateAllEffects()
}

// initializeEffect - 
//	origin: what kind of source the effect has ("skill", "aura", "misc")
//	name: name of the chosen effect
//	num: index, or aura level
//	other: "mercenary" for auras
// ---------------------------------
function initializeEffect(origin, name, num, other) {
	var id = name.split(' ').join('_');
	if (other != "") { id += ("-"+other) }
	var prefix = "./images/effects/";
	var fileType = ".png";
	if (origin == "misc") {fileType = ".gif"}
	if (origin == "skill") { prefix = "./images/skills/"+character.class_name.toLowerCase()+"/"; }
	if (origin == "oskill") { prefix = "./images/skills/"+oskills_info["oskill_"+id].native_class+"/"; }
	var iconOff = prefix+"dark/"+name+" dark.png";
	var iconOn = prefix+name+fileType;
	
	var newEffect = document.createElement("img")
	var eClass = document.createAttribute("class");			eClass.value = "effect";			newEffect.setAttributeNode(eClass);
	var eId = document.createAttribute("id");			eId.value = id;					newEffect.setAttributeNode(eId);
	var eSrc = document.createAttribute("src");			eSrc.value = iconOff;				newEffect.setAttributeNode(eSrc);
	var eHoverOn = document.createAttribute("onmouseover");		eHoverOn.value = "hoverEffectOn(this.id)";	newEffect.setAttributeNode(eHoverOn);
	var eHoverOff = document.createAttribute("onmouseout");		eHoverOff.value = "hoverEffectOff(this.id)";	newEffect.setAttributeNode(eHoverOff);
	var eToggle = document.createAttribute("onclick");		eToggle.value = "toggleEffect(this.id)";	newEffect.setAttributeNode(eToggle);
	var eRemove = document.createAttribute("oncontextmenu");	eRemove.value = "removeEffect(this.id,1)";	newEffect.setAttributeNode(eRemove);
	var effectGUI = document.getElementById("side");
	effectGUI.appendChild(newEffect);
	
	if (typeof(effects[id]) == 'undefined') { effects[id] = {info:{}} }
	
	effects[id].info.enabled = 0
	effects[id].info.imageOff = iconOff
	effects[id].info.imageOn = iconOn
	effects[id].info.origin = origin
	effects[id].info.index = num
	effects[id].info.other = other
	setEffectData(origin,name,num,other)
	
	if (settings.autocast == 1) { toggleEffect(id) }	// TODO: should also toggle-on if effect is always-active
}

// setEffectData - 
//	origin: what kind of source the effect has ("skill", "aura", "misc")
//	name: name of the chosen effect
//	num: index, or aura level
//	other: "mercenary" for auras
// ---------------------------------
function setEffectData(origin, name, num, other) {
	var id = name.split(' ').join('_');
	if (other != "") { id += ("-"+other) }
	var data = {};
	if (origin == "aura") { data = getAuraData(name,num,other) }
	else if (origin == "skill") { data = character.getBuffData(skills[num]) }
	else if (origin == "oskill") { data = character_any.getBuffData(skills_all[oskills_info["oskill_"+id].native_class][num]) }
	else if (origin == "misc") { data = getMiscData(name,num); }
	for (affix in data) { effects[id][affix] = data[affix] }
}

// removeEffect - 
//	id: the effect's id
//	direct: whether the effect icon was clicked directly (1 or null)
// ---------------------------------
function removeEffect(id, direct) {
	if (document.getElementById(id) != null) {
		var on = effects[id].info.enabled;
		var secondary = "";
		if (on == 1) { if (typeof(effects[id].info.secondary) != 'undefined') { secondary = effects[id].info.secondary } }
		var halt = 0;
		if (direct != null && effects[id].info.origin != "misc") { halt = 1 }
		if (effects[id].info.origin == "skill") {
			halt = 1;
			var skill = skills[effects[id].info.index];
			if (typeof(skill.effect) != 'undefined') { if (skill.effect > 2) { if (skill.level == 0 && skill.force_levels == 0) { halt = 0 } } }
		}
		if (effects[id].info.enabled == 1) { disableEffect(id) }
		update()
		if (halt == 0) {
			document.getElementById(id).remove();
			effects[id] = {info:{}}
			if (on == 1 && secondary != "") { enableEffect(secondary); }
			updateAllEffects()
		}
	}
}

// toggleEffect - 
//	id: the effect's id
// ---------------------------------
function toggleEffect(id) {
	if (effects[id].info.enabled == 1) {
		disableEffect(id)
	} else {
		enableEffect(id)
	}
	updateEffect(id)	// current effect prioritized
	updateAllEffects()
}

// disableEffect - 
//	id: the effect's id
// ---------------------------------
function disableEffect(id) {
	if (document.getElementById(id) != null && effects[id].info.enabled == 1) {
		effects[id].info.enabled = 0
		document.getElementById(id).src = effects[id].info.imageOff
		for (affix in effects[id]) { if (affix != "info") { character[affix] -= effects[id][affix] } }
		//update() or updateEffect(id)?
	}
}

// enableEffect - 
//	id: the effect's id
// ---------------------------------
function enableEffect(id) {
	if (document.getElementById(id) != null && effects[id].info.enabled == 0) {
		effects[id].info.enabled = 1
		document.getElementById(id).src = effects[id].info.imageOn
		for (affix in effects[id]) { if (affix != "info") { character[affix] += effects[id][affix] } }
	}
}

// updateAllEffects - 
// ---------------------------------
function updateAllEffects() {
	calculateSkillAmounts()
	// updates skill effects
	for (let s = 0; s < skills.length; s++) {
		var skill = skills[s];
		if (typeof(skill.effect) != 'undefined') { if (skill.effect > 2) {
			var id = skill.name.split(' ').join('_');
			if (skill.level > 0 || skill.force_levels > 0) {
				if (document.getElementById(id) == null) { addEffect("skill",skill.name,skill.i,"") }
				else {
					updateEffect(id)
				}
			} else {
				if (document.getElementById(id) != null) { removeEffect(id) }
			}
		} }
	}
	// updates oskill effects
	if (character.class_name != null) {
		for (let o = 0; o < oskills.length; o++) {
			var natClass = oskills_info[oskills[o]].native_class;
			if (natClass != "none" && natClass != character.class_name.toLowerCase()) {
				var skill = skills_all[natClass][oskills_info[oskills[o]].i]
				if (typeof(skill.effect) != 'undefined') { if (skill.effect > 2) {
					var id = skill.name.split(' ').join('_');
					if (character[oskills[o]] > 0) {
						if (document.getElementById(id) == null) { addEffect("oskill",skill.name,skill.i,"") }
						else {
							updateEffect(id)
						}
					} else {
						if (document.getElementById(id) != null) { removeEffect(id) }
					}
				} }
			}
		}
	}
	update()	// needed?
	// disables duplicate effects (non-skills)
	for (id in effects) { if (document.getElementById(id) != null) { if (document.getElementById(id).getAttribute("class") == "hide") { document.getElementById(id).setAttribute("class","effect") } } }
	var checkedEffects = {};
	for (id in effects) { checkedEffects[id] = 0 }
	for (id1 in effects) {
		if (typeof(effects[id1].info.enabled) != 'undefined' && effects[id1].info.origin != "skill") {
			for (id2 in effects) {
				if (id1 != id2 && checkedEffects[id2] != 1 && typeof(effects[id2].info.enabled) != 'undefined' && effects[id2].info.origin != "skill") {
					var effect1 = id1.split('-')[0];
					var effect2 = id2.split('-')[0];
					var skillEnabled = 0;
					if (typeof(effects[effect1]) != 'undefined') { if ((effects[effect1].info.enabled) != 'undefined') { if (effects[effect1].info.enabled == 1) { skillEnabled = 1; } } }
					if (effect1 == effect2) {
						if (document.getElementById(id1).getAttribute("class") != "hide" && document.getElementById(id2).getAttribute("class") != "hide") {
							var magnitude1 = effects[id1].info.index;
							var magnitude2 = effects[id2].info.index;
							if (magnitude1 > magnitude2) {
								document.getElementById(id2).setAttribute("class","hide");
								document.getElementById(id1).setAttribute("class","effect");
								effects[id1].info.secondary = id2;
							}
							else {
								document.getElementById(id1).setAttribute("class","hide");
								document.getElementById(id2).setAttribute("class","effect");
								effects[id2].info.secondary = id1;
							}
						}
					}
				}
			}
		}
		checkedEffects[id1] = 1
	}
	for (id in effects) { if (typeof(effects[id].info.enabled) != 'undefined') { if (document.getElementById(id).getAttribute("class") == "hide") { disableEffect(id) } } }
	// disables duplicate effects (skills)
	if (character.class_name == "Paladin") { for (id1 in effects) {
		if (typeof(effects[id1].info.enabled) != 'undefined' && effects[id1].info.enabled == 1 && effects[id1].info.origin == "skill") {
			for (id2 in effects) {
				if (typeof(effects[id2].info.enabled) != 'undefined' && id1 != id2 && effects[id2].info.enabled == 1 && effects[id2].info.origin != "skill" && document.getElementById(id2).getAttribute("class") != "hide") {
					var effect1 = id1.split('-')[0];
					var effect2 = id2.split('-')[0];
					if (effect1 == effect2) {
						effects[id1].info.secondary = id2;
						var magnitude1 = skills[effects[id1].info.index].level + skills[effects[id1].info.index].extra_levels;
						var magnitude2 = effects[id2].info.index;
						if (magnitude1 >= magnitude2) { disableEffect(id2); enableEffect(id1); }
						else { disableEffect(id1); enableEffect(id2); }
					}
				}
			}
		}
		update()	// needed?
	} }
	update()
}

// updateEffect - 
//	id: the effect's id
// ---------------------------------
function updateEffect(id) {
	var origin = effects[id].info.origin;
	var index = effects[id].info.index;
	var other = effects[id].info.other;
	var name = id.split('-')[0].split('_').join(' ');
	var active = effects[id].info.enabled;
	var old_data = {}
	for (affix in effects[id]) { if (affix != "info") { old_data[affix] = effects[id][affix] } }
	
	setEffectData(origin,name,index,other)
	if (active == 1) {
		for (affix in old_data) { character[affix] -= old_data[affix] }
		effects[id].info.enabled = 0
		enableEffect(id)
	}
}

// trackDuplicateEffects - 
//	id: the effect's id
// ---------------------------------
function trackDuplicateEffects(id) {
	// unneeded?
}

// hoverEffectOn - 
//	id: the effect's id
// ---------------------------------
function hoverEffectOn(id) {}

// hoverEffectOff - 
//	id: the effect's id
// ---------------------------------
function hoverEffectOff(id) {}

// resetEffects - Removes all effects
// ---------------------------------
function resetEffects() {
	for (id in effects) { if (document.getElementById(id) != null) { removeEffect(id) } }
}

// getAuraData - gets a list of stats corresponding to the aura (excludes synergy bonuses)
//	aura: name of the aura
//	lvl: level of the aura (1+)
//	source: "mercenary" or the item type which is granting the aura
// result: indexed array of stats granted and their values
// ---------------------------------
function getAuraData(aura, lvl, source) {
	source = source.split('_')[0]
	var result = {};
	var a = -1;
	var auras = [];
	for (let u = 0; u < 20; u++) {
		if (skills_all["paladin"][u].name == aura) { auras = skills_all["paladin"]; a = u; }
	}
	for (let u = 0; u < auras_extra.length; u++) {
		if (auras_extra[u].name == aura) { auras = auras_extra; a = u; }
	}
	// Defensive Auras
	if (aura == "Prayer") { result.life_regen = 1; result.life_replenish = auras[a].data.values[0][lvl]; }
	else if (aura == "Resist Fire") { result.fRes = auras[a].data.values[1][lvl]; result.fRes_max = auras[a].data.values[2][lvl]; }
	else if (aura == "Defiance") { result.defense_bonus = auras[a].data.values[0][lvl]; }
	else if (aura == "Resist Cold") { result.cRes = auras[a].data.values[1][lvl]; result.cRes_max = auras[a].data.values[2][lvl]; }
	else if (aura == "Cleansing") { result.poison_length_reduced = auras[a].data.values[2][lvl]; result.curse_length_reduced = auras[a].data.values[2][lvl]; }
	else if (aura == "Resist Lightning") { result.lRes = auras[a].data.values[1][lvl]; result.lRes_max = auras[a].data.values[2][lvl]; }
	else if (aura == "Vigor") { result.velocity = auras[a].data.values[0][lvl]; result.max_stamina = auras[a].data.values[1][lvl]; result.heal_stam = auras[a].data.values[2][lvl]; }
	else if (aura == "Meditation") { result.mana_regen = auras[a].data.values[1][lvl]; }
	else if (aura == "Redemption") { result.recovery_per_corpse = auras[a].data.values[0][lvl]/100 * auras[a].data.values[1][lvl]; }
	else if (aura == "Salvation") { result.fDamage = auras[a].data.values[0][lvl]; result.cDamage = auras[a].data.values[0][lvl]; result.lDamage = auras[a].data.values[0][lvl]; result.all_res = auras[a].data.values[1][lvl]; }
	// Offensive Auras
	else if (aura == "Might") { result.damage_bonus = auras[a].data.values[0][lvl]; }
	else if (aura == "Holy Fire") { result.fDamage_min = auras[a].data.values[0][lvl]; result.fDamage_max = auras[a].data.values[1][lvl]; }
	else if (aura == "Precision") { result.cstrike = auras[a].data.values[2][lvl]; result.ar_bonus = auras[a].data.values[3][lvl]; if (source == "mercenary") { result.pierce = auras[a].data.values[1][lvl] } else { result.pierce = auras[a].data.values[0][lvl] }}
	else if (aura == "Blessed Aim") { result.ar_bonus = auras[a].data.values[2][lvl]; result.hammer_on_hit = auras[a].data.values[1][lvl]; }
	else if (aura == "Concentration") { result.ar_bonus = auras[a].data.values[0][lvl]; result.damage_bonus = auras[a].data.values[1][lvl]; result.hammer_bonus = auras[a].data.values[2][lvl]; }
	else if (aura == "Holy Freeze") { result.cDamage_min = auras[a].data.values[0][lvl]; result.cDamage_max = auras[a].data.values[1][lvl]; result.slow_enemies = auras[a].data.values[2][lvl]; }
	else if (aura == "Holy Shock") { result.lDamage_min = auras[a].data.values[0][lvl]; result.lDamage_max = auras[a].data.values[1][lvl]; }
	else if (aura == "Sanctuary") { result.damage_vs_undead = auras[a].data.values[0][lvl]; }
	else if (aura == "Fanaticism") { result.ias_skill = auras[a].data.values[2][lvl]; result.ar_bonus = auras[a].data.values[3][lvl]; if (source == "mercenary") { result.damage_bonus = auras[a].data.values[0][lvl] } else { result.damage_bonus = auras[a].data.values[1][lvl] }}
	else if (aura == "Conviction") { result.enemy_defense = auras[a].data.values[0][lvl]; result.enemy_fRes = auras[a].data.values[1][lvl]; result.enemy_cRes = auras[a].data.values[1][lvl]; result.enemy_lRes = auras[a].data.values[1][lvl]; result.enemy_pRes = auras[a].data.values[1][lvl]; }
	// Others
	else if (aura == "Thorns") { result.thorns_reflect = auras[a].values[0][lvl]; }
	else if (aura == "Inner Sight") { result.enemy_defense_flat = auras[a].values[0][lvl]; }
	//else if (aura == "Enflame") { result.fDamage_min = skill.data.values[1][lvl]; result.fDamage_max = skill.data.values[2][lvl]; result.ar_bonus = skill.data.values[3][lvl]; }
	else if (aura == "Righteous Fire") { result.flamme = auras[a].values[0][lvl]; }		// No buffs. Deals 45% of max life as fire damage per second in a small area.
	else if (aura == "Lifted Spirit") { result.wisp = auras[a].values[0][lvl]; }
	
	return result;
}

// getMiscData - 
//	name: name of selected misc effect
//	index: index of the selected misc element
// return: affixes of the misc element
// ---------------------------------
function getMiscData(name, index) {
	var result = {};
	for (affix in non_items[index]) { if (affix != "i" && affix != "name" && affix != "duration" && affix != "recharge" && affix != "effect") {
		result[affix] = non_items[index][affix]
	} }
	return result
}

// toggleQuests - Toggles the completion of all quests and their rewards
//	quests: name identifier for 'Quests Completed' checkbox element
// ---------------------------------
function toggleQuests(quests) {
	if (quests.checked == false && (character.skillpoints < 12 || character.statpoints < 15)) { quests.checked = true }
	else {
		character.quests_completed *= -1
		var toggle = character.quests_completed
		character.skillpoints += (12*toggle)
		character.statpoints += (15*toggle)
		character.life += (60*toggle)
		character.fRes += (30*toggle)
		character.cRes += (30*toggle)
		character.lRes += (30*toggle)
		character.pRes += (30*toggle)
		// TODO: Include merchant price discount?
		updatePrimaryStats()
		updateOther()
	}
}

// toggleRunning - Toggles whether the character is running or walking/standing
//	running: name identifier for 'Running' checkbox element
// ---------------------------------
function toggleRunning(running) {
	if (running.checked) { character.running = 1 } else { character.running = 0 }
	updateStats()
}

// changeDifficulty - Changes the game difficulty
//	diff: game difficulty (1-3)
// ---------------------------------
function changeDifficulty(diff) {
	character.difficulty = diff
	var penalties = ["fRes_penalty", "cRes_penalty", "lRes_penalty", "pRes_penalty", "mRes_penalty"]
	for (let p = 0; p < penalties.length; p++) {
		if (diff == 1) { character[penalties[p]] = 0 }
		else if (diff == 2) { character[penalties[p]] = 40 }
		else if (diff == 3) { character[penalties[p]] = 100 }
	}
	updatePrimaryStats()
	updateOther()
}

// toggleCoupling - Changes whether adding/removing skill points can affect character level
//	coupling: name identifier for 'Skill Level Coupling' checkbox element
// ---------------------------------
function toggleCoupling(coupling) {
	if (coupling.checked) { settings.coupling = 1 } else { settings.coupling = 0 }
}

// toggleAutocast - Changes whether buffs and auras are automatically enabled when added
//	autocast: name identifier for 'New Effects Begin Enabled' checkbox element
// ---------------------------------
function toggleAutocast(autocast) {
	if (autocast.checked) { settings.autocast = 1 } else { settings.autocast = 0 }
}

// getWeaponDamage - Calculates physical min/max damage and multiplier for an equipped weapon
//	str: total strength
//	dex: total dexterity
//	type: type of the weapon
//	thrown: 1 if the weapon is being thrown
// return: array with [min damage, max damage, multiplier]
// ---------------------------------
function getWeaponDamage(str, dex, type, thrown) {
// TODO: make useable for offhand weapons too
	var c = character;
	// multiplier from stats
	var statBonus = 0;
	if (typeof(type) != 'undefined') { 
		if (type == "hammer") { statBonus = (str*1.1/100) }
		else if (typeof(equipped.weapon.only) != 'undefined') { if ((type == "spear" || type == "javelin") && equipped.weapon.only == "amazon") { statBonus = ((str*0.8/100)+(dex*0.5/100)) } }
		else if (type == "bow" || type == "crossbow" || type == "javelin") { statBonus = (dex/100) }						// check if javelins are counted as missile weapons or throwing weapons
		else if (type == "dagger" || type == "thrown" || type == "claw" || type == "javelin") { statBonus = ((str*0.75/100)+(dex*0.75/100)) }	// check if javelins are counted as missile weapons or throwing weapons
		else  { statBonus = (str/100) }
	}
	// multiplier from skills
	var weapon_skillup = 0;
	if (c.class_name == "Barbarian" || c.class_name == "Assassin") {
		if (type == "sword" || type == "axe" || type == "dagger") { weapon_skillup = c.edged_skillup[0]; c.ar_skillup = c.edged_skillup[1]; c.cstrike_skillup = c.edged_skillup[2]; }
		else if (type == "polearm" || type == "spear") { weapon_skillup = c.pole_skillup[0]; c.ar_skillup = c.pole_skillup[1]; c.cstrike_skillup = c.pole_skillup[2]; }
		else if (type == "mace" || type == "scepter" || type == "staff" || type == "hammer" || type == "club" || type == "wand") { weapon_skillup = c.blunt_skillup[0]; c.ar_skillup = c.blunt_skillup[1]; c.cstrike_skillup = c.blunt_skillup[2]; }
		else if (type == "thrown" || type == "javelin") { weapon_skillup = c.thrown_skillup[0]; c.ar_skillup = c.thrown_skillup[1]; c.pierce_skillup = c.thrown_skillup[2]; }	// check if javelins can benefit from Pole Weapon Mastery
		else if (type == "claw") { weapon_skillup = c.claw_skillup[0]; c.ar_skillup = c.claw_skillup[1]; c.cstrike_skillup = c.claw_skillup[2]; }
		else { weapon_skillup = 0; c.ar_skillup = 0; c.cstrike_skillup = 0; c.pierce_skillup = 0; }
	}
	var e_damage_offhand = 0;
	if (offhandType == "weapon") { e_damage_offhand = (~~equipped.offhand.e_damage + ~~socketed.offhand.totals.e_damage + ~~corruptsEquipped.offhand.e_damage); }
	var e_damage = c.e_damage + (c.level*c.e_max_damage_per_level) - e_damage_offhand;
	var base_min = ~~equipped.weapon.base_damage_min;
	var base_max = ~~equipped.weapon.base_damage_max;
	if (thrown == 1) { base_min = ~~equipped.weapon.throw_min; base_max = ~~equipped.weapon.throw_max; }
	var phys_min = (base_min * (1+e_damage/100) + c.damage_min + (c.level-1)*c.min_damage_per_level);
	var phys_max = (base_max * (1+e_damage/100) + c.damage_max + (c.level-1)*c.max_damage_per_level);
	var phys_mult = (1+statBonus+(c.damage_bonus+weapon_skillup)/100);
	var values = [phys_min, phys_max, phys_mult];
	
	return values
}

// updateStats - Updates all stats
// ---------------------------------
function updateStats() { updatePrimaryStats(); updateOther(); updateSecondaryStats(); updateTertiaryStats(); }

// updateStats - Updates stats shown by the default (original D2) stat page
// ---------------------------------
function updatePrimaryStats() {
	var c = character;
	var strTotal = (c.strength + c.all_attributes + (c.level-1)*c.strength_per_level);
	var dexTotal = (c.dexterity + c.all_attributes + (c.level-1)*c.dexterity_per_level);
	var vitTotal = (c.vitality + c.all_attributes + (c.level-1)*c.vitality_per_level);
	var energyTotal = (c.energy + c.all_attributes)*(1+c.max_energy/100);
	
	var weaponType = equipped.weapon.type;
	var physDamage = getWeaponDamage(strTotal,dexTotal,weaponType,0);
	
	var life_addon = (vitTotal-c.starting_vitality)*c.life_per_vitality;
	var stamina_addon = (vitTotal-c.starting_vitality)*c.stamina_per_vitality;
	var mana_addon = (energyTotal-c.starting_energy)*c.mana_per_energy;
	
	var def = (c.base_defense + c.defense + c.level*c.defense_per_level + Math.floor(dexTotal/4)) * (1 + (c.defense_bonus + c.defense_skillup)/100);
	var ar = ((dexTotal - 7) * 5 + c.ar + c.level*c.ar_per_level + c.ar_const + (c.ar_per_socketed*socketed.offhand.socketsFilled)) * (1+(c.ar_skillup + c.ar_bonus + c.level*c.ar_bonus_per_level)/100) * (1+c.ar_shrine_bonus/100);
	var wisp = 1+~~Math.round(c.wisp/20,0)/10
	
	var fMin = c.fDamage_min*(1+(c.fDamage+c.fDamage_skillup)/100)*wisp;
	var fMax = (c.fDamage_max+(c.level*c.fDamage_max_per_level))*(1+(c.fDamage+c.fDamage_skillup)/100)*wisp;
	var cMin = (c.cDamage_min+(c.cDamage_per_ice*c.charge_ice)+(c.cDamage_per_socketed*socketed.weapon.socketsFilled))*(1+(c.cDamage+c.cDamage_skillup)/100)*wisp;
	var cMax = (c.cDamage_max+(c.cDamage_per_ice*c.charge_ice)+(c.level*c.cDamage_max_per_level)+(c.cDamage_per_socketed*socketed.weapon.socketsFilled))*(1+(c.cDamage+c.cDamage_skillup)/100)*wisp;
	var lMin = c.lDamage_min*(1+(c.lDamage+c.lDamage_skillup)/100)*wisp;
	var lMax = (c.lDamage_max+(Math.floor(energyTotal/2)*c.lDamage_max_per_2_energy))*(1+(c.lDamage+c.lDamage_skillup)/100)*wisp;
	var pMin = (c.pDamage_all+c.pDamage_min)*(1+c.pDamage/100)*wisp;	// TODO: Damage over time should be separate from regular damage. Calculate poison bitrate.
	var pMax = (c.pDamage_all+c.pDamage_max)*(1+c.pDamage/100)*wisp;	//	 Also, poison doesn't overlap from different sources?
	
	var basic_min = Math.floor(physDamage[0]*physDamage[2]*wisp + fMin + cMin + lMin + pMin + c.mDamage_min);
	var basic_max = Math.floor(physDamage[1]*physDamage[2]*wisp + fMax + cMax + lMax + pMax + c.mDamage_max);
	if (basic_min > 0 || basic_max > 0) { document.getElementById("basic_attack").innerHTML = basic_min + "-" + basic_max + " {"+Math.ceil((basic_min+basic_max)/2)+"}"}
	else { document.getElementById("basic_attack").innerHTML = "" }
	// TODO: Create display for offhand attacks (separate damage & AR)
	
	var block = c.block + c.ibc;
	if (c.class_name != "Paladin") { block -= 5; if (c.class_name == "Druid" || c.class_name == "Necromancer" || c.class_name == "Sorceress") { block -= 5 } }
	block = (Math.max(0,block) + c.block_skillup + c.ibc)*(dexTotal-15)/(c.level*2)
	if (c.running > 0) { block = Math.min(25,block/3) }
	if (c.block > 0) {
		document.getElementById("block_label").style.visibility = "visible"
		document.getElementById("block").innerHTML = Math.floor(Math.min(75,block))+"%"
	} else {
		document.getElementById("block_label").style.visibility = "hidden"
		document.getElementById("block").innerHTML = ""
	}
	
	document.getElementById("strength").innerHTML = Math.floor(strTotal)
	document.getElementById("dexterity").innerHTML = Math.floor(dexTotal)
	document.getElementById("vitality").innerHTML = Math.floor(vitTotal)
	document.getElementById("energy").innerHTML = Math.floor(energyTotal)
	document.getElementById("strength2").innerHTML = Math.floor(strTotal)
	document.getElementById("dexterity2").innerHTML = Math.floor(dexTotal)
	document.getElementById("vitality2").innerHTML = Math.floor(vitTotal)
	document.getElementById("energy2").innerHTML = Math.floor(energyTotal)
	document.getElementById("defense").innerHTML = Math.floor(def + c.melee_defense)
	if ((c.missile_defense-c.melee_defense) > 0) { document.getElementById("defense").innerHTML += " (+" + (c.missile_defense) + ")" }	// add difference when missile & melee defense are both present?
	if (c.running > 0) { document.getElementById("defense").style.color = "brown" }
	else { document.getElementById("defense").style.color = "gray" }
	document.getElementById("ar").innerHTML = Math.floor(ar)
	document.getElementById("stamina").innerHTML = Math.floor((c.stamina + (c.level-1)*c.stamina_per_level + stamina_addon) * (1+c.stamina_skillup/100) * (1+c.max_stamina/100))
	var lifeTotal = Math.floor((c.life + (c.level-1)*c.life_per_level + life_addon) * (1 + c.max_life/100));
	document.getElementById("life").innerHTML = lifeTotal
	document.getElementById("mana").innerHTML = Math.floor((c.mana + (c.level-1)*c.mana_per_level + mana_addon) * (1 + c.max_mana/100))
	document.getElementById("level").innerHTML = c.level
	document.getElementById("class_name").innerHTML = c.class_name
	document.getElementById("remainingstats").innerHTML = c.statpoints
	document.getElementById("remainingskills").innerHTML = c.skillpoints
	document.getElementById("fres").innerHTML = (c.fRes + c.all_res - c.fRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.fRes_max_base + c.fRes_max + c.fRes_skillup)) + "%"
	document.getElementById("cres").innerHTML = (c.cRes + c.all_res - c.cRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.cRes_max_base + c.cRes_max + c.cRes_skillup)) + "%"
	document.getElementById("lres").innerHTML = (c.lRes + c.all_res - c.lRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.lRes_max_base + c.lRes_max + c.lRes_skillup)) + "%"
	document.getElementById("pres").innerHTML = (c.pRes + c.all_res - c.pRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.pRes_max_base + c.pRes_max + c.pRes_skillup)) + "%"
	var magicRes = (c.mRes - c.mRes_penalty)+"%";
	if (c.mDamage_reduced > 0) { magicRes += (" +"+c.mDamage_reduced) }
	document.getElementById("mres").innerHTML = magicRes
	
	var ias = c.ias + c.ias_skill + Math.floor(dexTotal/8)*c.ias_per_8_dexterity;
	if (offhandType == "weapon" && typeof(equipped.offhand.ias) != 'undefined') { ias -= equipped.offhand.ias }
	document.getElementById("ias").innerHTML = ias; if (ias > 0) { document.getElementById("ias").innerHTML += "%" }
	if (equipped.weapon.type != "") {
		var eIAS = Math.floor(120*ias/(120+ias));
		var weaponFrames = 0;
		if (weaponType != "") {
			// TODO: Check weapon speed for 'thrown' weapons - additional penalty?
			if (weaponType == "club" || weaponType == "hammer") { weaponType = "mace" }
			weaponFrames = c.weapon_frames[weaponType];
			if (c.class_name == "Druid") {
				if (document.getElementById(getId(skills[11].name)) != null) { if (effects[getId(skills[11].name)].info.enabled == 1) { weaponFrames = c.wereform_frames[weaponType] } }
				if (document.getElementById(getId(skills[13].name)) != null) { if (effects[getId(skills[13].name)].info.enabled == 1) { weaponFrames = c.wereform_frames[weaponType] } }
			}
			if (weaponType == "sword" || weaponType == "axe" || weaponType == "mace") { if (equipped.weapon.twoHanded == 1) { weaponFrames = weaponFrames[1]; } else { weaponFrames = weaponFrames[0]; } }
		}
		var frames_per_attack = Math.ceil((weaponFrames*256)/Math.floor(256 * (100 + c.ias_skill + eIAS - c.baseSpeed) / 100));
		document.getElementById("ias").innerHTML += " ("+frames_per_attack+" fpa)"
	}
	if (c.flamme > 0) { document.getElementById("flamme").innerHTML = "Righteous Fire deals "+Math.floor((c.flamme/100*lifeTotal)*(1+(c.fDamage+c.fDamage_skillup)/100)*wisp)+" damage per second<br>" } else { document.getElementById("flamme").innerHTML = "" }
}

// updateSecondaryStats - Updates stats shown on the secondary (Path of Diablo) stat page
// ---------------------------------
function updateSecondaryStats() {
	var c = character;
//	var physRes = c.pdr; if (c.pdr > 0 || c.damage_reduced > 0) { physRes += "%" }
//	if (c.damage_reduced > 0) { physRes += (" +"+c.damage_reduced) }
//	document.getElementById("pdr").innerHTML = physRes

	var physRes = ""; if (c.pdr > 0) { physRes = c.pdr+"% " }
	if (c.damage_reduced > 0) { physRes += ("+"+c.damage_reduced) }
	if (c.pdr == 0 && c.damage_reduced == 0) { physRes = 0 }
	document.getElementById("pdr").innerHTML = physRes

	var fAbs = ""; if (c.fAbsorb > 0) { fAbs = c.fAbsorb+"% " }
	if (c.fAbsorb_flat > 0 || c.fAbsorb_flat_per_level > 0) { fAbs += ("+"+Math.floor(c.fAbsorb_flat + (c.level*c.fAbsorb_flat_per_level))) }
	if (c.fAbsorb == 0 && c.fAbsorb_flat == 0 && c.fAbsorb_flat_per_level == 0) { fAbs = 0 }
	document.getElementById("fabsorb").innerHTML = fAbs
	var cAbs = ""; if (c.cAbsorb > 0) { cAbs = c.cAbsorb+"% " }
	if (c.cAbsorb_flat > 0 || c.cAbsorb_flat_per_level > 0) { cAbs += ("+"+Math.floor(c.cAbsorb_flat + (c.level*c.cAbsorb_flat_per_level))) }
	if (c.cAbsorb == 0 && c.cAbsorb_flat == 0 && c.cAbsorb_flat_per_level == 0) { cAbs = 0 }
	document.getElementById("cabsorb").innerHTML = cAbs
	var lAbs = ""; if (c.lAbsorb > 0) { lAbs = c.lAbsorb+"% " }
	if (c.lAbsorb_flat > 0) { lAbs += ("+"+c.lAbsorb_flat) }
	if (c.lAbsorb == 0 && c.lAbsorb_flat == 0) { lAbs = 0 }
	document.getElementById("labsorb").innerHTML = lAbs
	document.getElementById("mabsorb").innerHTML = c.mAbsorb_flat
	
	document.getElementById("cdr").innerHTML = c.cdr; if (c.cdr > 0) { document.getElementById("cdr").innerHTML += "%" }
	document.getElementById("fcr").innerHTML = (c.fcr + Math.floor(c.level*c.fcr_per_level)); if (c.fcr > 0 || c.fcr_per_level > 0) { document.getElementById("fcr").innerHTML += "%" }
	document.getElementById("fbr").innerHTML = c.fbr; if (c.fbr > 0) { document.getElementById("fbr").innerHTML += "%" }
	document.getElementById("fhr").innerHTML = c.fhr; if (c.fhr > 0) { document.getElementById("fhr").innerHTML += "%" }
	
	// actual movespeed
	var movespeed = 9;
	var movement = (1 + (Math.floor(150*c.frw/(150+c.frw)) + c.frw_skillup + c.velocity)/100);
	if (c.running > 0) { movespeed = round(9 * movement) } else { movespeed = round(6 * movement) }
	document.getElementById("velocity").innerHTML = movespeed + " yds/s"
	document.getElementById("frw").innerHTML = Math.floor(c.frw + c.frw_skillup); if (c.frw > 0 || c.frw_skillup > 0) { document.getElementById("frw").innerHTML += "%" }
	
	document.getElementById("life_leech").innerHTML = c.life_leech; if (c.life_leech > 0) { document.getElementById("life_leech").innerHTML += "%" }
	document.getElementById("mana_leech").innerHTML = c.mana_leech; if (c.mana_leech > 0) { document.getElementById("mana_leech").innerHTML += "%" }
	var LPH = c.life_per_hit + "m , " + c.life_per_ranged_hit + "r";
	if (LPH == "0m , 0r") { LPH = 0 }
	document.getElementById("life_per_hit").innerHTML = LPH
	var MPH = c.mana_per_hit + "m , " + c.mana_per_ranged_hit + "r";
	if (MPH == "0m , 0r") { MPH = 0 }
	document.getElementById("mana_per_hit").innerHTML = MPH
	
	document.getElementById("fdamage").innerHTML = c.fDamage + c.fDamage_skillup; if (c.fDamage > 0 || c.fDamage_skillup > 0) { document.getElementById("fdamage").innerHTML += "%" }
	document.getElementById("cdamage").innerHTML = c.cDamage + c.cDamage_skillup; if (c.cDamage > 0 || c.cDamage_skillup > 0) { document.getElementById("cdamage").innerHTML += "%" }
	document.getElementById("ldamage").innerHTML = c.lDamage + c.lDamage_skillup; if (c.lDamage > 0 || c.lDamage_skillup > 0) { document.getElementById("ldamage").innerHTML += "%" }
	document.getElementById("pdamage").innerHTML = c.pDamage; if (c.pDamage > 0) { document.getElementById("pdamage").innerHTML += "%" }
	document.getElementById("fpierce").innerHTML = c.fPierce + c.fPierce_skillup; if (c.fPierce > 0 || c.fPierce_skillup > 0) { document.getElementById("fpierce").innerHTML += "%" }
	document.getElementById("cpierce").innerHTML = c.cPierce + c.cPierce_skillup; if (c.cPierce > 0 || c.cPierce_skillup > 0) { document.getElementById("cpierce").innerHTML += "%" }
	document.getElementById("lpierce").innerHTML = c.lPierce + c.lPierce_skillup; if (c.lPierce > 0 || c.lPierce_skillup > 0) { document.getElementById("lpierce").innerHTML += "%" }
	document.getElementById("ppierce").innerHTML = c.pPierce; if (c.pPierce > 0) { document.getElementById("ppierce").innerHTML += "%" }
	
	document.getElementById("pierce").innerHTML = c.pierce + c.pierce_skillup; if (c.pierce > 0 || c.pierce_skillup > 0) { document.getElementById("pierce").innerHTML += "%" }
	document.getElementById("cblow").innerHTML = c.cblow; if (c.cblow > 0) { document.getElementById("cblow").innerHTML += "%" }
	document.getElementById("dstrike").innerHTML = c.dstrike + Math.floor(c.level*c.dstrike_per_level); if (c.dstrike > 0) { document.getElementById("dstrike").innerHTML += "%" }
	document.getElementById("cstrike").innerHTML = c.cstrike + c.cstrike_skillup; if (c.cstrike > 0 || c.cstrike_skillup > 0) { document.getElementById("cstrike").innerHTML += "%" }
	document.getElementById("owounds").innerHTML = c.owounds; if (c.owounds > 0) { document.getElementById("owounds").innerHTML += "%" }
	
	document.getElementById("mf").innerHTML = Math.floor(c.mf + c.level*c.mf_per_level); if (c.mf != 0 || c.mf_per_level != 0) { document.getElementById("mf").innerHTML += "%" }
	document.getElementById("gf").innerHTML = c.gf; if (c.gf != 0) { document.getElementById("gf").innerHTML += "%" }
	
	document.getElementById("damage_vs_demons").innerHTML = c.damage_vs_demons; if (c.damage_vs_demons > 0) { document.getElementById("damage_vs_demons").innerHTML += "%" }
	document.getElementById("damage_vs_undead").innerHTML = Math.floor(c.damage_vs_undead + c.level*c.damage_vs_undead_per_level); if (c.damage_vs_undead > 0 || c.damage_vs_undead_per_level > 0) { document.getElementById("damage_vs_undead").innerHTML += "%" }
	document.getElementById("ar_vs_demons").innerHTML = c.ar_vs_demons
	document.getElementById("ar_vs_undead").innerHTML = Math.floor(c.ar_vs_undead + c.level*c.ar_vs_undead_per_level)
	
	if (c.life_per_demon_kill > 0) { document.getElementById("life_per_kill").innerHTML = c.life_per_kill + " , " + c.life_per_demon_kill + " (demons)" } else { document.getElementById("life_per_kill").innerHTML = c.life_per_kill }
	document.getElementById("mana_per_kill").innerHTML = c.mana_per_kill
	var lifeRegen = "";
	if (c.life_regen > 0) { lifeRegen = c.life_regen+"% " }; if (c.life_replenish > 0) { lifeRegen += ("+"+c.life_replenish) }; if (c.life_regen == 0 && c.life_replenish == 0) { lifeRegen = 0 }
	document.getElementById("life_regen").innerHTML = lifeRegen
	document.getElementById("mana_regen").innerHTML = round(c.mana_regen + c.mana_regen_skillup)+"%"
	
	document.getElementById("damage_to_mana").innerHTML = c.damage_to_mana; if (c.damage_to_mana > 0) { document.getElementById("damage_to_mana").innerHTML += "%" }
	
	document.getElementById("enemy_fres").innerHTML = c.enemy_fRes; if (c.enemy_fRes < 0) { document.getElementById("enemy_fres").innerHTML += "%" }
	document.getElementById("enemy_cres").innerHTML = c.enemy_cRes; if (c.enemy_cRes < 0) { document.getElementById("enemy_cres").innerHTML += "%" }
	document.getElementById("enemy_lres").innerHTML = c.enemy_lRes; if (c.enemy_lRes < 0) { document.getElementById("enemy_lres").innerHTML += "%" }
	document.getElementById("enemy_pres").innerHTML = c.enemy_pRes; if (c.enemy_pRes < 0) { document.getElementById("enemy_pres").innerHTML += "%" }
}

// updateTertiaryStats - Updates other stats
// ---------------------------------
function updateTertiaryStats() {
	var c = character;
	document.getElementById("poison_reduction").innerHTML = Math.min(75,c.poison_length_reduced); if (c.poison_length_reduced > 0) { document.getElementById("poison_reduction").innerHTML += "%" }
	document.getElementById("curse_reduction").innerHTML = Math.min(75,c.curse_length_reduced); if (c.curse_length_reduced > 0) { document.getElementById("curse_reduction").innerHTML += "%" }
	var thorns = c.thorns_reflect;
	if (c.thorns_reflect == 0) { thorns = Math.floor(c.thorns_lightning + c.thorns + c.level*c.thorns_per_level) } else { thorns += "%"; if (c.thorns > 0 || c.thorns_per_level > 0) { thorns += (" +"+Math.floor(c.thorns_lightning + c.thorns + c.level*c.thorns_per_level)) } }
	document.getElementById("thorns").innerHTML = thorns
	var lightRadius = "";
	if (c.light_radius > 0) { lightRadius = "+"+c.light_radius + " to Light Radius<br>" } else if (c.light_radius < 0) { lightRadius = c.light_radius + " to Light Radius<br>" } else { lightRadius = "" }
	document.getElementById("light_radius").innerHTML = lightRadius
	if (c.slower_stam_drain > 0) { document.getElementById("slower_stam_drain").innerHTML = "+"+c.slower_stam_drain+"% Slower Stamina Drain<br>" } else { document.getElementById("slower_stam_drain").innerHTML = "" }
	if (c.heal_stam > 0) { document.getElementById("heal_stam").innerHTML = "Heal Stamina +" + Math.floor(c.heal_stam + c.level*c.heal_stam_per_level)+"%<br>" } else { document.getElementById("heal_stam").innerHTML = "" }
	var enemyDef = "";
	if (c.enemy_defense != 0 || c.target_defense != 0) { enemyDef += (Math.min(99,(c.enemy_defense + c.target_defense))+"%"); if (c.enemy_defense_flat != 0 || c.monster_defense_per_hit != 0) { enemyDef += ", " } }
	if (c.enemy_defense_flat != 0) { enemyDef += c.enemy_defense_flat; if (c.monster_defense_per_hit != 0) { enemyDef += ", " } }
	if (c.monster_defense_per_hit != 0) { enemyDef += (c.monster_defense_per_hit+" per hit") }
	if (enemyDef == "") { enemyDef = "0"}
	document.getElementById("enemy_defense").innerHTML = enemyDef
	var enemyBlind = "";
	if (c.blind_on_hit > 0) { enemyBlind = "Hit Blinds Target"; if (c.blind_on_hit > 1) { enemyBlind += (" +"+c.blind_on_hit+"<br>"); } else { enemyBlind += "<br>" } }
	document.getElementById("blind_on_hit").innerHTML = enemyBlind
	if (c.flee_on_hit > 0) { document.getElementById("flee_on_hit").innerHTML = "Hit Causes Monster to Flee " + Math.min(100,c.flee_on_hit) + "%<br>" } else { document.getElementById("flee_on_hit").innerHTML = "" }
	if (c.discount > 0) { document.getElementById("discount").innerHTML = "Vendor Prices Reduced by " + c.discount + "%<br>" } else { document.getElementById("discount").innerHTML = "" }
	
	if (c.itd > 0) { document.getElementById("itd").innerHTML = "Ignore Target Defense<br>" } else { document.getElementById("itd").innerHTML = "" }
	if (c.pmh > 0) { document.getElementById("pmh").innerHTML = "Prevent Monster Heal<br>" } else { document.getElementById("pmh").innerHTML = "" }
	if (c.cbf > 0) { document.getElementById("cbf").innerHTML = "Cannot Be Frozen<br>" }
	else if (c.half_freeze_duration > 0) { document.getElementById("cbf").innerHTML = "Half Freeze Duration<br>" }
	else { document.getElementById("cbf").innerHTML = "" }
	if (c.knockback > 0) { document.getElementById("knockback").innerHTML = "Knockback<br>" } else { document.getElementById("knockback").innerHTML = "" }
	if (c.melee_splash > 0) { document.getElementById("melee_splash").innerHTML = "Melee Attacks deal Splash Damage<br>" } else { document.getElementById("melee_splash").innerHTML = "" }
	if (c.slows_target > 0 || c.slow_enemies > 0) { document.getElementById("slow_target").innerHTML = "Targets Slowed " + (c.slows_target + c.slow_enemies)+"%<br>" } else { document.getElementById("slow_target").innerHTML = "" }
	if (c.freezes_target > 1) { document.getElementById("freezes_target").innerHTML = "Freezes Target +" + c.freezes_target + "<br>" }
	else if (c.freezes_target > 0) { document.getElementById("freezes_target").innerHTML = "Freezes Target<br>" }
	else { document.getElementById("freezes_target").innerHTML = "" }
	if (c.peace > 0) { document.getElementById("peace").innerHTML = "Slain Monsters Rest in Peace<br>" } else { document.getElementById("peace").innerHTML = "" }
	if (c.glow > 0) { document.getElementById("glow").innerHTML = "Character is Glowing<br>" } else { document.getElementById("glow").innerHTML = "" }
	updateCTC()
	updateChargeSkills()
}

// updateCTC - 
// ---------------------------------
function updateCTC() {
	var stats = "";
	for (group in equipped) {
		if (typeof(equipped[group].ctc) != 'undefined') {
			if (equipped[group].ctc != "") {
				for (let i = 0; i < equipped[group].ctc.length; i++) {
					var stat = equipped[group].ctc[i][0]+"% chance to cast level "+equipped[group].ctc[i][1]+" "+equipped[group].ctc[i][2]+" "+equipped[group].ctc[i][3];
					stats += (stat + "<br>")
				}
			}
		}
	}
	document.getElementById("ctc").innerHTML = stats
}

// updateChargeSkills - 
// ---------------------------------
function updateChargeSkills() {
	var stats = "";
	for (group in equipped) {
		if (typeof(equipped[group].cskill) != 'undefined') {
			if (equipped[group].cskill != "") {
				for (let i = 0; i < equipped[group].cskill.length; i++) {
					var stat = "Level "+equipped[group].cskill[i][0]+" "+equipped[group].cskill[i][1]+" ("+equipped[group].cskill[i][2]+" charges)";
					stats += (stat + "<br>")
				}
			}
		}
	}
	document.getElementById("cskill").innerHTML = stats
}

// updateOther - Updates other interface elements
// ---------------------------------
function updateOther() {
	var c = character;
	if (c.statpoints == 0) {
		document.getElementById("remainingstats").innerHTML = ""
		document.getElementById("hide_statpoints").style.visibility = "visible"
	} else {
		document.getElementById("hide_statpoints").style.visibility = "hidden"
	}
	if (c.skillpoints == 0) {
		document.getElementById("remainingskills").innerHTML = ""
		document.getElementById("hide_skillpoints").style.visibility = "visible"
	} else {
		document.getElementById("hide_skillpoints").style.visibility = "hidden"
	}
	if (c.level == 1 && c.statpoints == 0 && c.quests_completed < 0) {
		document.getElementById("hide_stats").style.visibility = "visible"
	} else {
		document.getElementById("hide_stats").style.visibility = "hidden"
	}
	updateSkillIcons()
	checkRequirements()
	
	// update available sockets - TODO: move this to a more suitable 'update' function
	for (group in socketed) {
		socketed[group].sockets = (~~equipped[group].sockets + ~~corruptsEquipped[group].sockets)
		removeInvalidSockets(group)
	}
}

// calculateSkillAmounts - Updates skill levels
// ---------------------------------
function calculateSkillAmounts() {
	// TODO: move function to character files?
	for (s = 0; s < skills.length; s++) {
		skills[s].extra_levels = 0
		skills[s].extra_levels += character.all_skills
		var display = skills[s].level;
		var skill_id = "skill_" + getId(skills[s].name);
		skills[s].force_levels = character[skill_id]
		var oskill_id = "o"+skill_id;
		if (typeof(character[oskill_id]) != 'undefined') { skills[s].force_levels += character[oskill_id] }
		// TODO: use skills_all to store calculated offskill levels?
		if (character.class_name == "Amazon") {
			skills[s].extra_levels += character.skills_amazon
			if (s < 10) { skills[s].extra_levels += character.skills_javelins
				if (s == 2 || s == 6) { skills[s].extra_levels += character.skills_poison_all }
			} else if (s > 19) { skills[s].extra_levels += character.skills_bows
				if (s == 23 || s == 26 || s == 28) { skills[s].extra_levels += character.skills_fire_all }
				if (s == 20 || s == 24 || s == 29) { skills[s].extra_levels += character.skills_cold_all }
			} else { skills[s].extra_levels += character.skills_passives
			}
		} else if (character.class_name == "Assassin") {
			skills[s].extra_levels += character.skills_assassin
			if (s == 1 || s == 6 || s == 20 || s == 24 || s == 27) { skills[s].extra_levels += character.skills_fire_all }
			if (s < 9) { skills[s].extra_levels += character.skills_martial
				if (s == 3 || s == 8) { skills[s].extra_levels += character.skills_cold_all }
			} else if (s > 19) { skills[s].extra_levels += character.skills_traps
			} else { skills[s].extra_levels += character.skills_shadow
			}
		} else if (character.class_name == "Barbarian") {
			skills[s].extra_levels += character.skills_barbarian
			if (s < 10) { skills[s].extra_levels += character.skills_warcries
			} else if (s > 17) { skills[s].extra_levels += character.skills_combat_barbarian
			} else { skills[s].extra_levels += character.skills_masteries
			}
		} else if (character.class_name == "Druid") {
			skills[s].extra_levels += character.skills_druid
			if (s == 16 || s == 22) { skills[s].extra_levels += character.skills_poison_all }
			if (s == 0 || s == 1 || s == 2 || s == 4 || s == 7 || s == 9 || s == 17) { skills[s].extra_levels += character.skills_fire_all }
			if (s < 11) { skills[s].extra_levels += character.skills_elemental
				if (s == 3 || s == 10) { skills[s].extra_levels += character.skills_cold_all }
			} else if (s > 20) { skills[s].extra_levels += character.skills_summoning_druid
			} else { skills[s].extra_levels += character.skills_shapeshifting
			}
		} else if (character.class_name == "Necromancer") {
			skills[s].extra_levels += character.skills_necromancer
			if (s < 11) { skills[s].extra_levels += character.skills_summoning_necromancer
				if (s == 9 || s == 14) { skills[s].extra_levels += character.skills_fire_all }
			} else if (s > 19) { skills[s].extra_levels += character.skills_curses
			} else { skills[s].extra_levels += character.skills_poisonBone
				if (s == 11 || s == 15 || s == 19) { skills[s].extra_levels += character.skills_poison_all }
			}
		} else if (character.class_name == "Paladin") {
			skills[s].extra_levels += character.skills_paladin
			if (s < 10) { skills[s].extra_levels += character.skills_defensive
			} else if (s > 19) { skills[s].extra_levels += character.skills_combat_paladin
			} else { skills[s].extra_levels += character.skills_offensive
				if (s == 11) { skills[s].extra_levels += character.skills_fire_all }
				if (s == 15) { skills[s].extra_levels += character.skills_cold_all }
			}
		} else if (character.class_name == "Sorceress") {
			skills[s].extra_levels += character.skills_sorceress
			if (s < 11) { skills[s].extra_levels += character.skills_cold
				skills[s].extra_levels += character.skills_cold_all
			} else if (s > 21) { skills[s].extra_levels += character.skills_fire
				skills[s].extra_levels += character.skills_fire_all
			} else { skills[s].extra_levels += character.skills_lightning
			}
		}
		skills[s].extra_levels += skills[s].force_levels
		display += skills[s].extra_levels
		if (skills[s].level > 0 || skills[s].force_levels > 0) {
			document.getElementById("p"+skills[s].key).innerHTML = display
		} else { document.getElementById("p"+skills[s].key).innerHTML = "" }
	}
	calculateSkillPassives(character.class_name)
	var skillChoices = "";
	for (let s = 0; s < skills.length; s++) {
		if (skills[s].level > 0 || skills[s].force_levels > 0) { skillChoices += '<option class="gray">'+skills[s].name+'</option>' }
	}
}

// calculateSkillPassives - Updates passive skills
//	className: name of the character class
// ---------------------------------
function calculateSkillPassives(className) {
	// TODO: Transfer to getBuffData()?
	if (className == "Amazon") {
		if (skills[11].level > 0 || skills[11].force_levels > 0) { character.cstrike_skillup = ~~skills[11].data.values[0][skills[11].level+skills[11].extra_levels]; } else { character.cstrike_skillup = 0 }
		if (skills[15].level > 0 || skills[15].force_levels > 0) { character.ar_skillup = ~~skills[15].data.values[0][skills[15].level+skills[15].extra_levels]; } else { character.ar_skillup = 0 }
		if (skills[19].level > 0 || skills[19].force_levels > 0) { character.pierce_skillup = ~~skills[19].data.values[0][skills[19].level+skills[19].extra_levels]; } else { character.pierce_skillup = 0 }
		//if (skills[13].level > 0 || skills[13].force_levels > 0) { character.dodge_skillup = ~~skills[13].data.values[0][skills[13].level+skills[13].extra_levels]; } else { character.dodge_skillup = 0 }
		//if (skills[14].level > 0 || skills[14].force_levels > 0) { character.avoid_skillup = ~~skills[14].data.values[0][skills[14].level+skills[14].extra_levels]; } else { character.avoid_skillup = 0 }
		//if (skills[16].level > 0 || skills[16].force_levels > 0) { character.evade_skillup = ~~skills[16].data.values[0][skills[16].level+skills[16].extra_levels]; } else { character.evade_skillup = 0 }
	} else if (className == "Assassin") {
		if ((skills[13].level > 0 || skills[13].force_levels > 0) && equipped.weapon.type == "claw" && equipped.offhand.type == "claw") { character.block_skillup = ~~skills[13].data.values[0][skills[13].level+skills[13].extra_levels]; } else { character.block_skillup = 0 }
		if (skills[9].level > 0 || skills[9].force_levels > 0) {
			character.claw_skillup[0] = ~~skills[9].data.values[0][skills[9].level+skills[9].extra_levels];
			character.claw_skillup[1] = ~~skills[9].data.values[1][skills[9].level+skills[9].extra_levels];
			character.claw_skillup[2] = ~~skills[9].data.values[2][skills[9].level+skills[9].extra_levels];
		} else { character.claw_skillup = [0,0,0] }
	} else if (className == "Barbarian") {
		if (skills[10].level > 0 || skills[10].force_levels > 0) {
			character.edged_skillup[0] = ~~skills[10].data.values[0][skills[10].level+skills[10].extra_levels];
			character.edged_skillup[1] = ~~skills[10].data.values[1][skills[10].level+skills[10].extra_levels];
			character.edged_skillup[2] = ~~skills[10].data.values[2][skills[10].level+skills[10].extra_levels];
		} else { character.edged_skillup = [0,0,0] }
		if (skills[11].level > 0 || skills[11].force_levels > 0) {
			character.pole_skillup[0] = ~~skills[11].data.values[0][skills[11].level+skills[11].extra_levels];
			character.pole_skillup[1] = ~~skills[11].data.values[1][skills[11].level+skills[11].extra_levels];
			character.pole_skillup[2] = ~~skills[11].data.values[2][skills[11].level+skills[11].extra_levels];
		} else { character.pole_skillup = [0,0,0] }
		if (skills[12].level > 0 || skills[12].force_levels > 0) {
			character.blunt_skillup[0] = ~~skills[12].data.values[0][skills[12].level+skills[12].extra_levels];
			character.blunt_skillup[1] = ~~skills[12].data.values[1][skills[12].level+skills[12].extra_levels];
			character.blunt_skillup[2] = ~~skills[12].data.values[2][skills[12].level+skills[12].extra_levels];
		} else { character.blunt_skillup = [0,0,0] }
		if (skills[13].level > 0 || skills[13].force_levels > 0) {
			character.thrown_skillup[0] = ~~skills[13].data.values[0][skills[13].level+skills[13].extra_levels];
			character.thrown_skillup[1] = ~~skills[13].data.values[1][skills[13].level+skills[13].extra_levels];
			character.thrown_skillup[2] = ~~skills[13].data.values[2][skills[13].level+skills[13].extra_levels];
		} else { character.thrown_skillup = [0,0,0] }
		if (skills[14].level > 0 || skills[14].force_levels > 0) { character.stamina_skillup = ~~skills[14].data.values[0][skills[14].level+skills[14].extra_levels]; } else { character.stamina_skillup = 0 }
		if (skills[15].level > 0 || skills[15].force_levels > 0) { character.defense_skillup = ~~skills[15].data.values[0][skills[15].level+skills[15].extra_levels]; } else { character.defense_skillup = 0 }
		if (skills[16].level > 0 || skills[16].force_levels > 0) { character.frw_skillup = ~~skills[16].data.values[0][skills[16].level+skills[16].extra_levels]; } else { character.frw_skillup = 0 }
		if (skills[17].level > 0 || skills[17].force_levels > 0) { character.resistance_skillup = ~~skills[17].data.values[0][skills[17].level+skills[17].extra_levels]; } else { character.resistance_skillup = 0 }
	} else if (className == "Sorceress") {
		//if (skills[23].level > 0 || skills[28].level > 0 || skills[23].force_levels > 0 || skills[28].force_levels > 0) { character.ar_skillup = ~~skills[23].data.values[0][skills[23].level+skills[23].extra_levels] + ~~skills[28].data.values[3][skills[28].level+skills[28].extra_levels]; } else { character.ar_skillup = 0; }
		if (skills[23].level > 0 || skills[23].force_levels > 0) { character.ar_skillup = ~~skills[23].data.values[0][skills[23].level+skills[23].extra_levels]; } else { character.ar_skillup = 0; }
		if (skills[23].level > 0 || skills[23].force_levels > 0) { character.mana_regen_skillup = ~~skills[23].data.values[1][skills[23].level+skills[23].extra_levels]; } else { character.mana_regen_skillup = 0; }
		if (skills[10].level > 0 || skills[10].force_levels > 0) {
			character.cPierce_skillup = ~~skills[10].data.values[0][skills[10].level+skills[10].extra_levels];
			character.cDamage_skillup = ~~skills[10].data.values[1][skills[10].level+skills[10].extra_levels];
		} else { character.cPierce_skillup = 0; character.cDamage_skillup = 0; }
		if (skills[20].level > 0 || skills[20].force_levels > 0) {
			character.lPierce_skillup = ~~skills[20].data.values[0][skills[20].level+skills[20].extra_levels];
			character.lDamage_skillup = ~~skills[20].data.values[1][skills[20].level+skills[20].extra_levels];
		} else { character.lPierce_skillup = 0; character.lDamage_skillup = 0; }
		if (skills[30].level > 0 || skills[30].force_levels > 0) {
			character.fPierce_skillup = ~~skills[30].data.values[0][skills[30].level+skills[30].extra_levels];
			character.fDamage_skillup = ~~skills[30].data.values[1][skills[30].level+skills[30].extra_levels];
		} else { character.fPierce_skillup = 0; character.fDamage_skillup = 0; }
	}
}

// checkRequirements - Recolors stats/skills based on unmet item/skill/level requirements
// ---------------------------------
function checkRequirements() {
	var highest_level = 1; var highest_str = 0; var highest_dex = 0;
	for (group in equipped) {
		if (group == "charms") { for (item in equipped[group]) {
			if (equipped[group][item].req_level > highest_level) { highest_level = equipped[group][item].req_level }
			if (equipped[group][item].req_strength > highest_str) { highest_str = equipped[group][item].req_strength }
			if (equipped[group][item].req_dexterity > highest_dex) { highest_dex = equipped[group][item].req_dexterity }
		} }
		if (equipped[group].req_level > highest_level) { highest_level = equipped[group].req_level }
		if (equipped[group].req_strength > highest_str) { highest_str = equipped[group].req_strength }
		if (equipped[group].req_dexterity > highest_dex) { highest_dex = equipped[group].req_dexterity }
	}
	character.req_level = highest_level
	character.req_strength = highest_str
	character.req_dexterity = highest_dex
	if (character.req_level > character.level) {
		document.getElementById("level").style.color = "#ff8080" }
	else { document.getElementById("level").style.color = "white" }
	if (character.req_strength > (character.strength+character.all_attributes+(character.level*character.strength_per_level))) {
		document.getElementById("strength").style.color = "#ff8080" }
	else { document.getElementById("strength").style.color = "white" }
	if (character.req_dexterity > (character.dexterity+character.all_attributes)) {
		document.getElementById("dexterity").style.color = "#ff8080" }
	else { document.getElementById("dexterity").style.color = "white" }
	for (let s = 0; s < skills.length; s++) {
		var req_met = 1;
		if (skills[s].level > Math.max(0,(character.level - skills[s].reqlvl + 1))) { req_met = 0 }
		if (skills[s].force_levels == 0 && skills[s].req.length > 0 && req_met == 1) { for (let r = 0; r < skills[s].req.length; r++) {
			if (skills[skills[s].req[r]].level == 0) { req_met = 0 }
		} }
		if (req_met == 0) {
			document.getElementById("p"+skills[s].key).style.color = "#ff8080"; }	// red
		else if (skills[s].extra_levels > 0) {
			document.getElementById("p"+skills[s].key).style.color = "#8080ff"; }	// blue
		else { document.getElementById("p"+skills[s].key).style.color = "white"; }
		if (skills[s].level > 0 || skills[s].force_levels > 0) {
			document.getElementById("p"+skills[s].key).innerHTML = (skills[s].level + skills[s].extra_levels);
		}
	}
}

// addStat - Raises the selected stat
//	stat: button identifier (string) for corresponding stat
// ---------------------------------
function addStat(event, stat) {
	var points = 1
	if (event.shiftKey) { points = 10 }
	if (event.ctrlKey) { points = 100 }
	if (character.statpoints < points) { points = character.statpoints }
	if (character.statpoints >= points) {
		if (stat == "btn_strength") {		character.strength += points;	character.strength_added += points; }
		else if (stat == "btn_dexterity") {	character.dexterity += points;	character.dexterity_added += points; }
		else if (stat == "btn_vitality") {	character.vitality += points;	character.vitality_added += points; }
		else if (stat == "btn_energy") {	character.energy += points;	character.energy_added += points; }
		character.statpoints -= points
		updateAllEffects()
	}
}

// removeStat - Lowers the selected stat
//	stat: button identifier (string) for corresponding stat
// ---------------------------------
function removeStat(event, stat) {
	var points = 1
	if (event.shiftKey) { points = 10 }
	if (event.ctrlKey) { points = 100 }
	if ((stat == "btn_strength")) {
		if (points > character.strength_added) { points = character.strength_added }
		character.strength -= points
		character.strength_added -= points
	} else if ((stat == "btn_dexterity")) {
		if (points > character.dexterity_added) { points = character.dexterity_added }
		character.dexterity -= points
		character.dexterity_added -= points
	} else if ((stat == "btn_vitality")) {
		if (points > character.vitality_added) { points = character.vitality_added }
		character.vitality -= points
		character.vitality_added -= points
	} else if ((stat == "btn_energy")) {
		if (points > character.energy_added) { points = character.energy_added }
		character.energy -= points
		character.energy_added -= points
	} else { points = 0 }
	character.statpoints += points
	updateAllEffects()
}

// skillUp - Raises the skill level
//	skill: the skill to modify
// ---------------------------------
function skillUp(event, skill) {
	var old_level = skill.level;
	var levels = 1;
	if (event.shiftKey) { levels = 10 }
	if (event.ctrlKey) { levels = 20 }
	if (old_level+levels > MAX) { levels = MAX-old_level }
	if (levels > (99-character.level) + character.skillpoints) { levels = (99-(character.level) + character.skillpoints) }
	if (settings.coupling == 0 && levels > character.skillpoints) { levels = character.skillpoints }
	if (character.level <= 99-levels || character.skillpoints >= levels) {
		skill.level += levels
		if (skill.level > old_level) {
			if (levels <= character.skillpoints) {
				character.skillpoints -= levels
				levels = 0
			} else {
				levels -= character.skillpoints
				character.skillpoints = 0
			}
			if (levels > 0) {
				character.level += levels
				character.statpoints += (5*levels)
				character.life += (character.levelup_life*levels)
				character.stamina += (character.levelup_stamina*levels)
				character.mana += (character.levelup_mana*levels)
			}
		}
	}
//	if (typeof(skill.effect) != 'undefined') { if (skill.effect > 2) {
//		skillHover(skill)
//		modifyEffect(skill)
//	} }
	skillHover(skill)
    if (skill.bindable > 0 && (old_level == 0 || (old_level > 0 && skill.level == 0 && skill.force_levels == 0))) {
	updateSkills()
    }
	updateMercenary()
//	for (let s = 0; s < skills.length; s++) { modifyEffect(skills[s]) }
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateAllEffects()
}

// skillDown - Lowers the skill level
//	skill: the skill to modify
// ---------------------------------
function skillDown(event, skill) {
	var old_level = skill.level
	var levels = 1
	if (event.shiftKey) { levels = 10 }
	if (event.ctrlKey) { levels = 20 }
	if (old_level-levels < 0) { levels = old_level }
	var maxdown = character.level - 1
	var maxstatdown = character.statpoints
	var levels_temp = 0;
	if (character.quests_completed > 0 && character.skillpoints < 12) { levels_temp = 12 - character.skillpoints; maxdown += levels_temp; maxstatdown += (levels_temp*5) }
	if (levels > maxdown) { levels = maxdown }
	if (character.quests_completed < 0 && levels > character.statpoints/5) { levels = Math.floor(character.statpoints/5) }
	if (character.quests_completed > 0 && levels > maxstatdown/5) { levels = Math.floor(maxstatdown/5) }
	if (settings.coupling == 1) {
		if (levels <= maxdown && 5*levels <= maxstatdown) {
			if (character.quests_completed > 0 && character.skillpoints < 12) {
				if (levels_temp > levels) { levels_temp = levels }
				skill.level -= levels_temp
				character.skillpoints += levels_temp
				levels -= levels_temp
			}
			skill.level -= levels
			if (skill.level < old_level) {
				character.level -= levels
				character.statpoints -= 5*levels
				character.life -= (character.levelup_life*levels)
				character.stamina -= (character.levelup_stamina*levels)
				character.mana -= (character.levelup_mana*levels)
			}
		}
	} else {
		skill.level -= levels
		character.skillpoints += levels
	}
	skillHover(skill)
    if (skill.bindable > 0 && (old_level == 0 || (old_level > 0 && skill.level == 0 && skill.force_levels == 0))) {
	updateSkills()
    }
	updateMercenary()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateAllEffects()
}

// skillHover - Shows skill description tooltip on mouse-over
//	skill: the mouse-over'ed skill
// ---------------------------------
function skillHover(skill) {
	document.getElementById("title").innerHTML = skill.name
	document.getElementById("description").innerHTML = skill.description
	document.getElementById("graytext").innerHTML = skill.graytext
	document.getElementById("syn_title").innerHTML = skill.syn_title
	document.getElementById("syn_text").innerHTML = skill.syn_text
	document.getElementById("tooltip").style = skill.style
	var levels = 0;
	var next_display = "";
	var current_display = "";
	var pre_display = "";
	var next_value = 0;
	var current_value = 0;
	for (let i = 0, len = skill.data.values.length; i < len; i++) {
		next_display += skill.text[i]
		if (skill.level == 0 && skill.force_levels == 0) {
			next_value = character.getSkillData(skill, skill.level+1, i)
		} else {
			next_value = character.getSkillData(skill, (skill.level+skill.extra_levels+1), i)
		}
		next_value = round(next_value)
		next_display += next_value
		
		current_display += skill.text[i]
		//if (skill.level+skill.extra_levels <= LIMIT) { levels = skill.level+skill.extra_levels } else { levels = LIMIT }
		levels = skill.level+skill.extra_levels
		current_value = character.getSkillData(skill, levels, i)
		current_value = round(current_value)
		current_display += current_value
		
		if (skill.data.index[0] == (i+1)) {
			if (skill.level > 0) { pre_display += current_display } else { pre_display += next_display }
			current_display = ""
			next_display = ""
		}
	}
	pre_display += skill.data.index[1]
	if (skill.level > 0 || skill.force_levels > 0) {
		if (skill.data.index[0] > 0) { pre_display = "<br>" + pre_display }
		if (skill.level > 0) { pre_display += "<br>" }
		pre_display += "<br>Current Skill Level: " + (levels) + "<br>"
		current_display += skill.text[skill.data.values.length] + "<br>"
		document.getElementById("next_level_text").innerHTML = "<br>Next Level"
	} else {
		document.getElementById("next_level_text").innerHTML = "<br>First Level"
		current_display = ""
		if (skill.data.index[0] > 0) { pre_display = "<br>" + pre_display + "<br>" }
	}
	if (skill.level < MAX && (skill.level+skill.extra_levels < LIMIT)) { next_display += skill.text[skill.data.values.length] } else { next_display = "(maximum level reached)" }
	document.getElementById("next").innerHTML = next_display
	document.getElementById("current").innerHTML = current_display
	document.getElementById("pretext").innerHTML = pre_display
	
	if (skill.level == 0 || (skill.level > 0 && skill.data.index[0] > 0)) {
		document.getElementById("description").innerHTML = skill.description + "<br>"
	}
	calculateSkillAmounts()
	updateStats()
	showBaseLevels(skill)
}

// showBaseLevels - Shows base levels for a skill
//	skill: the skill to use
// ---------------------------------
function showBaseLevels(skill) {
	if ((skill.extra_levels > 0 && skill.level > 0) || skill.force_levels > 0) {
		document.getElementById("p"+skill.key).style.color = "#999999";
		document.getElementById("p"+skill.key).innerHTML = skill.level;
	}
}

// updateSkills - 
// ---------------------------------
function updateSkills() {
	var choices = "";
	var k = 1;
	var oskillList = [];
	var oskillOptions = [];
	for (let o = 0; o < oskills.length; o++) {
		if (character[oskills[o]] > 0) {
			var natClass = oskills_info[oskills[o]].native_class;
			if (character.class_name.toLowerCase() != natClass) {
				var natIndex = oskills_info[oskills[o]].i;
				var addSkill = 0;
				if (natClass != "none") { if (skills_all[natClass][natIndex].bindable > 0) { addSkill = 1 } } else { addSkill = 1 }
				if (addSkill == 1) {
					oskillList[k] = oskills_info[oskills[o]].name
					oskillOptions[k] = "<option class='gray-all'>" + oskills_info[oskills[o]].name + "</option>"
					choices += oskillOptions[k]
					k++
				}
			}
		}
	}
	skillList = oskillList;
	skillOptions = oskillOptions;
	for (let s = 0; s < skills.length; s++) {
		if (skills[s].bindable > 0 && (skills[s].level > 0 || skills[s].force_levels > 0)) {
			skillList[k] = skills[s].name
			skillOptions[k] = "<option class='gray-all'>" + skills[s].name + "</option>"
			choices += skillOptions[k]
			k++
		}
	}
	
	// TODO: make less inefficient, include oskills
	for (let s = 0; s < skills.length; s++) {
		if (skills[s].level == 0 && skills[s].force_levels == 0) {
			if (selectedSkill[0] == skills[s].name) { selectedSkill[0] = " ­ ­ ­ ­ Skill 1" }
			if (selectedSkill[1] == skills[s].name) { selectedSkill[1] = " ­ ­ ­ ­ Skill 2" }
		}
	}

	document.getElementById("dropdown_skill1").innerHTML = "<option class='gray-all' style='color:gray' disabled>" + " ­ ­ ­ ­ Skill 1" + "</option>" + choices
	document.getElementById("dropdown_skill2").innerHTML = "<option class='gray-all' style='color:gray' disabled>" + " ­ ­ ­ ­ Skill 2" + "</option>" + choices
	var selectedIndex = [0,0];
	for (let l = 0; l < skillList.length; l++) {
		if (skillList[l] == selectedSkill[0]) { selectedIndex[0] = l }
		if (skillList[l] == selectedSkill[1]) { selectedIndex[1] = l }
	}
	document.getElementById("dropdown_skill1").selectedIndex = selectedIndex[0]
	document.getElementById("dropdown_skill2").selectedIndex = selectedIndex[1]
	if (selectedSkill[0] == " ­ ­ ­ ­ Skill 1") { document.getElementById("skill1_info").innerHTML = ":"; document.getElementById("ar_skill1").innerHTML = ""; }
	if (selectedSkill[1] == " ­ ­ ­ ­ Skill 2") { document.getElementById("skill2_info").innerHTML = ":"; document.getElementById("ar_skill2").innerHTML = ""; }
}

// checkSkill - 
//	skillName: skill name displayed in dropdown
//	num: 1 or 2 (for skill1 or skill2)
// ---------------------------------
function checkSkill(skillName, num) {
	selectedSkill[num-1] = skillName
	var native_skill = 0;
	for (let s = 0; s < skills.length; s++) {
		if (skillName == skills[s].name) { native_skill = 1 }
	}
	
	var c = character;
	var strTotal = (c.strength + c.all_attributes + (c.level-1)*c.strength_per_level);
	var dexTotal = (c.dexterity + c.all_attributes + (c.level-1)*c.dexterity_per_level);
	var energyTotal = Math.floor((c.energy + c.all_attributes)*(1+c.max_energy/100));
	var weaponType = equipped.weapon.type;
	var weaponType_offhand = "";
	if (offhandType == "weapon") { weaponType_offhand = equipped.offhand.type }
	
	var ar = ((dexTotal - 7) * 5 + c.ar + c.level*c.ar_per_level + c.ar_const) * (1+(c.ar_skillup + c.ar_bonus + c.level*c.ar_bonus_per_level)/100) * (1+c.ar_shrine_bonus/100);
	var wisp = 1+~~Math.round(c.wisp/20,0)/10
	var ele_min = Math.floor(wisp*(c.fDamage_min*(1+(c.fDamage+c.fDamage_skillup)/100) + c.cDamage_min*(1+(c.cDamage+c.cDamage_skillup)/100) + c.lDamage_min*(1+(c.lDamage+c.lDamage_skillup)/100) + (c.pDamage_all+c.pDamage_min)*(1+c.pDamage/100)));
	var ele_max = Math.floor(wisp*((c.fDamage_max+(c.level*c.fDamage_max_per_level))*(1+(c.fDamage+c.fDamage_skillup)/100) + (c.cDamage_max+(c.level*c.cDamage_max_per_level))*(1+(c.cDamage+c.cDamage_skillup)/100) + (c.lDamage_max+(Math.floor(energyTotal/2)*c.lDamage_max_per_2_energy))*(1+(c.lDamage+c.lDamage_skillup)/100) + (c.pDamage_all+c.pDamage_max)*(1+c.pDamage/100)));
	
	var physDamage = [0,0,1];
	if (skillName == "Poison Javelin" || skillName == "Lightning Bolt" || skillName == "Plague Javelin" || skillName == "Lightning Fury" || skillName == "Power Throw" || skillName == "Ethereal Throw") {
		physDamage = getWeaponDamage(strTotal,dexTotal,weaponType,1);
	} else { physDamage = getWeaponDamage(strTotal,dexTotal,weaponType,0); }
	
	var skill = "";
	for (let s = 0; s < skills.length; s++) {
		if (skills[s].name == skillName) { 
			skill = skills[s]
		}
	}
	if (skillName != " ­ ­ ­ ­ Skill 1" && skillName != " ­ ­ ­ ­ Skill 2") {
		if (native_skill == 0) { character_any.updateSelectedSkill(skillName, num, ar, physDamage[0], physDamage[1], physDamage[2], ele_min, ele_max, c.mDamage_min, c.mDamage_max, wisp); }
		else { c.updateSelectedSkill(skill, num, ar, physDamage[0], physDamage[1], physDamage[2], ele_min, ele_max, c.mDamage_min, c.mDamage_max, wisp); }
	} else {
		
	}
	updateSkills()
}	

// round - Rounds and returns a number
//	num: number to round
// return: rounded number (no decimals if above 33 or ending in ".0")
// ---------------------------------
function round(num) {
	// TODO: Always round damage/life numbers
	var temp = num;
	var decimals = (toString(num) + ".");
	if (num >= 33) { temp = Math.round(num) }
	else {
		decimals = decimals.split(".");
		if (decimals[1].length > 1) { temp = num.toFixed(1) }
		else { temp = (Math.round((num + Number.EPSILON) * 10) / 10) }
	}
	return temp;
}

// skillOut - Hides skill tooltip
// ---------------------------------
function skillOut() {
	document.getElementById("tooltip").style.display="none"
	checkRequirements()
}

// itemOut - hides item tooltip for Charm Inventory
// ---------------------------------
function itemOut() { document.getElementById("item_tooltip").style.display="none" }

// itemHover - Shows item tooltip on mouse-over for Charm Inventory
//	id: unique string identifier for item
// ---------------------------------
function itemHover(ev, id) {
	var type = "charm";
	var name = "";
	var index = 0;
	var stats = "";
	var style = "display: block;"
	var transfer = 0;
	for (let i = 1; i < inv.length; i++) { if (inv[i].id == id) { transfer = i } }
	var val = inv[0]["in"][transfer];
	name = val.split('_')[0];
	for (let k = 0; k < socketables.length; k++) { if (socketables[k].name == name) { type = socketables[k].type; index = k; } }
	if (type == "charm") {
		style = "display: block; color: #634db0;"
		if (name == "Annihilus" || name == "Hellfire Torch" || name == "Gheed's Fortune" || name == "Horadric Sigil") { style = "display: block; color: #928068;" }
		if (equipped["charms"][val].size != "small" && equipped["charms"][val].size != "large" && equipped["charms"][val].size != "grand") { style = "display: block; color: #ff8080;" }
		lastCharm = name
	} else {
		if (type == "rune") { style = "display: block; color: orange;" }
		else if (socketables[index].rarity == "unique") { style = "display: block; color: #928068;" }
		else if (socketables[index].rarity == "magic") { style = "display: block; color: #8080ff;" }
		else if (socketables[index].rarity == "rare") { style = "display: block; color: yellow;" }
		else { style = "display: block; color: white;" }
		lastSocketable = name
	}
	var display = name //+ "<br>" + stats
	document.getElementById("item_tooltip").innerHTML = display
	document.getElementById("item_tooltip").style = style
	
	// TODO better system:
	
	// start with cell divs at high z-index
	// on mouseover, use cell info...
	// if cell is not empty
	//	if cell is not main-cell of occupying item			// main-cell: top cell when traversing inv[].in
	//		lower z-index of cell  (pushes the item above, so it can be grabbed while all its other individual cells are surfaced)
	// then, 
	// on mouseout: raise z-level of cell 
	//
	// ...this should fix the bug that prevents charms from being moved into an overlapping space below themselves (or to the right for future items wider than 1 space)
	
}

// itemSelect - Duplicates the selected charm
//	id: unique string identifier for charm
// ---------------------------------
function itemSelect(ev) {
	var dup = 0;
	if (ev.shiftKey) { dup = 1 }
	if (ev.ctrlKey) { dup = 10 }
	if (dup > 0) {
		if (name != "Annihilus" && name != "Hellfire Torch" && name != "Gheed's Fortune") {
			for (let d = 0; d < dup; d++) {
				addCharm(lastCharm)
			}
		}
	}
}

// allowDrop - Handles placement validation for Charm Inventory
//	cell: position of item in 10x4 inventory (1-40)
//	y: height of item (1-3)
// ---------------------------------
function allowDrop(ev, cell, y) {
	if (inv[0].pickup_y + y <= 5) {
		var allow = 1
		if (inv[cell].empty == 0 && inv[0].in[cell] != inv[0].onpickup) { allow = 0 }
		if (inv[0].pickup_y > 1 && inv[cell+10].empty == 0 && inv[0].in[cell+10] != inv[0].onpickup) { allow = 0 }
		if (inv[0].pickup_y > 2 && inv[cell+20].empty == 0 && inv[0].in[cell+20] != inv[0].onpickup) { allow = 0 }
		if (allow == 1) {
			var inEquipment = 0;
			var val = inv[0].onpickup;
			var groups = ["helm", "armor", "weapon", "offhand"];
			for (group in equipped) { if (val == equipped[group].name) { inEquipment = 1 } }
			if (inEquipment == 0) { ev.preventDefault(); }
		}
	}
}

// drag - Handles item dragging for Charm Inventory
// ---------------------------------
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	inv[0].onpickup = ev.target.id
	var height = document.getElementById(inv[0].onpickup).height;
	if (height > 80) { inv[0].pickup_y = 3 }
	else if (height > 50) { inv[0].pickup_y = 2 }
	else { inv[0].pickup_y = 1 }
}

// drop - Handles item dropping for Charm Inventory
//	cell: 1-40 (upper left position of item in 10x4 inventory)
// ---------------------------------
function drop(ev,cell) {
	// TODO: Is any of this similar enough to addCharm() or addSocketable() to be combined?
	ev.preventDefault();
	var val = inv[0].onpickup;
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
	for (s = 1; s <= inv[0].in.length; s++) {
		if (inv[0].in[s] == inv[0].onpickup) { inv[s].empty = 1; inv[0].in[s] = ""; 
			inv[s].y = 1;
			document.getElementById(inv[s].id).style = "position: absolute; width: 29px; height: 29px; z-index: 3;";
		}
	}
	inv[cell].empty = 0
	inv[0].in[cell] = inv[0].onpickup
	if (inv[0].pickup_y > 1) { inv[cell+10].empty = 0; inv[0].in[cell+10] = inv[0].onpickup; inv[cell].y = 2; }
	if (inv[0].pickup_y > 2) { inv[cell+20].empty = 0; inv[0].in[cell+20] = inv[0].onpickup; inv[cell].y = 3; }
	inv[0].onpickup = "none"
	
	// Remove affixes if unsocketed from equipment
	var socketable = 0;
	var name = val.split('_')[0];
	for (let k = 0; k < socketables.length; k++) { if (socketables[k].name == name) { socketable = 1 } }
	if (socketable == 1) {
		var groups = ["helm", "armor", "weapon", "offhand"];
		for (let g = 0; g < groups.length; g++) {
			for (let i = 0; i < socketed[groups[g]].items.length; i++) {
				if (val == socketed[groups[g]].items[i].id) {
					for (affix in socketed[groups[g]].items[i]) { if (affix != "id") {
						character[affix] -= socketed[groups[g]].items[i][affix]
						socketed[groups[g]].totals[affix] -= socketed[groups[g]].items[i][affix]
					} }
					socketed[groups[g]].items[i] = {id:"",name:""}
					socketed[groups[g]].socketsFilled -= 1
				}
			}
		}
		// update
		calculateSkillAmounts()
		updateStats()
		updateSkills()
		if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
		if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
		// updateAllEffects()?
	}
}

// trash - Handles item removal for Charm Inventory
// ---------------------------------
function trash(ev) {
	var val = ev.target.id;
	var name = val.split('_')[0];
	var group = "charms"
//	if (name == "+1 (each) skill") { for (let i = 0; i < skills.length; i++) { if (skills[i].level == 0) { removeEffect(getId(skills[i].name)) } } }	// && skills[i].force_levels <= 1
	for (old_affix in equipped[group][val]) {
		character[old_affix] -= equipped[group][val][old_affix]
		equipped[group][val][old_affix] = unequipped[old_affix]
	}
	for (let s = 1; s <= inv[0].in.length; s++) {
		if (inv[0].in[s] == ev.target.id) {
			inv[s].empty = 1;
			inv[0].in[s] = "";
		}
	}
	ev.target.remove();
	
	// find/remove duplicates
	var dup = 0;
	if (ev.shiftKey) { dup = 9 }
	if (ev.ctrlKey) { dup = 39 }
	if (dup > 0) {
		for (let d = 0; d < inv[0].in.length; d++) {
			if (dup > 0 && name == inv[0].in[d].split('_')[0]) {
				val = inv[0].in[d];
				var size = equipped[group][val].size
				for (old_affix in equipped[group][val]) {
					character[old_affix] -= equipped[group][val][old_affix]
					equipped[group][val][old_affix] = unequipped[old_affix]
				}
				inv[0].in[d] = "";
				inv[d].empty = 1;
				if (size == "large" || size == "grand") { inv[d+10].empty = 1; inv[0].in[d+10] = ""; }
				if (size == "grand") { inv[d+20].empty = 1; inv[0].in[d+20] = ""; }
				document.getElementById(val).remove()
				dup--
			}
		}
	}
	calculateSkillAmounts()
	updateStats()
	updateSkills()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateAllEffects()
	document.getElementById("item_tooltip").innerHTML = ""
}

// getItemImage - gets the image filename for the specified item
//	group: item's group
//	base_name: item base (use "" if none)
//	source: specified file name, if it has one (use "" if none)
// return: filename of item's image
// ---------------------------------
function getItemImage(group, base_name, source) {
	var prefix = "./images/items/"
	var filename = source
	var base = getBaseId(base_name);
	if (base_name != "") {
		if (base_name == "Bolts") { prefix += group + "/" }	// only bolts have explicit bases so far (other quivers are assumed to be arrows) ...but importantly, neither are included in bases[]
		else {
			prefix += (bases[base].group + "/")
			if (bases[base].group == "weapon") {
				var type = equipped[group].type;
				if (type == "hammer" || type == "club") { type = "mace" }
				prefix += (type + "/")
			}
		}
		if (source != "") {
			prefix += "special/"
		} else {
			if (base_name == "Tiara" || base_name == "Diadem" || base_name == "Bolts") {
				filename = base_name
			} else {
				if (typeof(bases[base].downgrade) != 'undefined') {
					filename = bases[base].downgrade
					base = getBaseId(bases[base].downgrade)
					if (typeof(bases[base].downgrade) != 'undefined') {
						filename = bases[base].downgrade
					}
				} else {
					filename = base_name
				}
			}
		}
	} else {
		// quest weapons, unique quiver/jewelry
		if (source != "") {
			if (group == "weapon" || (group == "offhand" && offhandType == "weapon")) {
				var type = equipped[group].type;
				if (type == "hammer" || type == "club") { type = "mace" }
				prefix += ("weapon/" + type + "/special/")
			} else {
				prefix += (group + "/")
				prefix += "special/"
			}
		// jewelry, quivers (arrows)
		} else {
			if (group == "amulet" || group == "ring1" || group == "ring2") {
				if (group == "amulet") { prefix += "amulet/"; filename = "Amulet_" + Math.ceil(Math.random() * 3); }
				else { prefix += "ring/"; filename = "Ring_" + Math.ceil(Math.random() * 5); }
			} else if (group == "offhand") {
				prefix += "offhand/"; filename = "Arrows";
			}
		}
	}
	filename = prefix + filename.split(" ").join("_") + ".png"
	return filename
}

// socketableSelect - Duplicates the selected socketable item (gem, rune, jewel)
// ---------------------------------
function socketableSelect(ev) {
	var dup = 0;
	if (ev.shiftKey) { dup = 1 }
	if (ev.ctrlKey) { dup = 10 }
	if (dup > 0) { for (let d = 0; d < dup; d++) { addSocketable(lastSocketable) } }
}

// equipmentHover - shows equipment info on mouse-over
//	group: equipment group name
// ---------------------------------
function equipmentHover(group) {
	// TODO: Turn into actual hover-text, instead of using a premade empty area
	var selected = equipped[group].name;
	if (selected != "none" && equipped[group].rarity == "rw") {
		selected = selected.split(" ­ ­ - ­ ­ ")[0]+ " ­ ­ - ­ ­ " + equipped[group].base
	}
	if (selected != "none" && (group == "helm" || group == "armor" || group == "weapon" || (group == "offhand" && equipped[group].type != "quiver"))) {
		var sockets = ~~corruptsEquipped[group].sockets + ~~equipped[group].sockets;
		var base = "";
		if (typeof(equipped[group].base) != 'undefined') { base = getBaseId(equipped[group].base) }
		if (base == "") { sockets = Math.min(sockets,equipped[group].max_sockets) }
		else { sockets = Math.min(sockets,bases[base].max_sockets) }
		if (socketed[group].sockets > 0 || equipped[group].sockets > 0) { selected += " ["+sockets+"]" }
	}
	if (selected != "none") {
		if (corruptsEquipped[group].name != "none" && corruptsEquipped[group].name != "+ Sockets") { selected += (" "+corruptsEquipped[group].name) }
		document.getElementById("item_tooltip").innerHTML = selected
	} else {
		document.getElementById("item_tooltip").innerHTML = ""
	}
	
	var textColor = "white";
	if (equipped[group].rarity == "set") { textColor = "#00f000" }
	else if (equipped[group].rarity == "magic") { textColor = "#8080ff" }
	else if (equipped[group].rarity == "rare") { textColor = "yellow" }
	else if (equipped[group].rarity == "craft") { textColor = "orange" }
	else if (equipped[group].rarity == "rw") { textColor = "#b2a992" }
	else if (equipped[group].rarity != "common") { textColor = "#928068" }
	document.getElementById("item_tooltip").style.color = textColor
	document.getElementById("item_tooltip").visibility = "visible"
	document.getElementById("item_tooltip").style.display = "block"
}

// equipmentOut - stops showing equipment info (mouse-over ends)
// ---------------------------------
function equipmentOut() {
	document.getElementById("item_tooltip").innerHTML = ""
	document.getElementById("item_tooltip").visibility = "hidden"
	document.getElementById("item_tooltip").style.display = "none"
}

// socket - Adds a socketable item (jewel, rune, gem) to equipment
//	group: equipment group name
// ---------------------------------
function socket(event, group) {
	event.preventDefault();
	var data = event.dataTransfer.getData("text");
	// switches to the correct target if the item image is in the way
	if (event.target.id != group) { document.getElementById(group).appendChild(document.getElementById(data)); }
	else { event.target.appendChild(document.getElementById(data)); }
	
	// equipment destination
	var spaceFound = 0;
	var index = 0;
	for (let i = 0; i < socketed[group].items.length; i++) { if (socketed[group].items[i].name == "") { spaceFound = 1; index = i; } }
	if (spaceFound == 1) {
		var name = inv[0].onpickup.split('_')[0];
		// Remove previous affixes, if being moved from another equipment item
		var groups = ["helm", "armor", "weapon", "offhand"];
		for (let g = 0; g < groups.length; g++) {
			for (let i = 0; i < socketed[groups[g]].items.length; i++) {
				if (inv[0].onpickup == socketed[groups[g]].items[i].id) {
					for (affix in socketed[groups[g]].items[i]) { if (affix != "id") {
						character[affix] -= socketed[groups[g]].items[i][affix]
						socketed[groups[g]].totals[affix] -= socketed[groups[g]].items[i][affix]
					} }
					socketed[groups[g]].items[i] = {id:"",name:""}
					socketed[groups[g]].socketsFilled -= 1
				}
			}
		}
		// Add affixes
		for (let k = 0; k < socketables.length; k++) { if (socketables[k].name == name) {
			socketed[group].items[index].id = inv[0].onpickup
			for (affix in socketables[k]) {
				if (affix != "type" && affix != "rarity" && affix != "img") {
					var affix_dest = affix;
					if (affix == "e_damage") { if (group == "weapon" || (group == "offhand" && offhandType == "weapon")) { /*don't change*/ } else { affix_dest = "damage_bonus" } }
					if (typeof(socketed[group].totals[affix_dest]) == 'undefined') { socketed[group].totals[affix_dest] = 0 }
					socketed[group].items[index][affix_dest] = socketables[k][affix]
					character[affix_dest] += socketables[k][affix]
					socketed[group].totals[affix_dest] += socketables[k][affix]
				}
				if (affix == group || (affix == "armor" && group == "helm") || (affix == "armor" && group == "offhand" && typeof(socketables[k]["shield"]) == 'undefined' && offhandType != "weapon") || (affix == "shield" && group == "offhand" && offhandType != "weapon") || (affix == "weapon" && group == "offhand" && offhandType == "weapon")) {
					for (groupAffix in socketables[k][affix]) {
						socketed[group].items[index][groupAffix] = socketables[k][affix][groupAffix]
						character[groupAffix] += socketables[k][affix][groupAffix]
						if (typeof(socketed[group].totals[groupAffix]) == 'undefined') { socketed[group].totals[groupAffix] = 0 }
						socketed[group].totals[groupAffix] += socketables[k][affix][groupAffix]
					}
				}
			}
		} }
		socketed[group].socketsFilled += 1
		calculateSkillAmounts()
		updateStats()
		updateSkills()
		if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
		if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
		// updateAllEffects()?
	}
	// inventory destination
	for (s = 1; s <= inv[0].in.length; s++) {
		if (inv[0].in[s] == inv[0].onpickup) { inv[s].empty = 1; inv[0].in[s] = ""; 
			inv[s].y = 1;
			document.getElementById(inv[s].id).style = "position: absolute; width: 29px; height: 29px; z-index: 3;";
		}
	}
	inv[0].onpickup = "none"
}

// allowSocket - Checks on mouse-over whether a socketable item may be added
//	group: equipment group being mouse-over'd
// ---------------------------------
function allowSocket(event, group) {
	socketed[group].sockets = ~~equipped[group].sockets + ~~corruptsEquipped[group].sockets
	var allow = 0;
	if (socketed[group].sockets > 0 && socketed[group].socketsFilled < socketed[group].sockets) {
		var name = inv[0].onpickup.split('_')[0];
		for (let k = 0; k < socketables.length; k++) {
			if (socketables[k].name == name) { if (socketed[group].socketsFilled < socketed[group].sockets) { allow = 1 } }
		}
	}
	if (allow == 1) {
		var spaceAvailable = 0;
		for (let i = 0; i < socketed[group].items.length; i++) {
			if (socketed[group].items[i].name == "") { spaceAvailable = 1; }
		}
		if (spaceAvailable == 1) { event.preventDefault(); }
	}
}

// dragSocketable - Handles item dragging for socketables (gems, runes, jewels)
// ---------------------------------
function dragSocketable(ev) {
//	ev.dataTransfer.setData("text", ev.target.id);
//	inv[0].onpickup = ev.target.id
//	inv[0].pickup_y = 1
	drag(ev)
}

// trashSocketable - Handles item removal for socketables (gems, runes, jewels)
// ---------------------------------
function trashSocketable(event) {
	var val = event.target.id;
	var nameVal = val.split('_')[0];
	// removed from equipment
	var groups = ["helm", "armor", "weapon", "offhand"];
	for (let g = 0; g < groups.length; g++) {
		for (let i = 0; i < socketed[groups[g]].items.length; i++) {
			if (val == socketed[groups[g]].items[i].id) {
				for (affix in socketed[groups[g]].items[i]) {
					if (affix != "id" && affix != "name") {
						character[affix] -= socketed[groups[g]].items[i][affix]
						socketed[groups[g]].totals[affix] -= socketed[groups[g]].items[i][affix]
					}
				}
				socketed[groups[g]].items[i] = {id:"",name:""}
				socketed[groups[g]].socketsFilled -= 1
			}
		}
	}
	// removed from inventory
	for (s = 1; s <= inv[0].in.length; s++) {
		if (inv[0].in[s] == event.target.id) {
			inv[s].empty = 1;
			inv[0].in[s] = "";
		}
	}
	
	event.target.remove();
	
	// find/remove duplicates
	var dup = 0;
	if (event.shiftKey) { dup = 9 }
	if (event.ctrlKey) { dup = 39 }
	if (dup > 0) {
		for (let d = 0; d < inv[0].in.length; d++) {
			if (dup > 0 && nameVal == inv[0].in[d].split('_')[0]) {
				val = inv[0].in[d];
				inv[0].in[d] = "";
				inv[d].empty = 1;
				document.getElementById(val).remove()
				dup--
			}
		}
	}
	
	// update
	calculateSkillAmounts()
	updateStats()
	updateSkills()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	// updateAllEffects()?
	document.getElementById("item_tooltip").innerHTML = ""
}

// removeInvalidSockets - Handles indirect removal/validation of socketables
//	group: the item group which is socketed
// ---------------------------------
function removeInvalidSockets(group) {
//	if (socketed[group].socketsFilled > socketed[group].sockets) {
		var invalidSockets = Math.max(0, socketed[group].socketsFilled - socketed[group].sockets)
		if (socketed[group].sockets == 0) { invalidSockets = 6 }
		for (let i = socketed[group].items.length-1; i >= 0; i--) {
			if (socketed[group].items[i].name != "" && invalidSockets > 0) {
				for (affix in socketed[group].items[i]) { if (affix != "id") { character[affix] -= socketed[group].items[i][affix] } }
				document.getElementById(socketed[group].items[i].id).remove();
				socketed[group].socketsFilled -= 1
				socketed[group].items[i] = {id:"",name:""}
				invalidSockets -= 1
			}
		}
//	}
}

// inventoryLeftClick - 
//	group: equipment group name
// ---------------------------------
function inventoryLeftClick(event, group) {
	var mod = 0;
	if (event.shiftKey) { mod = 1 }
	if (event.ctrlKey) { mod = 2 }
	if (mod > 0) {
		// TODO: Limit to unique/rare/craft/rw (i.e. not sets)
		if (typeof(equipped[group].base) != 'undefined') { changeBase(group, "upgrade") }
	} else {
		// TODO: simulate click() on appropriate equipment dropdown menu?
	}
}

// inventoryRightClick - 
//	group: equipment group name
// ---------------------------------
function inventoryRightClick(event, group) {
	var mod = 0;
	if (event.shiftKey) { mod = 1 }
	if (event.ctrlKey) { mod = 2 }
	if (mod > 0) {
		// TODO: Limit to unique/rare/craft/rw (i.e. not sets)
		if (typeof(equipped[group].base) != 'undefined') { changeBase(group, "downgrade") }
	} else {
		equip(group, group)	// right click = unequip
	}
}

// changeBase - Modifies the base for an equipped item (upgrading)
//	group: equipment group to modify
//	change: what kind of change to make ("upgrade" or "downgrade")
// ---------------------------------
function changeBase(group, change) {
	// TODO: Upgraded items should get +5 to req_level
	// TODO: required level depends on affixes, not just base level
	// TODO: Prevent items from being downgraded below their baseline
	// TODO: Add special cases for quest items?
	var base_name = equipped[group].base;
	var base = getBaseId(base_name);
	if (typeof(bases[base][change]) != 'undefined') {
		base = bases[base][change];
		equipped[group].base = base;
		base = getBaseId(base)
		// TODO: Reduce duplicated code - very similar to equip()
		for (affix in bases[base]) { if (affix != "group" && affix != "type" && affix != "upgrade" && affix != "downgrade" && affix != "subtype" && affix != "only") {
			var multEth = 1;
			var multED = 1;
			var multReq = 1;
			var reqEth = 0;
			if (typeof(equipped[group]["ethereal"]) != 'undefined') { if (equipped[group]["ethereal"] == 1) { multEth = 1.5; reqEth = 10; } }
			if (affix == "base_defense") { if (typeof(equipped[group]["e_def"]) != 'undefined') { multED += (equipped[group]["e_def"]/100) } }
			else if (affix == "req_strength" || affix == "req_dexterity") { if (typeof(equipped[group]["req"]) != 'undefined') { multReq += (equipped[group]["req"]/100) } }

			if (affix == "base_damage_min" || affix == "base_damage_max" || affix == "throw_min" || affix == "throw_max" || affix == "base_min_alternate" || affix == "base_max_alternate" || affix == "base_defense") {
				character[affix] -= equipped[group][affix]
				equipped[group][affix] = Math.ceil(multEth*multED*bases[base][affix])
				character[affix] += equipped[group][affix]
			}
			else if (affix == "req_strength" || affix == "req_dexterity") {
				equipped[group][affix] = Math.ceil(multReq*bases[base][affix] - reqEth)
			}
			else {
				character[affix] -= equipped[group][affix]
				equipped[group][affix] = bases[base][affix]
				character[affix] += bases[base][affix]
			}
		} }
	}
	if (corruptsEquipped[group].name == "+ Sockets") { adjustCorruptionSockets(group) }
	equipmentOut()
	equipmentHover(group)
	// update
	calculateSkillAmounts()
	updateStats()
	updateSkills()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	// updateAllEffects()?
}

// hoverFCR - 
// ---------------------------------
function hoverFCR() {
	//document.getElementById("fcr").innerHTML = "testing"//character.fcr + Math.floor(character.level*character.fcr_per_level)
}

// getId - gets the ID for the given name
//	name: the name to be changed
// return: the ID for name (name with spaces replaced with underscores)
// ---------------------------------
function getId(name) {
	return name.split(' ').join('_');
}

// getBaseId - gets the base ID for the given base
//	base_name: the item's base name
// return: the base ID (base with spaces, hyphens, and apostrophes removed)
// ---------------------------------
function getBaseId(base_name) {
	return base_name.split(" ").join("_").split("-").join("_").split("s'").join("s").split("'s").join("s");
}
