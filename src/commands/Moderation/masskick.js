const {
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("masskick")
    .setDescription("Kick a User from All Guilds")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to Kick").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the Kick")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Get Variables
    const moderator = interaction.user.displayName;
    const kickeduser = interaction.options.getMember("user");
    const kickreason = interaction.options.getString("reason");
    const client = interaction.client;

    // Permission Check
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers))
      return await interaction.reply({
        content: `You do not have the correct permissions for this action`,
        ephemeral: true,
      });
    if (kickeduser.id === interaction.user.id)
      return await interaction.reply({
        content: `You cannot kick yourself!`,
        ephemeral: true,
      });

    // Create Kick Embed
    const kickembed = new EmbedBuilder()
      .setTitle(`${kickeduser.displayName} has been kicked`)
      .addFields(
        {
          name: "Moderator",
          value: interaction.user.displayName,
          inline: true,
        },
        { name: "Reason", value: kickreason, inline: true }
      )
      .setThumbnail(kickeduser.displayAvatarURL())
      .setFooter({ text: `${interaction.guild.name} © 2024` })
      .setTimestamp();

    // Create DM Embed
    const dmembed = new EmbedBuilder()
      .setTitle(`You have been kicked from all Guilds!`)
      .setThumbnail(interaction.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name} © 2024` })
      .addFields(
        {
          name: "Reason",
          value: kickreason,
          inline: true,
        },
        {
          name: "Moderator",
          value: interaction.user.displayName,
          inline: true,
        }
      );

    // Send a Message & Kick User
    await kickeduser.send({ embeds: [dmembed] });

    client.guilds.cache.forEach(async (m) => {
      m.members.kick(kickeduser, kickreason);
    });

    // Reply to User
    await interaction.reply({
      embeds: [kickembed],
      ephemeral: true,
    });
  },
};
