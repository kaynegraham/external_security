const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nick")
    .setDescription("Change Nickname of User")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Who's nickname do you want to change")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("What is the Nickname you want to set?")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Get Variables
    const user = interaction.options.getMember("user");
    const newNick = interaction.options.getString("nickname");

    // Check Permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ChangeNickname))
      return interaction.reply({
        content: `You do not have permission to do this!`,
        ephemeral: true,
      });

    try {
      user.setNickname(newNick);
      interaction.reply({
        content: `Successfully Updated ${user.displayName}'s nickname`,
        ephemeral: true,
      });
    } catch (e) {
      interaction.reply({
        content: `Error Occured!`,
        ephemeral: true,
      });
      console.error("Error!", e);
    }
  },
};
