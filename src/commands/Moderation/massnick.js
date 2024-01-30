const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("massnick")
    .setDescription("Change Nickname of User in all guilds")
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
    const mod = interaction.user.displayName;
    const member = interaction.options.getMember("user");
    const newNick = interaction.options.getString("nickname");
    const client = interaction.client;

    try {
      // Use Promise.all to wait for all nickname changes to complete
      await Promise.all(
        client.guilds.cache.map(async (guild) => {
          try {
            await guild.members.fetch(member.id); // Fetch the member in each guild
            await member.setNickname(newNick, `Changed by ${mod}`);
          } catch (error) {
            console.error(`Error changing nickname in ${guild.name}:`, error);
          }
        })
      );

      interaction.reply({
        content: `Successfully Updated ${member.displayName}'s nickname in all guilds`,
        ephemeral: true,
      });
    } catch (e) {
      console.error("Error!", e);
    }
  },
};
