const botsettings = require("./botsetting.json");
const Discord = require("discord.js");
const prefix = botsettings.prefix
const forever = require("forever");


const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', () => {
    bot.user.setStatus('unavailable')
    bot.user.setPresence({
        game: {
            name: 'to !help.',
            type: "Listening",
            url: "https://www.twitch.tv/superwaltc"
        }
    });
});

bot.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/);

bot.on("message", async message => {
		if(message.author.bot) return;
		if(message.channel.type === "dm") return;
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/);
      

		let messageArray = message.content.split(" ");
		let command = messageArray[0];
		

		if(!command.startsWith(prefix)) return;
  
  if(command == prefix+"serverinvite") {
message.channel.send("The server invite is, https://discord.gg/rMH6PdE. Happy to help. :smiley: ")
}
  
    if(command == prefix+"serverinfo") {
      let embed = new Discord.RichEmbed()
      .setTitle("Server info")
      .addField("Server name", message.guild.name)
      .addField("Server id", message.guild.id)
      .addField("mebercount", message.guild.members.size)
      .addField("created at", message.guild.createdAt)
message.channel.send(embed)
}
  
      //command start 
  if(command === `!warn`){ 
    //checks for mentioned user.
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    //If user is not in server.
    if (!dUser) return message.channel.send("Can't find user!")
    if(!message.member.roles.some(r=>["Bot Testers"].includes(r.name)) ) return message.reply("Please wait to become a bot tester. Thanks.")
    if(!message.member.roles.some(r=>["Warn Permission"].includes(r.name)) ) return message.reply("Please wait to become a high enough rank. Thanks.")
    //getting message.
    let dMessage = args.join(" ").slice(22);
    //error: no message.
    if(dMessage.length < 1) return message.reply('You must supply a message!')
    //sends DM to mentioned user.
    dUser.send(`${dUser} A moderator from Super Notifications warned you because: ${dMessage}`)
    //sends DM to user who ran the command.
    message.author.send(`${message.author} You have successfully warned ${dUser}`)
    //command finish
}
  
 if (command === `${prefix}ping`) {
        const m = await message.channel.send("Pong");
        m.edit(`Fine here you go >.<! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(Discord.Client.ping)}ms`);
    }
  
  if(command === `${prefix}help`) {
      let embed = new Discord.RichEmbed()
      .setTitle("Commands")
      .addField("!help", "shows the help menu.")
      .addField("!ping", "check to see if the bot is responsive.")
      .addField("!userinfo", "Shows userinfo.")
      .setFooter("Bot by SuperWaltC29#2932")
      .addField("!mute", "W.I.P. /Work in progress. Bot Testers only.")
      .addField("!unmute", "W.I.P. /Work in progress. Bot Testers only")
      .addField("!dm", "Used to DM users. HRs ONLY! Bot Tester role required.")
      .addField("!warn", "Used to warn people. MRs+ ONLY! Bot Tester role required.")
      .addField("!serverinfo","shows the server info.")
      .addField("!rank","For roblox. WIP.")
message.channel.send(embed)
}
  
    //command start 
  if(command === `!dm`){ 
    //checks for mentioned user.
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    //If user is not in server.
    if (!dUser) return message.channel.send("Can't find user!")
    //If user is in the server, looks if user has the role. If not, cancell the command.
    if(!message.member.roles.some(r=>["Bot Testers"].includes(r.name)) ) return message.reply("Please wait to become a bot tester. Thanks.")
    if(!message.member.roles.some(r=>["DM Permission"].includes(r.name)) ) return message.reply("Please wait to become a high enough rank. Thanks.")
    //getting message.
    let dMessage = args.join(" ").slice(22);
    //error: no message.
    if(dMessage.length < 1) return message.reply('You must supply a message!')
    //sends DM to mentioned user.
    dUser.send(`${dUser} A moderator from Super Notifications sent you: ${dMessage}`)
    //sends DM to user who ran the command.
    message.author.send(`${message.author} You have sent your message to ${dUser}`)
    //command finish
}

    //command start
		if(command === `${prefix}userinfo`) {
      //checks the command being ran
			let embed = new Discord.RichEmbed()
      //makes a new embed
			.setAuthor(message.author.username)
      //gets the username of the person/user who ran the command
			.setDescription("This is the user's info!")
      //The title
			.setColor("#00FFF7")
      //color of the side
			.addField("Full username", `${message.author.username}#${message.author.discriminator}`)
			//username of the person who ran the command
      .addField("ID", message.author.id)
      //So nobody takes the bot and it is branded.
      .setFooter("Bot by SuperWaltC29#2932")
      //id of the user
			.addField("Created At", message.author.createdAt);
      //when the account was created
      //sends the embed
			message.channel.send(embed);

			return;
      //command finished
		}
  
  
  

  
		if(command === `${prefix}mute`) {
      if(!message.member.roles.some(r=>["Bot Testers"].includes(r.name)) ) return message.reply("Please wait to become a bot tester. Thanks.")
				if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission")


			let toMute = message.guild.member (message.mentions.users.first() || message.guild.members.get(args[0]));
			if(!toMute) return message.channel.sendMessage("You did not specify a user mention or ID");

	 let role = message.guild.roles.find(r => r.name === "SWB Muted")
	 if(!role) {}
	 try{
	   

					message.guild.channels.forEach(async (channel, id) => {
							await channel.overwritePermissions(role, {
						  	 	SEND_MESSAGES: false,
								  ADD_REACTIONS: false
						});
					});
			}	catch(e) {
					console.log(e.stack);
 			}

			if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted!!!");

			await toMute.addRole(role);
			message.channel.send("I have muted them :)");

			return;

		 }
  
  
  
  
	});

bot.login(process.env.TOKEN);
  
});
