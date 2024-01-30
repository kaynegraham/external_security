const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete Previous Chat Messages")
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("Number of Messages to delete, Default: 15")
    ),
  async execute(interaction) {
    // Get Options
    const number = interaction.options.getNumber("number") || 15;

    // Permission Check
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return await interaction.reply({
        content: `You do not have the correct permissions for this action`,
        ephemeral: true,
      });

    // Check Options
    if (number < 0 || isNaN(number) || number > 100) {
      interaction.reply({
        content: `Number must not be greater than 100`,
        ephemeral: true,
      });
    }

    // Create Embed
    const deleteEmbed = new EmbedBuilder()
      .setTitle(`Deleted ${number} messages`)
      .addFields(
        {
          name: "Moderator",
          value: interaction.user.displayName,
          inline: true,
        },
        {
          name: "Amount",
          value: `${number} messages`,
          inline: true,
        }
      )
      .setColor("#008000")
      .setTimestamp();

    // Error Embed
    const errorEmbed = new EmbedBuilder()
      .setTitle(`An Error has occured!`)
      .setDescription(
        `An Error has occured & the messages were unable to be deleted, sorry!`
      )
      .setColor("FF0000")
      .setTimestamp();

    // Delete Mesages
    interaction.channel.bulkDelete(number).then(() => {
      interaction
        .reply({
          embeds: [deleteEmbed],
          ephemeral: true,
        })
        .catch((error) => {
          console.error("Purge Command:", error);
          interaction.reply({
            embeds: [errorEmbed],
            ephemeral: true,
          });
        });
    });
  },
};
