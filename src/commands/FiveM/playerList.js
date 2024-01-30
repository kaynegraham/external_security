const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const api = require("fivem");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("players")
    .setDescription("Player List & Player Count"),
  async execute(interaction) {
    const server = new api.Server("103.152.197.42:30120");
    const name = interaction.guild.name;
    const playerNames = [];
    const players = await server.getPlayers();
    const playerList = await server.getPlayersAll();
    playerList.forEach((player) => {
      playerNames.push(
        `**Name:**${player.name},    **Player ID:**${player.id}`
      );
    });

    const playersEmbed = new EmbedBuilder()
      .setTitle(`${name}'s Player List`)
      .setThumbnail(interaction.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name} © 2024` })
      .setDescription(
        `There are ${playerList.length} player(s):\n${playerNames.join(", \n")}`
      );

    interaction.reply({ embeds: [playersEmbed] });
  },
};
