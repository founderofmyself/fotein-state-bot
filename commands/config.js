const {
    SlashCommandBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("config")
        .setDescription("Configure Fontein Systems")
        .addSubcommand(sub =>
            sub
                .setName("server-code")
                .setDescription("Set the server code")
                .addStringOption(option =>
                    option
                        .setName("code")
                        .setDescription("Example: FTNSRP")
                        .setRequired(true)
                )
        )
        .addSubcommand(sub =>
            sub
                .setName("founders")
                .setDescription("Set the founders")
                .addStringOption(option =>
                    option
                        .setName("names")
                        .setDescription("Founder names")
                        .setRequired(true)
                )
        )
        .addSubcommand(sub =>
            sub
                .setName("minimum-votes")
                .setDescription("Set minimum votes required")
                .addIntegerOption(option =>
                    option
                        .setName("amount")
                        .setDescription("Minimum votes")
                        .setRequired(true)
                )
        ),

    async execute(interaction) {

        const sub = interaction.options.getSubcommand();

        if (sub === "server-code") {

            const code = interaction.options.getString("code");

            return interaction.reply({
                content: `✅ Server code set to **${code}**`,
                ephemeral: true
            });

        }

        if (sub === "founders") {

            const founders = interaction.options.getString("names");

            return interaction.reply({
                content: `✅ Founders updated:\n${founders}`,
                ephemeral: true
            });

        }

        if (sub === "minimum-votes") {

            const amount = interaction.options.getInteger("amount");

            return interaction.reply({
                content: `✅ Minimum votes set to **${amount}**`,
                ephemeral: true
            });

        }

    }
};
