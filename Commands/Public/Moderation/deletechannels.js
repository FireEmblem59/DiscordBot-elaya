const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletec')
		.setDescription('Select channel to delete it.')
		.addChannelOption(option =>
			option
				.setName('target')
				.setDescription('The channel to delete')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.DeleteChannel)
		.setDMPermission(false),
        
        async execute(interaction) {
            const target = interaction.options.getChannel('target');
    
            await interaction.reply(`deleting <#${target.id}>`);
            target.delete();
        },
};