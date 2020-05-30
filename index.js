require('dotenv').config();
const Discord = require('discord.js');
const moves = require('./moves.js');
const functions = require('./functions.js');
const storage = require('./redis.js')
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)

//bot responds to being logged in
client.on('ready', () => {
    console.log('Logged in as Monster of the Week Bot!');
})

//stores characters locally
let userData = {};

//main program, divided into prefixes ! and ?
client.on('message', async message => {
    if (message.author.bot) return;

//establish universal variables regarding message
    const userId = message.member.id;
    const channelId = message.channel.id;
    const userNickname = message.member.nickname;
    const userMessage = functions.removePrefix(message.content);

//load userData from redis
    userData = await storage.get(channelId);
    if(message.content.startsWith('!')){
        if(!userData[userId]){userMessage[0] = 'newcharacter'}
        for (i in moves) {
            if (moves[i]['key'].includes(userMessage[0])){
                message.channel.send(moves[i].method(userMessage, userId, channelId, userNickname, moves, userData, i))
			};
		};
    }
    else if (message.content.startsWith('?')){
        if(!userMessage[0]){userMessage[0] = 'empty'}
		for (i in moves) {
            if (moves[i]['key'].includes(userMessage[0])){
                message.channel.send(moves[i]['text']);
			};
		};
    }
    storage.set(channelId, userData);
})