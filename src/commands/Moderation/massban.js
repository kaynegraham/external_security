const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("massban")
    .setDescription("Ban a User from all guilds!")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to Ban!").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for Ban")
    ),
  async execute(interaction) {
    const bannedUser = interaction.options.getUser("user");
    const banReason =
      interaction.options.getString("reason") || "No Reason Provided";

    // Permissions Check
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers))
      return await interaction.reply({
        content: `You do not have the correct permissions`,
        ephemeral: true,
      });

    if (interaction.client.id || bannedUser.id === interaction.user.id)
      return await interaction.reply({
        content: `You cannot ban the bot or yourself!`,
        ephemeral: true,
      });

    // Create Embed(s)
    const banEmbed = new EmbedBuilder()
      .setTitle(`${bannedUser.displayName} has been banned from all guilds`)
      .addFields(
        {
          name: "Moderator",
          value: interaction.user.displayName,
          inline: true,
        },
        {
          name: "Reason",
          value: banReason,
          inline: true,
        }
      )
      .setTimestamp()
      .setThumbnail(bannedUser.displayAvatarURL())
      .setFooter({ text: `${interaction.guild.name} © 2024` });

    const dmembed = new EmbedBuilder()
      .setTitle(`You have been banned from all guilds!`)
      .addFields(
        {
          name: "Moderator",
          value: interaction.user.displayName,
          inline: true,
        },
        {
          name: "Reason",
          value: banReason,
          inline: true,
        }
      );

    // Send DM & Reply to Interaction
    await bannedUser.send({ embeds: [dmembed] });

    interaction.client.guilds.cache.forEach(async (m) => {
      m.members.ban(bannedUser);
    });

    await interaction.reply({ embeds: [banEmbed], ephemeral: true });
  },
};
