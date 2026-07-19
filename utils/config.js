const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", "data", "config.json");

function getConfig() {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function saveConfig(config) {
    fs.writeFileSync(
        configPath,
        JSON.stringify(config, null, 4)
    );
}

module.exports = {
    getConfig,
    saveConfig
};
