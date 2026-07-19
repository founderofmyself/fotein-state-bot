const {
    SlashCommandBuilder,
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const { getConfig } = require("../utils/config");

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

        const config = getConfig();

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
            .setColor(config.embedColor || "#5865F2")
            .setTitle("📢 Session Vote")
            .setDescription(
`### ${interaction.user} has started a session!

If you would like to join, press **Vote** below.

**Minimum Votes Required:** **${config.minimumVotes}**

━━━━━━━━━━━━━━━━━━

## Server Info

**Server Code:** ${config.serverCode}

**Server Founders**
${config.founders}`
            )
            .setFooter({
                text: "Fontein Systems"
            })
            .setTimestamp();

        if (config.bannerUrl && config.bannerUrl !== "") {
            embed.setImage(config.bannerUrl);
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("session_vote")
                    .setLabel("🗳️ Vote (0)")
                    .setStyle(ButtonStyle.Success)
            );

        let content = "";

        if (config.sessionRole && config.sessionRole !== "") {
            content = `<@&${config.sessionRole}>`;
        }

        await channel.send({
            content,
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content: `✅ Session started in ${channel}`,
            ephemeral: true
        });

    }
};
