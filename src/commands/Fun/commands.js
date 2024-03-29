const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Get Command List for this bot!"),
  async execute(interaction) {
    const commandembed = new EmbedBuilder()
      .setTitle(`External Security Bot | Command List`)
      .setDescription(
        `This bot was created by devkayne\nThere is also single-guild versions of the commands below\n**Using Slash Commands:**\n[] = Required\n() = Optional`
      )
      .addFields(
        {
          name: "massban [User] (Reason)",
          value: "Bans a member from all discords",
        },
        {
          name: "massunban [UserId]",
          value: "Unbans a member from all discords",
        },
        {
          name: "masskick [User] (Reason)",
          value: "Kicks a member from all discords",
        },
        {
          name: "massnick [User] [New Nickname]",
          value: "Changes nickname of member in all discords",
        },
        {
          name: "massmute [User] [Time] (Reason)",
          value: "Mutes a member in all discords",
        },
        {
          name: "investigate [User] (reason)",
          value: "Removes all roles from member and creates channel",
        },
        {
          name: "release [User]",
          value: "Gives all roles from member back and deletes channel",
        },
        {
          name: "purge (Num of messages)",
          value: "Delete previous messages, Default Number is 15",
        },
        {
          name: "timeout [User] (Reason)",
          value: "Timeouts a user",
        },
        {
          name: "about",
          value: "Provides Information about the External Security Bot",
        },
        {
          name: "commands",
          value: "Provides a List of All Commands",
        },
        {
          name: "stats",
          value: "Provide Statistics about this guild.",
        }
      )
      .setTimestamp()
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({ text: `${interaction.guild.name}  © 2024` });

    await interaction.reply({ embeds: [commandembed] });
  },
};
