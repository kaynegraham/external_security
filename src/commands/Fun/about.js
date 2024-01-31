const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Information about the External Security Bot"),
  async execute(interaction) {
    // Get Owner
    const owner = await interaction.guild.fetchOwner();

    // Get Account Age
    let today = new Date();
    let botCreationDate = interaction.client.user.createdAt;
    let ageInMilliseconds = today - botCreationDate;

    // Calculate days, hours, minutes, and seconds
    let days = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
    let hours = Math.floor(
      (ageInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    let minutes = Math.floor(
      (ageInMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
    );
    let seconds = Math.floor((ageInMilliseconds % (60 * 1000)) / 1000);

    const helpembed = new EmbedBuilder()
      .setTitle(`External Security Bot | Information`)
      .addFields(
        {
          name: "Creator/Developer:",
          value: "[DevKayne](https://github.com/kaynegraham)",
        },
        {
          name: "Github Repository",
          value:
            "[Click Here!](https://github.com/kaynegraham/external_security_bot)",
        },
        {
          name: "Creation Date:",
          value: `<t:${Math.floor(botCreationDate / 1000)}:R>`,
        },
        {
          name: "Bot Age:",
          value: `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds old.`,
        },
        {
          name: "Server Owner",
          value: `<@${owner.id}>`,
        }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name}  © 2024` });

    await interaction.reply({ embeds: [helpembed] });
  },
};
