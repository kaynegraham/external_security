const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("massmute")
    .setDescription("Mute a Member in All Guilds")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to mute").setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("How long to time the user out in minutes, Default: 1")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for Timeout?")
    ),
  async execute(interaction) {
    const timedoutUser = interaction.options.getMember("user");
    const duration = interaction.options.getNumber("time") || 1;
    const reason =
      interaction.options.getString("reason") || "No Reason Specified";

    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)
    )
      return await interaction.reply({
        content: `You don't have the correct permissions!`,
        ephemeral: true,
      });

    // Create Embed(s)
    const timeoutEmbed = new EmbedBuilder()
      .setTitle(`Timed out ${timedoutUser.displayName}`)
      .addFields(
        {
          name: "Moderator",
          value: interaction.user.displayName,
          inline: true,
        },
        {
          name: "Duration",
          value: `${duration} minutes`,
          inline: true,
        },
        {
          name: "Reason",
          value: reason,
          inline: true,
        }
      )
      .setFooter({ text: `${interaction.guild.name} © 2024` })
      .setTimestamp();

    const dmEmbed = new EmbedBuilder()
      .setTitle(`You have been timed out in all guilds.`)
      .addFields(
        {
          name: "Moderator",
          value: interaction.user.displayName,
          inline: true,
        },
        {
          name: "Duration",
          value: `${duration} minutes`,
          inline: true,
        },
        {
          name: "Reason",
          value: reason,
          inline: true,
        }
      )
      .setFooter({ text: `${interaction.guild.name} © 2024` })
      .setTimestamp();

    // Time out member and reply to Interaction
    try {
      timedoutUser.send({ embeds: [dmEmbed] });
      let time = duration * 60000;

      interaction.client.guilds.cache.forEach(async (m) => {
        timedoutUser.timeout(time, reason);
      });

      await interaction.reply({ embeds: [timeoutEmbed], ephemeral: true });
    } catch (error) {
      console.error("Mass Timeout:", error);
    }
  },
};
