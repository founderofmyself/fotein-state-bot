const {
    SlashCommandBuilder,
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("session")
        .setDescription("Manage server sessions.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("start")
                .setDescription("Start a session vote.")
                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Channel to send the session vote.")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        ),

    async execute(interaction) {

        const channel = interaction.options.getChannel("channel");

        const permissions = channel.permissionsFor(interaction.guild.members.me);

        if (
            !permissions.has(PermissionsBitField.Flags.SendMessages) ||
            !permissions.has(PermissionsBitField.Flags.EmbedLinks)
        ) {
            return interaction.reply({
                content:
"❌ **The bot cannot send messages in that channel!**\n\nGo to **Channel Settings → Permissions**, choose my role and enable:\n\n• Send Messages\n• Embed Links",
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("📢 Session Vote")
            .setDescription(
`### ${interaction.user} has started a session vote!

If you would like to join, please vote below.

**Minimum Votes Required:** **2**

━━━━━━━━━━━━━━━━━━

## Server Info

**Server Code:** FTNSRP

**Server Founders**
𝕱 | 𝕷𝖔𝖔𝖕𝖞
Crewboo67 | Founder`
            )
            .setFooter({
                text: "Fontein Systems"
            })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("session_vote")
                    .setLabel("🗳️ Vote (0)")
                    .setStyle(ButtonStyle.Success)
            );

        await channel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content: `✅ Session vote sent in ${channel}.`,
            ephemeral: true
        });

    }
};
