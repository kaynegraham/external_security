const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Statistics about the External Security Bot"),
  async execute(interaction) {
    const client = interaction.client;
    const guild = client.guilds;
    const memberCount = guild.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );

    let channelCount = null;
    let roleCount = null;

    client.guilds.cache.forEach(async (m) => {
      channelCount = m.channels.cache.size;
      roleCount = m.roles.cache.size;
    });

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name}'s statistics`)
      .addFields(
        {
          name: "Guilds",
          value: `${client.guilds.cache.size} guilds`,
          inline: true,
        },
        {
          name: "Members",
          value: `${memberCount} members`,
          inline: true,
        },
        {
          name: "Channels",
          value: `${channelCount} channels`,
          inline: true,
        },
        {
          name: "Roles",
          value: `${roleCount} roles`,
          inline: true,
        }
      )
      .setColor("Blue")
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  },
};
