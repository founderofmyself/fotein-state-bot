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
                .setDescription("Set the minimum votes")
                .addIntegerOption(option =>
                    option
                        .setName("amount")
                        .setDescription("Minimum votes")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("session-role")
                .setDescription("Set the session ping role")
                .addRoleOption(option =>
                    option
                        .setName("role")
                        .setDescription("Role to ping")
                        .setRequired(true)
                )
        ),

    async execute(interaction) {

        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

        const sub = interaction.options.getSubcommand();

        if (sub === "server-code") {

            config.serverCode = interaction.options.getString("code");

        }

        if (sub === "founders") {

            config.founders = interaction.options.getString("names");

        }

        if (sub === "minimum-votes") {

            config.minimumVotes = interaction.options.getInteger("amount");

        }

        if (sub === "session-role") {

            config.sessionRole = interaction.options.getRole("role").id;

        }

        fs.writeFileSync(
            configPath,
            JSON.stringify(config, null, 4)
        );

        await interaction.reply({
            content: "✅ Configuration updated successfully.",
            ephemeral: true
        });

    }

    {
    "serverCode": "FTNSRP",
    "founders": "𝕱 | 𝕷𝖔𝖔𝖕𝖞\nCrewboo67 | Founder",
    "minimumVotes": 2,
    "sessionRole": ""
}
};
