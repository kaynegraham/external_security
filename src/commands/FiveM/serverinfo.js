const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getServerStatus } = require("../../utils/fetchData");
const { apiBase } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Get the real-time status of the FiveM Server"),
  async execute(interaction) {
    let serverStatus, serverData;
    try {
      serverStatus = await getServerStatus(apiBase);
      serverData = serverStatus.data;
    } catch (e) {
      return interaction.reply({
        content: "Couldn’t reach the server API.",
        ephemeral: true,
      });
    }

    const statusembed = new EmbedBuilder()
      .setTitle(`${serverData.serverInfo.name} Status`)
      .addFields(
        {
          name: "Map Name:",
          value: `${serverData.serverInfo.map}`,
        },
        {
          name: "Current Player Count:",
          value: `${serverData.serverInfo.currentPlayers}`,
        },
        {
          name: "Max Player Limit:",
          value: `${serverData.serverInfo.maxPlayers}`,
        },
      );

    try {
      await interaction.reply({
        embeds: [statusembed],
      });
    } catch (e) {
      console.error(e);
    }
  },
};
