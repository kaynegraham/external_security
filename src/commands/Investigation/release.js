const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("release")
    .setDescription("Release User from Investigation")
    .addUserOption((option) =>
      option.setName("user").setDescription("user to release").setRequired(true)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const topic = interaction.channel.topic;
    // Get First Message
    const message = await interaction.channel.messages.fetch({
      after: 0,
      limit: 1,
    });
    const investigateEmbed = message.first();

    // Get Roles
    let roles = investigateEmbed.embeds[0].data.fields[2].value;

    // Remove Certain Letters
    let removeLetters = ["<", "@", "&", ">", ",", "everyone"];

    removeLetters.forEach(function (letter) {
      roles = roles.replaceAll(letter, "");
    });

    // Turn into Array
    roles = roles.match(/.{1,19}/g);

    if (member.id === topic) {
      // Give Back Roles
      roles.forEach(function (role) {
        member.roles.add(role, "Released from Coventry");
      });

      interaction.reply({
        content: `User has been given roles back andd released!`,
        ephemeral: true,
      });
      interaction.guild.channels.delete(interaction.channel);
    } else {
      interaction.reply({
        content: `Incorrect Channel!`,
        ephemeral: true,
      });
    }
  },
};
