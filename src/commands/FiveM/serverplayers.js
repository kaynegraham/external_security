const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getServerPlayers, getServerStatus } = require("../../utils/fetchData");
const { apiBase, maxPlayers } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("players")
    .setDescription("Get the real-time player list of the FiveM Server"),
  async execute(interaction) {
    let serverStatus,
      players = [];
    try {
      serverStatus = await getServerStatus(apiBase);
      players = serverStatus.data.playerInfo;
    } catch (e) {
      console.error(e);
      return interaction.reply({
        content: "Couldn’t reach the server API.",
        ephemeral: true,
      });
    }

    // Split for single list
    const shownPlayers = players.slice(0, maxPlayers);
    const names = shownPlayers.map((p) => p.name).join("\n") || "—";
    const ids = shownPlayers.map((p) => `${p.id}`).join("\n") || "—";
    const pings = shownPlayers.map((p) => `${p.ping}ms`).join("\n") || "-";

    // Colour based on load
    const info = serverStatus.data.serverInfo;
    const ratio = info.currentPlayers / info.maxPlayers;
    const color = ratio > 0.75 ? 0xff5555 : ratio > 0.4 ? 0xffa500 : 0x00ff88;

    const playerembed = new EmbedBuilder()
      .setTitle(`👥 Player List`)
      .setDescription(`**${info.name}**`)
      .setColor(color)
      .addFields(
        { name: "Player", value: names, inline: true },
        { name: "ID Number:", value: ids, inline: true },
        { name: "Ping", value: pings, inline: true },
      )
      .setFooter({
        text: `Showing ${shownPlayers.length}/${players.length} players`,
      })
      .setTimestamp();

    try {
      await interaction.reply({
        embeds: [playerembed],
      });
    } catch (e) {
      console.error(e);
    }
  },
};
