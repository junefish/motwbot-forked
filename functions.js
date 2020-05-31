const storage = require('./redis.js')
module.exports = {removePrefix, xdyRoll, roll, newCharacter, characterSheet, setStats, shift, moveRoll}

//functions
function removePrefix(message){
	let prefixed = message.toLowerCase().split(" ");
	if (prefixed[0] === ('!' || '?')) {
		prefixed.shift();
	} else if (prefixed[0] !== ('!' || '?')) {
		prefixed[0] = prefixed[0].slice(1);
	}; 
	return prefixed;
};

function xdyRoll(userMessage, userId, channelId, userNickname, moves, userData){
    let die = userMessage[1];
    let showStat = ''
    let modStat = 0
    if (!die) {return moves.roll.error};
    let xdy = die.split('d');
    let num = parseInt(xdy[0]);
        if (isNaN(num)){return moves.roll.error};
    let faces = parseInt(xdy[1]);
        if (isNaN(faces)){return moves.roll.error};
    const dieRoll = roll(num, faces);
    let total = parseInt(dieRoll[0]);
    let result = dieRoll[1];
    let addOn = 0
    if(userMessage[2] || userMessage[3]){
        function hasNumber(string) {return /\d/.test(string)}
                let statOne = hasNumber(userMessage[2]);
                let statTwo = hasNumber(userMessage[3]);
        for(let [key, value] of Object.entries(moves.abilities.stats)){
            userMessage.forEach(i => {
                if(i.startsWith(value[0]) || i.startsWith(`+${value[0]}`)){
                    modStat = parseInt(userData[userId][key])
                    showStat = ` ${key}`
                }
            })    
        }
        if(statOne){
            addOn = parseInt(userMessage[2]);
            if(addOn>=0){addOnPrint = `+${addOn}`}
            else{addOnPrint = addOn}
            result.push(` (${addOnPrint})`)
        } else if(statTwo){
            addOn = parseInt(userMessage[3]);
            if(addOn>=0){addOnPrint = `+${addOn}`}
            else{addOnPrint = addOn}
            result.push(` (${addOnPrint})`)
        }
    }
    total = total + addOn;
    let grandTotal = total + modStat;
        if (!modStat){
            return (`You rolled [${result} ] = ${total}.`)}
        else if (modStat >= 0){
            return (`You rolled [${result} ] = ${total} + ${modStat}${showStat}. That's ${grandTotal}.`)}
        else if (modStat < 0) {
        modStat = Math.abs(modStat);
            return (`You rolled [${result} ] = ${total} - ${modStat}${showStat}. That's ${grandTotal}.`)}
}

function roll(num, faces){
    let total = 0;
    let result = [];
        for(let i = 0; i < num; i++){
    let singleRoll = Math.floor(Math.random() * faces) + 1;
    result.push(' ' + singleRoll);
    total += singleRoll;
    }
    return [total, result];
}

function moveRoll(userMessage, userId, channelId, userNickname, moves, userData, i){
    let modStat = 0
    let rollText = ''
    let moveText = ''
    let showStat = ''
    let input = userMessage[1];
    input = parseInt(input);
    if(moves[i].stat === 'num'){
        if(!input){input = 0}
        modStat = input
    } else if(moves[i].stat === 'stat'){
        if(!userMessage[1]){return 'You need to add a +STAT to your command'}
        modStat = userData[userId][userMessage[1].slice(1).toUpperCase()]
    } else {
        modStat = userData[userId][moves[i].stat.toUpperCase()];
        showStat = ` ${moves[i].stat.toUpperCase()}`
    }
    if(!modStat){modStat = 0};
    let moveRoll = roll(2, 6);
    let total = moveRoll[0];
    let result = moveRoll[1];
    let addOn = 0
    if(userMessage[1] || userMessage[2]){
        function hasNumber(string) {return /\d/.test(string)}
                let statOne = hasNumber(userMessage[1]);
                let statTwo = hasNumber(userMessage[2]);
        for(let [key, value] of Object.entries(moves.abilities.stats)){
            userMessage.forEach(i => {
                if(i.startsWith(value[0]) || i.startsWith(`+${value[0]}`)){
                    modStat = parseInt(userData[userId][key])
                    showStat = ` ${key}`
                }
            })    
        }
        if(statOne){
            addOn = parseInt(userMessage[1]);
            if(addOn>=0){addOnPrint = `+${addOn}`}
            else{addOnPrint = addOn}
            result.push(` (${addOnPrint})`)
        } else if(statTwo){
            addOn = parseInt(userMessage[2]);
            if(addOn>=0){addOnPrint = `+${addOn}`}
            else{addOnPrint = addOn}
            result.push(` (${addOnPrint})`)
        }
    }
    total = total + addOn;
    let grandTotal = total + modStat;
    if (grandTotal >= 13){
        moveText = moves[i].greatSuccess
    } else if (grandTotal >= 10 && grandTotal <= 12){
		moveText = moves[i].success
	} else if (9 >= grandTotal && grandTotal >= 7){
        moveText = moves[i].mixed
    } else if (6 >= grandTotal ){
        moveText =  moves[i].fail
    }
    if (modStat >= 0){
			rollText = `You rolled [${result} ] = ${total} + ${modStat}${showStat}. That’s ${grandTotal}.`}
	else if (modStat < 0) {
			modStat = Math.abs(modStat);
			rollText = `You rolled [${result} ] = ${total} - ${modStat}${showStat}. That’s ${grandTotal}.`}
    return `${rollText}\n${moveText}`
}

