const {
    SlashCommandBuilder,
    ChannelType
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

        await interaction.reply({
            content: `✅ Selected channel: ${channel}`,
            ephemeral: true
        });

    }
};
