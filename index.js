const {
    Client,
    GatewayIntentBits,
    Collection,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
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

// Stores votes for each session message
const sessionVotes = new Map();

// Load Commands
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Load Events
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    client.once(event.name, (...args) => event.execute(...args));
}

// Interaction Handler
client.on("interactionCreate", async interaction => {

    // Slash Commands
    if (interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(err);

            if (!interaction.replied) {
                await interaction.reply({
                    content: "❌ An error occurred while running this command.",
                    ephemeral: true
                });
            }
        }

        return;
    }

    // Vote Button
    if (interaction.isButton()) {

        if (interaction.customId !== "session_vote") return;

        const messageId = interaction.message.id;

        if (!sessionVotes.has(messageId)) {
            sessionVotes.set(messageId, new Set());
        }

        const voters = sessionVotes.get(messageId);

        if (voters.has(interaction.user.id)) {
            return interaction.reply({
                content: "❌ You have already voted!",
                ephemeral: true
            });
        }

        voters.add(interaction.user.id);

        const voteCount = voters.size;

        const button = new ButtonBuilder()
            .setCustomId("session_vote")
            .setLabel(`🗳️ Vote (${voteCount})`)
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.update({
            components: [row]
        });

        if (voteCount === 2) {
            await interaction.followUp({
                content: "🎉 **2 votes have been reached! The session can now begin!**"
            });
        }
    }

});

client.login(process.env.TOKEN);
