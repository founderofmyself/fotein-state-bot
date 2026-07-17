const {
    SlashCommandBuilder,
    ChannelType,
    PermissionsBitField
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("session")
        .setDescription("Session management")
        .addSubcommand(sub =>
            sub
                .setName("start")
                .setDescription("Start a session")
                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Select the channel to send the session embed")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        ),

    async execute(interaction) {

        if (interaction.options.getSubcommand() !== "start") return;

        const channel = interaction.options.getChannel("channel");

        const permissions = channel.permissionsFor(interaction.guild.members.me);

        if (
            !permissions.has(PermissionsBitField.Flags.SendMessages) ||
            !permissions.has(PermissionsBitField.Flags.EmbedLinks)
        ) {
            return interaction.reply({
                content:
                    "❌ **The bot cannot send messages in that channel!**\n\nGo to **Channel Settings → Permissions**, select my role, and enable:\n\n• ✅ Send Messages\n• ✅ Embed Links",
                ephemeral: true
            });
        }

        await interaction.reply({
            content: `✅ I can send messages in ${channel}.`,
            ephemeral: true
        });

    }
};
