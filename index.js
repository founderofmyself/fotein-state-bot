const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const fs = require("fs");
require("dotenv").config();


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


client.commands = new Collection();


// Load Commands
const commandFiles = fs.readdirSync("./commands")
.filter(file => file.endsWith(".js"));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(
        command.data.name,
        command
    );
}


// Load Events
const eventFiles = fs.readdirSync("./events")
.filter(file => file.endsWith(".js"));


for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    client.once(
        event.name,
        (...args) => event.execute(...args)
    );
}


// Slash command handler
client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;


    const command = client.commands.get(
        interaction.commandName
    );


    if (!command) return;


    await command.execute(interaction);

});


client.login(process.env.TOKEN);
