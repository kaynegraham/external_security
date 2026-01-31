const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("massunban")
    .setDescription("Unban a User from all guilds!")
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("ID of User you want to unban!")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Permissions Check
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers))
      return await interaction.reply({
        content: `You do not have the correct permissions`,
        ephemeral: true,
      });

    const userid = interaction.options.getString("userid");
    if (!userid.length === 18)
      return interaction.reply({
        content: `This is not a valid user ID!`,
        ephemeral: true,
      });
    const user = await interaction.client.users.fetch(userid);

    const newEmbed = new EmbedBuilder()
      .setTitle(`Unbanning ${user.displayName}!`)
      .setThumbnail(user.displayAvatarURL())
      .addFields({
        name: "Moderator ",
        value: interaction.user.displayName,
        inline: true,
      })
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name} © 2024` });

      

    try {
      interaction.client.guilds.cache.map(async (guild) => {
        await guild.members.unban(userid);
      });

      interaction.reply({
        embeds: [newEmbed],
        ephemeral: true,
      });
    } catch (e) {
      console.error("Error!", e);
    }
  },
};