function newCharacter(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userData.characterCount){userData.characterCount = 0}
    userData.characterCount++
    console.log(userData.characterCount)
    userData[userId] = {}
    let person = {};
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        person[key] = value[1]
    }
    userData[userId] = person;
    storage.set(channelId, userData);
    return 'CREATED A BLANK CHARACTER: Type !character to view,\
 or ?set to learn how to set your character stat. You must have\
 a character set up before you use moves.'
}

function characterSheet(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userData[userId]){newCharacter(userMessage, userId, channelId, userNickname, moves, userData)};
    statPrintout = ['Here are your CHARACTER STATS:'];
    for(let [key, value] of Object.entries(userData[userId])){
        statPrintout.push(`${key}: ${value}`)
    }
    return statPrintout
}

function shift(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userData[userId]){newCharacter(userMessage, userId, channelId, userNickname, moves, userData)};
    let shiftPrintout = ['CHANGES:'];
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(i.startsWith(value[0])){
                i = i.slice(value[0].length)
                function hasNumber(string) {return /\d/.test(string)}
                let stat = hasNumber(i)
                if(stat){
                    i = parseInt(i)
                    let slashVal = userData[userId][key]
                    if(value[0]==='name'){
                        shiftPrintout.push(moves.shift.error); return
                    } else if(value[0]==='harm'){
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                            if(slashVal < 4){
                                userData[userId][key] = `${slashVal} / 7`
                            } else if(slashVal > 3 && slashVal < 7){
                                userData[userId][key] = `${slashVal} / 7 UNSTABLE!`
                            } else if(slashVal > 6){
                                userData[userId][key] = `${slashVal} / 7 DYING!`
                            }
                            shiftPrintout.push(`${key}: ${userData[userId][key]}`)
                    } else if(value[0]==='luck'){
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                            if(slashVal < 7){
                                userData[userId][key] = `${slashVal} / 7`
                            } else if(slashVal > 6){
                                userData[userId][key] = `${slashVal} / 7 DOOMED!`
                            }
                            shiftPrintout.push(`${key}: ${userData[userId][key]}`)
                    } else if(value[0]==='exp'){
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                            if(slashVal < 5){
                                userData[userId][key] = `${slashVal} / 5`
                            } else if(slashVal > 4){
                                userData[userId][key] = `${slashVal} / 5 LVL UP!`
                            }
                            shiftPrintout.push(`${key}: ${userData[userId][key]}`)
                    } else{
                        userData[userId][key] = slashVal + i;
                        shiftPrintout.push(`${key}: ${userData[userId][key]}`)
                          }    
                }
            }
        })
    }
    if(!shiftPrintout[1]){shiftPrintout = moves.shift.error}
    return shiftPrintout
}

function setStats(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userData[userId]){newCharacter(userMessage, userId, channelId, userNickname, moves, userData)};
    let setErrors = []
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(i.startsWith(value[0])){
                if(value[0]==="name"){
                    i = i.slice(value[0].length)
                    i = i.slice(1).toUpperCase()
                    if(i==='NICKNAME'){i = userNickname};
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else if (value[0]==="harm"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(i<0){i=0}
                        if(i < 4){i = `${i} / 7`}
                        else if(i > 3 && i < 7){i = `${i} / 7 UNSTABLE!`}
                        else if (i > 6){i = `${i} / 7 DYING!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else if (value[0]==="luck"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(i<0){i=0}
                        if(i < 7){i = `${i} / 7`}
                        else if (i > 6){i = `${i} / 7 DOOMED!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else if (value[0]==="exp"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(i<0){i=0}
                        if(i < 5){i = `${i} / 5`}
                        else if (i > 4){i = `${i} / 5 LVL UP!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else {
                    i = i.slice(value[0].length)
                    function hasNumber(string) {return /\d/.test(string)}
                    let stat = hasNumber(i)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(stat){
                        userData[userId][key] = i 
                    } else{setErrors.push(moves.set.error)}
                }
            }
        })
    }
    if(setErrors[0]){return setErrors[0]}
    else{return characterSheet(userMessage, userId, channelId, userNickname, moves, userData)}
}