const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const api = require("fivem");
const { serverip, serverport } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("players")
    .setDescription("Player List & Player Count"),
  async execute(interaction) {
    const server = new api.Server(`${serverip}:${serverport}`);
    const name = interaction.guild.name;
    const playerNames = [];
    let playerNum = 0;
    const playerList = await server.getPlayersAll();
    playerList.forEach((player) => {
      playerNum += 1;
      playerNames.push(
        `${playerNum}). **Name: **${player.name},    **Player ID:**${player.id}`
      );
    });

    const playersEmbed = new EmbedBuilder()
      .setTitle(`${name}'s Player List`)
      .setThumbnail(interaction.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name} © 2024` })
      .setDescription(
        `There are ${playerList.length} player(s):\n${playerNames.join("\n")}`
      );

    interaction.reply({ embeds: [playersEmbed] });
  },
};
