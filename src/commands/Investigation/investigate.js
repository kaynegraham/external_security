const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("investigate")
    .setDescription("Put a User under investigation")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to Investigate")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for Investigation")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Get Variable
    const member = interaction.options.getMember("user");
    const reason =
      interaction.options.getString("reason") || "No Reason Provided";
    const guild = interaction.guild;

    // Get Member Roles
    let roleIds = [];
    member.roles.cache.map(async (role) => {
      roleIds.push(role);
    });

    // Create Channel
    let investigateCategory = guild.channels.cache.find(
      (c) => c.name === "Coventry" && c.type === ChannelType.GuildCategory
    );

    if (!investigateCategory) {
      investigateCategory = await guild.channels.create({
        name: "Coventry",
        type: ChannelType.GuildCategory,
      });
    }

    // should also say roles given in embed

    // Create Investigation Channel
    const channel = await guild.channels.create({
      name: `${member.displayName}-investigation`,
      type: ChannelType.GuildText,
      topic: `${member.id}`,
      parent: investigateCategory,
      permissionOverwrites: [
        {
          id: member.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
          ],
        },
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });

    const investigateEmbed = new EmbedBuilder()
      .setTitle(`Investigation Created by ${interaction.user.displayName}`)
      .setThumbnail(interaction.user.displayAvatarURL())
      .addFields(
        {
          name: "User",
          value: `<@${member.id}>`,
          inline: true,
        },
        {
          name: "Reason",
          value: reason,
          inline: true,
        },
        {
          name: "Roles Taken",
          value: `${roleIds.join(",\n")}`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name} © 2024` });

    // Remove All Roles
    member.roles.set([]);

    await channel.send({ embeds: [investigateEmbed] });
    await interaction.reply({
      content: `Channel Created: ${channel}`,
      ephemeral: true,
    });
  },
};
