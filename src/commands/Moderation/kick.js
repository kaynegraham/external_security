const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick user from this guild.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to Kick").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for Kicking User")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      // Get Variables
      const user = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason");
      const moderator = interaction.user.displayName;

      // Permission Check
      if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers))
        return await interaction.reply({
          content: `You do not have the correct permissions for this action`,
          ephemeral: true,
        });

      if (interaction.client.id || user.id === interaction.user.id)
        return await interaction.reply({
          content: `You cannot ban the bot or yourself!`,
          ephemeral: true,
        });

      // Create Kick Embed
      const kickembed = new EmbedBuilder()
        .setTitle(`${user.displayName} has been kicked`)
        .addFields(
          {
            name: "Moderator",
            value: interaction.user.displayName,
            inline: true,
          },
          { name: "Reason", value: reason, inline: true }
        )
        .setThumbnail(user.displayAvatarURL())
        .setFooter({ text: `${interaction.guild.name} © 2024` })
        .setTimestamp();

      // Create DM Embed
      const dmembed = new EmbedBuilder()
        .setTitle(`You have been kicked from ${interaction.guild.name}`)
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name} © 2024` })
        .addFields(
          {
            name: "Reason:",
            value: reason,
            inline: true,
          },
          {
            name: "Moderator",
            value: interaction.user.displayName,
            inline: true,
          }
        );

      // Message User
      await user.send({ embeds: [dmembed] }).then(async () => {
        await user.kick(reason);
        await interaction.reply({ embeds: [kickembed], ephemeral: true });
      });
    } catch (e) {
      console.error("Error", e);
    }
  },
};
