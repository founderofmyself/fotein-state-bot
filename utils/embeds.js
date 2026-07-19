const { EmbedBuilder } = require("discord.js");

function success(title, description) {
    return new EmbedBuilder()
        .setColor("#57F287")
        .setTitle(`✅ ${title}`)
        .setDescription(description)
        .setTimestamp()
        .setFooter({
            text: "Fontein Systems"
        });
}

function error(title, description) {
    return new EmbedBuilder()
        .setColor("#ED4245")
        .setTitle(`❌ ${title}`)
        .setDescription(description)
        .setTimestamp()
        .setFooter({
            text: "Fontein Systems"
        });
}

function info(title, description) {
    return new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(`📢 ${title}`)
        .setDescription(description)
        .setTimestamp()
        .setFooter({
            text: "Fontein Systems"
        });
}

module.exports = {
    success,
    error,
    info
};
