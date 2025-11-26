const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// DrkSurvraze Shop Items
const shopItems = {
    '500_token': {
        name: '500 Token',
        price: 50,
        description: 'Get 500 Tokens for your DrkSurvraze Minecraft account',
        bKash: '01XXXXXXXXX'
    },
    '1000_token': {
        name: '1000 Token',
        price: 100,
        description: 'Get 1000 Tokens for your DrkSurvraze Minecraft account',
        bKash: '01XXXXXXXXX'
    },
    '2500_token': {
        name: '2500 Token',
        price: 250,
        description: 'Get 2500 Tokens for your DrkSurvraze Minecraft account',
        bKash: '01XXXXXXXXX'
    },
    '5000_token': {
        name: '5000 Token',
        price: 500,
        description: 'Get 5000 Tokens for your DrkSurvraze Minecraft account',
        bKash: '01XXXXXXXXX'
    },
    '10000_token': {
        name: '10000 Token',
        price: 1000,
        description: 'Get 10000 Tokens for your DrkSurvraze Minecraft account',
        bKash: '01XXXXXXXXX'
    },
    'vip_rank': {
        name: 'VIP RANK',
        price: 150,
        description: 'Get VIP Rank in DrkSurvraze Minecraft Server',
        bKash: '01XXXXXXXXX'
    }
};

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
});

// Create Shop Command
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && message.author.bot === false) {
        const embed = new EmbedBuilder()
            .setTitle('🛒 Welcome to DrkSurvraze Shop!')
            .setDescription('**Purchasing Process:**\n1. Select an item from dropdown\n2. Send money to our bKash\n3. Click Purchase & fill details\n4. Wait for confirmation DM')
            .setColor(0x00FF00)
            .addFields(
                { name: '500 Token', value: 'Price: 50 BDT', inline: true },
                { name: '1000 Token', value: 'Price: 100 BDT', inline: true },
                { name: '2500 Token', value: 'Price: 250 BDT', inline: true },
                { name: '5000 Token', value: 'Price: 500 BDT', inline: true },
                { name: '10000 Token', value: 'Price: 1000 BDT', inline: true },
                { name: 'VIP RANK', value: 'Price: 150 BDT', inline: true }
            )
            .setFooter({ text: 'DrkSurvraze Minecraft Community' });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('drksurvraze_shop_select')
            .setPlaceholder('Select an item to purchase...')
            .addOptions([
                { label: '500 Token', description: '50 BDT', value: '500_token' },
                { label: '1000 Token', description: '100 BDT', value: '1000_token' },
                { label: '2500 Token', description: '250 BDT', value: '2500_token' },
                { label: '5000 Token', description: '500 BDT', value: '5000_token' },
                { label: '10000 Token', description: '1000 BDT', value: '10000_token' },
                { label: 'VIP RANK', description: '150 BDT', value: 'vip_rank' }
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
});

// Handle Item Selection
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'drksurvraze_shop_select') {
        const selectedItem = interaction.values[0];
        const item = shopItems[selectedItem];

        const embed = new EmbedBuilder()
            .setTitle(`🛒 ${item.name} - DrkSurvraze Shop`)
            .setColor(0xFFA500)
            .addFields(
                { name: '📦 Item', value: item.name, inline: true },
                { name: '💰 Price', value: `${item.price} BDT`, inline: true },
                { name: '📱 bKash Number', value: item.bKash, inline: false },
                { name: '📝 Description', value: item.description, inline: false }
            )
            .setFooter({ text: 'Click the button below to complete purchase' });

        const purchaseButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`purchase_${selectedItem}`)
                .setLabel('Purchase Now')
                .setStyle(ButtonStyle.Success)
        );

        await interaction.reply({
            embeds: [embed],
            components: [purchaseButton],
            ephemeral: true
        });
    }

    // Handle Purchase Button Click
    if (interaction.isButton() && interaction.customId.startsWith('purchase_')) {
        const itemId = interaction.customId.replace('purchase_', '');
        const item = shopItems[itemId];

        // Create Purchase Form Modal
        const modal = new ModalBuilder()
            .setCustomId(`purchase_modal_${itemId}`)
            .setTitle(`Purchase ${item.name}`);

        // Minecraft Username Input
        const minecraftInput = new TextInputBuilder()
            .setCustomId('minecraft_username')
            .setLabel('Your Minecraft Username')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        // bKash Transaction ID Input
        const transactionInput = new TextInputBuilder()
            .setCustomId('bkash_transaction')
            .setLabel('bKash Transaction ID')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        // Phone Number Input
        const phoneInput = new TextInputBuilder()
            .setCustomId('phone_number')
            .setLabel('Your Phone Number')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(minecraftInput);
        const secondActionRow = new ActionRowBuilder().addComponents(transactionInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(phoneInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        await interaction.showModal(modal);
    }
});

// Handle Modal Submission
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId.startsWith('purchase_modal_')) {
        const itemId = interaction.customId.replace('purchase_modal_', '');
        const item = shopItems[itemId];

        const minecraftUsername = interaction.fields.getTextInputValue('minecraft_username');
        const transactionId = interaction.fields.getTextInputValue('bkash_transaction');
        const phoneNumber = interaction.fields.getTextInputValue('phone_number');

        // Send confirmation to user
        const userEmbed = new EmbedBuilder()
            .setTitle('✅ Purchase Submitted - DrkSurvraze')
            .setColor(0x00FF00)
            .addFields(
                { name: 'Item', value: item.name, inline: true },
                { name: 'Price', value: `${item.price} BDT`, inline: true },
                { name: 'Minecraft Username', value: minecraftUsername, inline: false },
                { name: 'Transaction ID', value: transactionId, inline: true },
                { name: 'Phone Number', value: phoneNumber, inline: true }
            )
            .setDescription('We will verify your payment and deliver your item within 1-2 hours. Thank you for shopping with DrkSurvraze!')
            .setFooter({ text: 'DrkSurvraze Minecraft Community' });

        await interaction.reply({
            embeds: [userEmbed],
            ephemeral: true
        });

        // Send notification to admin channel (optional)
        const adminChannel = client.channels.cache.get('ADMIN_CHANNEL_ID');
        if (adminChannel) {
            const adminEmbed = new EmbedBuilder()
                .setTitle('🛒 New Purchase - DrkSurvraze')
                .setColor(0xFFA500)
                .addFields(
                    { name: 'User', value: interaction.user.tag, inline: true },
                    { name: 'Item', value: item.name, inline: true },
                    { name: 'Price', value: `${item.price} BDT`, inline: true },
                    { name: 'Minecraft Username', value: minecraftUsername, inline: false },
                    { name: 'Transaction ID', value: transactionId, inline: true },
                    { name: 'Phone Number', value: phoneNumber, inline: true }
                )
                .setTimestamp();

            await adminChannel.send({ embeds: [adminEmbed] });
        }
    }
});

// Bot Login
client.login(process.env.DISCORD_TOKEN);
