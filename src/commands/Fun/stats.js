const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Statistics about the External Security Bot"),
  async execute(interaction) {
    const client = interaction.client;
    const guild = client.guilds;
    // reduce used here, add to notes if not in already
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

    // could definitely be filter?

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
          value: `${memberCount} Members`,
          inline: true,
        },
        {
          name: "Channels",
          value: `${channelCount} Channels`,
          inline: true,
        },
        {
          name: "Roles",
          value: `${roleCount} Roles`,
          inline: true,
        }
      )
      .setColor("Blue")
      .setThumbnail(interaction.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name} © 2024` });

    interaction.reply({
      embeds: [embed],
    });
  },
};
