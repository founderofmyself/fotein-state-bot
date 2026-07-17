const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", "data", "config.json");

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
                .setDescription("Set the server founders")
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
                .setDescription("Set the minimum votes required")
                .addIntegerOption(option =>
                    option
                        .setName("amount")
                        .setDescription("Minimum number of votes")
                        .setRequired(true)
                )
        ),

    async execute(interaction) {

        let config = JSON.parse(fs.readFileSync(configPath, "utf8"));

        const sub = interaction.options.getSubcommand();

        if (sub === "server-code") {

            config.serverCode = interaction.options.getString("code");

            fs.writeFileSync(
                configPath,
                JSON.stringify(config, null, 4)
            );

            return interaction.reply({
                content: `✅ Server code updated to **${config.serverCode}**`,
                ephemeral: true
            });

        }

        if (sub === "founders") {

            config.founders = interaction.options.getString("names");

            fs.writeFileSync(
                configPath,
                JSON.stringify(config, null, 4)
            );

            return interaction.reply({
                content: "✅ Founders updated successfully.",
                ephemeral: true
            });

        }

        if (sub === "minimum-votes") {

            config.minimumVotes = interaction.options.getInteger("amount");

            fs.writeFileSync(
                configPath,
                JSON.stringify(config, null, 4)
            );

            return interaction.reply({
                content: `✅ Minimum votes updated to **${config.minimumVotes}**`,
                ephemeral: true
            });

        }

    }
};
