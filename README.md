# Monster of the Week Discord Bot

A bot designed to streamline MotW play on a Discord server. The bot allows players to create functional in-chat character sheets to record their stats, and deploys those stats for simple rolls or basic MotW moves. Each of the basic MotW moves is called with a simple command which rolls 2d6, applies the appropriate stat, and returns the level of success along with the related text. Though it is not intended to fully replace traditional character sheets, this bot lets you focus more on your game and less on referencing the text.

### Commands

Once the bot is logged in, `?menu` or `!menu` will take you to the in-chat menu. It lists all bot commands. In general, commands can be looked up with the prefix `?` and used with the prefix `!`

 * `!newcharacter` - Use this command to create a new blank character or to zero out your character stats. Each player must create their own character. Sometimes creating a new blank character sheet will be necessary for updates in the bot to be visible.
 * `!character` - Enter this command at any time to check on your character stats.
 * `!set stat+value` - To set your character stats, enter the command `!set` followed by all the stats you want to set. Use the stat type +/- stat value. Unentered stats will default to zero or their existing value. If you enter `name+nickname` it will enter your Disord Channel nickname.  
 Example: `!set name+bambino tough+1 charm+2 sharp-1 ... etc`
 * `!shift stat+value` - Use this command to change your character stats by a certain amount. This is useful if you want to add to your harm, or when leveling up. The stat will shift up or down by the value amount.  
 Example: `!shift harm+2` will add 2 to your character's harm.
 * `!roll xdy +z` - Use the format !roll xdy +z where x = number of die, y = faces on die, and z = positive or negative modifier, if any. You can also enter the stat name as a modifier and it will use your stat value.  
 EXAMPLE: `!roll 2d6 +1` OR `!roll 2d6 +sharp` OR `!roll 2d6 +charm -1`
 * `!kick`, `!act`, `!help`, `!investigate`, `!manipulate`, `!protect`, `!read`, `!magic`, `!bigmagic` - The basic MotW moves automatically roll a 2d6 and add the relevant stat from your character sheet. If you need to roll the move with an irregular stat, you can add +stat to the move. You can also add a +/-num to the move if necessary.  
 EXAMPLE: `!investigate` OR `!bigmagic +1` OR `!manipulate tough` OR `!protect sharp -1`
 * Anything not programmed as a bot move can be dealt with using a `!roll` command.
