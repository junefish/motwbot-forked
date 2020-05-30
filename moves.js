const functions = require('./functions.js');

//text library object
module.exports = moves = {
    menu: {
        key: 'menu',
        text: 'TO LEARN ABOUT EACH MOVE, TYPE THE COMMAND:\n\n\
 - NEWCHARACTER: ?newcharacter\n\
 - CHECK YOUR CHARACTER STATS: ?character\n\
 - SET CHARACTER STATS: ?set\n\
 - SHIFT CHARACTER STATS: ?shift\n\
 - ROLL SOME DICE: ?roll\n\
 - KICK SOME ASS: ?kick\n\
 - ACT UNDER PRESSURE: ?act\n\
 - HELP OUT: ?help\n\
 - INVESTIGATE A MYSTERY: ?investigate\n\
 - MANIPULATE SOMEONE: ?manipulate\n\
 - MANIPULATE HUNTER: ?hunter\n\
 - PROTECT SOMEONE: ?protect\n\
 - READ A BAD SITUATION: ?read\n\
 - USE MAGIC: ?magic\n\
 - BIG MAGIC: ?bigmagic\n\
 - EFFECTS: ?effects\n\
 - GLITCHES: ?glitches',
        method: function(){return this.text}
    },
    abilities: {
        key: 'abilities',
        stats: {
                NAME: ['name', ''],
                CHARM: ['charm', 0],
                COOL: ['cool', 0],
                SHARP: ['sharp', 0],
                TOUGH: ['tough', 0],
                WEIRD: ['weird', 0],
                HARM: ['harm', '0 / 7']
        }
        },
    newCharacter: {
        key: ['new', 'newcharacter'],
        text: 'NEW CHARACTER: !newcharacter\n\
Use this command to create a new blank character or to zero out your character stats.',
        method: functions.newCharacter
    },
    characterSheet: {
        key: ['character', 'charactersheet'],
        text: 'CHARACTER SHEET: !character\n\
Enter this command at any time to check on your character stats.',
        method: functions.characterSheet
    },
    set: {
        key: ['set', 'stats', 'setstats', 'statset'],
        text: 'SET STATS: !set stat+value ...\nTo set your character stats,\
 enter the command followed by all the stats you want to set. Use the \
 stat type +/- stat value. Unentered stats will default to zero or their existing value.\
 Typing name+nickname will enter your Disord Channel nickname.\n\
EXAMPLE: !set name+bambino charm+1 cool-1 ... etc',
        error: 'Incorrect input, use the format: !set name+bambino charm+1 cool-1 etc...',
        method: functions.setStats
    },
    shift: {
        key: 'shift',
        text: 'SHIFT STATS: !shift stat+/-num...\nTo shift your character stats\
 by a certain amount, enter the command followed by the stats you want to shift\
 and the amount to change them.\n\
EXAMPLE: !shift harm+1 will increase your harm by 1',
        error: 'Incorrect input, use the format: !shift tough+1 etc...\
 (this only works for numerical values)',
        method: functions.shift
    },
    roll: {
        key: ['roll'],
        text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = positive\
 or negative modifier, if any.\nEXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sharp (SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = positive or negative modifier, if any.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +charm (SPACES MATTER!)',
        method: functions.xdyRoll
    },
    kickSomeAss: {
        key: ['kick', 'kickass', 'kicksome', 'kicksomeass', 'ass'],
        text: 'KICK SOME ASS: !kick\nWhen you get into a fight and kick some ass.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, you and whatever you\'re fighting inflict harm on each other,\
 plus choose one extra effect:\n\
 - You gain the advantage: take +1 forward, or give +1 forward to another hunter\n\
 - You inflict terrible harm (+1 harm)\n\
 - You suffer less harm (-1 harm)\n\
 - You force them where you want them',
        mixed: 'On a 7–9, you and whatever you\'re fighting inflict harm on each other.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'tough',
        method: functions.moveRoll
    },
    actUnderPressure: {
        key: ['act', 'actunder', 'underpressure', 'actunderpressure', 'pressure'],
        text: 'ACT UNDER PRESSURE: !act\nWhen you act under pressure.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, you do what you set out to do.',
        mixed: 'On a 7–9, the Keeper is going to give you a worse outcome, hard choice,\
 or price to pay.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cool',
        method: functions.moveRoll
    },
    helpOut: {
        key: ['help', 'helpout'],
        text: 'HELP OUT: !help\nWhen you help another hunter.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, your help grants them +1 to their roll.',
        mixed: 'On a 7–9, your help grants them +1 to their roll,\
 but you also expose yourself to trouble or danger.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cool',
        method: functions.moveRoll
    },
    investigateAMystery: {
        key: ['investigate', 'investigateamystery', 'mystery'],
        text: 'INVESTIGATE A MYSTERY: !investigate\nWhen you investigate a mystery.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, hold 2. One hold can be spent to ask the keeper\
 one of the following questions:\n\
 - What happened here?\n\
 - What sort of creature is it?\n\
 - What can it do?\n\
 - What can hurt it?\n\
 - Where did it go?\n\
 - What was it going to do?\n\
 - What is being concealed here?',
        mixed: 'On a 10+, hold 1. One hold can be spent to ask the keeper\
 one of the following questions:\n\
 - What happened here?\n\
 - What sort of creature is it?\n\
 - What can it do?\n\
 - What can hurt it?\n\
 - Where did it go?\n\
 - What was it going to do?\n\
 - What is being concealed here?',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'sharp',
        method: functions.moveRoll
    },
    manipulateSomeone: {
        key: ['manipulate', 'manipulatesomeone'],
        text: 'MANIPULATE SOMEONE: !manipulate\n\
Once you have given them a reason, tell them what you want them to do.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, they’ll do it for the reason you\
 gave them. If you asked too much, they’ll tell you the minimum it would\
 take for them to do it (or if there’s no way they’d do it).',
        mixed: 'On a 7–9, they’ll do it, but only if you do something\
 for them right now to show that you mean it. If you asked too much,\
 they’ll tell you what, if anything, it would take for them to do it.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'charm',
        method: functions.moveRoll
    },
    manipulateHunter: {
        key: ['hunter', 'huntermanipulate'],
        text: 'MANIPULATE HUNTER: !hunter\n\
Once you have given the other hunter a reason, tell them what you want them to do.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, if they do what you ask they mark\
 experience and get +1 forward.',
        mixed: 'On a 7–9, they mark experience if they do what you want.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'charm',
        method: functions.moveRoll
    },
    protectSomeone: {
        key: ['protect', 'protectsomeone'],
        text: 'PROTECT SOMEONE: !protect\n\
When you prevent harm to another character.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, you protect them okay, but\
 you\'ll suffer some or all of the harm they were going to get.\n\
 - You suffer little harm (-1 harm)\n\
 - All impending danger is now focused on you\n\
 - You inflict harm on the enemy\n\
 - You hold the enemy back',
        mixed: 'On a 7-9, you protect them okay, but\
 you\'ll suffer some or all of the harm they were going to get.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'tough',
        method: functions.moveRoll
    },
    readABadSituation: {
        key: ['read', 'readasitch', 'readabadsituation', 'badsituation'],
        text: 'READ A BAD SITUATION: !read\n\
When you look around and read a bad situation.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, hold 3. One hold can be spent\
 to ask the Keeper one of the following questions (if you act on the answers,\
 you get +1 ongoing while the information is relevant):\n\
 - What\'s my best way in?\n\
 - What\'s my best way out?\n\
 - Are there any dangers we haven\'t noticed?\n\
 - What\'s the biggest threat?\n\
 - What\'s most vulnerable to me?\n\
 - What\'s the best way to protect the victims?',
        mixed: 'On a 10+, hold 1. One hold can be spent\
 to ask the Keeper one of the following questions (if you act on the answers,\
 you get +1 ongoing while the information is relevant):\n\
 - What\'s my best way in?\n\
 - What\'s my best way out?\n\
 - Are there any dangers we haven\'t noticed?\n\
 - What\'s the biggest threat?\n\
 - What\'s most vulnerable to me?\n\
 - What\'s the best way to protect the victims?',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'sharp',
        method: functions.moveRoll
    },
    useMagic: {
        key: ['usemagic', 'magic'],
        text: 'USE MAGIC !magic\n\
When you use magic, say what you\'re trying to achieve and how you do the spell.',
        get greatSuccess(){return this.success},
        success: 'On a 10+ the magic works without issue: choose your effect.\n\
 (type ?effects for reference)',
        mixed: 'On a 7–9, it works imperfectly: choose your effect and a glitch.\
 The Keeper will decide what effect the glitch has.\n\
 (type ?effects and/or ?glitches for reference)',
        fail: 'On a 6-, you lose control of the magic. This never ends well...',
        stat: 'weird',
        method: functions.moveRoll
    },
    bigMagic: {
        key: ['big', 'bigmagic'],
        text: 'BIG MAGIC !bigmagic\n\
Use this when you want more than the Use Magic effects. Tell the Keeper what you\
 want to do. They may require:\n\
 - You need to spend a lot of time (days or weeks) researching the magic ritual\n\
 - You need to experiment with the spell - there will be lots of failures before\
 you get it right\n\
 - You need some rare and weird ingredients and supplies\n\
 - The spell will take a long time (hours or days) to cast\n\
 - You need a lot of people (2, 3, 7, 13, or more) to help\n\
 - The spell needs to be cast at a particular place and/or time\n\
 - You need to use magic as part of the ritual, perhaps to summon a monster\
 communicate with something, or bar the portal you opened\n\
 - It will have a specific side-effect or danger.',
        get greatSuccess(){return this.success},
        success: 'On a 10+ the magic works without issue: choose your effect.\n\
 (type ?effects and/or ?bigmagic for reference)',
        mixed: 'On a 7–9, it works imperfectly: choose your effect and a glitch.\
 The Keeper will decide what effect the glitch has.\n\
 (type ?effects and/or ?glitches for reference)',
        fail: 'On a 6-, you lose control of the magic. This never ends well...',
        stat: 'weird',
        method: functions.moveRoll
    },
    effects: {
        key: 'effects',
        text: 'USE MAGIC EFFECTS:\n\
 - Inflict harm (1-harm ignore-armour magic obvious)\n\
 - Enchant a weapon. It gets +1 harm and +magic\n\
 - Do one thing that is beyond human limitations\n\
 - Bar a place or portal to a specific person or a type of creature\n\
 - Trap a specific person, minion, or monster\n\
 - Banish a spirit or curse from the person, object, or place it inhabits\n\
 - Summon a monster into the world\n\
 - Communicate with something that you do not share a language with\n\
 - Observe another place or time\n\
 - Heal 1-harm from an injury, or cure a disease, or neutralize a poison',
        method: function(){return this.text}
   },
   glitches: {
        key: 'glitches',
        text: 'USE MAGIC GLITCHES:\n\
 - The effect is weakened\n\
 - The effect is of short duration\n\
 - You take 1-harm ignore-armour magic\n\
 - The magic draws immediate, unwelcome attention\n\
 - It has a problematic side effect\n\n\
THE KEEPER MAY SAY THAT:\n\
 - The spell requires weird materials\n\
 - The spell will take 10 seconds, 30 seconds, or 1 minute to cast\n\
 - The spell requires ritual chanting and gestures\n\
 - The spell requires you to draw arcane symbols\n\
 - You need one or two people to help cast the spell\n\
 - You need to refer to a tome of magic for the details',
        method: function(){return this.text}
   },
}