const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getServerStatus } = require("../../utils/fetchData");
const { apiBase } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Get the real-time status of the FiveM Server"),
  async execute(interaction) {
    const serverStatus = await getServerStatus(apiBase);
    console.log(serverStatus);
    await interaction.reply({
      content: "meow",
    });
  },
};
