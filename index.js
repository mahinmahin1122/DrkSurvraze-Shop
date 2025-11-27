const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Exchange rate: 1 BDT = 12 tokens
const TOKEN_RATE = 12;

// DrkSurvraze Shop Items with ImgBB URLs
const shopItems = {
    '600_token': {
        name: '600 Token Package',
        price: 50,
        tokens: 600,
        description: 'Get 600 Tokens for your gameplay',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image1/600-token.png',
        icon: '🪙'
    },
    '1200_token': {
        name: '1200 Token Package',
        price: 100,
        tokens: 1200,
        description: 'Get 1200 Tokens for your gameplay',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image2/1200-token.png',
        icon: '🪙🪙'
    },
    '3000_token': {
        name: '3000 Token Package',
        price: 250,
        tokens: 3000,
        description: 'Get 3000 Tokens for your gameplay',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image3/3000-token.png',
        icon: '🪙🪙🪙'
    },
    '6000_token': {
        name: '6000 Token Package',
        price: 500,
        tokens: 6000,
        description: 'Get 6000 Tokens for your gameplay',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image4/6000-token.png',
        icon: '🪙🪙🪙🪙'
    },
    '12000_token': {
        name: '12000 Token Package',
        price: 1000,
        tokens: 12000,
        description: 'Get 12000 Tokens for your gameplay',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image5/12000-token.png',
        icon: '🪙🪙🪙🪙🪙'
    },
    'vip_rank': {
        name: 'VIP RANK',
        price: 125,
        tokens: 0,
        description: 'Get VIP Rank in DrkSurvraze Minecraft Server (Ingame 400k)',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image6/vip-rank.png',
        icon: '👑'
    },
    'mvp_rank': {
        name: 'MVP RANK',
        price: 210,
        tokens: 0,
        description: 'Get MVP Rank in DrkSurvraze Minecraft Server',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image7/mvp-rank.png',
        icon: '🏆'
    },
    'elite_rank': {
        name: 'ELITE RANK',
        price: 300,
        tokens: 0,
        description: 'Get ELITE Rank in DrkSurvraze Minecraft Server',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image8/elite-rank.png',
        icon: '⭐'
    }
};

// ImgBB Images for different sections
const shopImages = {
    banner: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    logo: 'https://i.ibb.co/your-logo/logo.png',
    success: 'https://i.ibb.co/your-success/success-icon.png',
    paymentGuide: 'https://i.ibb.co/your-guide/payment-guide.png'
};

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
});

// Create Shop Command
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && message.author.bot === false) {
        const embed = new EmbedBuilder()
            .setTitle('🛒 Welcome to DrkSurvraze Shop!')
            .setDescription(`**Exchange Rate:** 1 BDT = ${TOKEN_RATE} Tokens\n\n**Purchasing Process:**\n1. Select an item from dropdown\n2. Send money to our bKash/Nagad\n3. Click Purchase & fill details\n4. Wait for confirmation DM`)
            .setColor(0x00FF00)
            .setThumbnail(shopImages.logo)
            .setImage(shopImages.banner)
            .setFooter({ 
                text: 'DrkSurvraze Minecraft Community', 
                iconURL: shopImages.logo 
            });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('item_select')
            .setPlaceholder('Select an item to purchase...')
            .addOptions([
                { label: '🪙 600 Token', description: '50 BDT', value: '600_token' },
                { label: '🪙🪙 1200 Token', description: '100 BDT', value: '1200_token' },
                { label: '🪙🪙🪙 3000 Token', description: '250 BDT', value: '3000_token' },
                { label: '🪙🪙🪙🪙 6000 Token', description: '500 BDT', value: '6000_token' },
                { label: '🪙🪙🪙🪙🪙 12000 Token', description: '1000 BDT', value: '12000_token' },
                { label: '👑 VIP RANK', description: '125 BDT (Ingame 400k)', value: 'vip_rank' },
                { label: '🏆 MVP RANK', description: '210 BDT', value: 'mvp_rank' },
                { label: '⭐ ELITE RANK', description: '300 BDT', value: 'elite_rank' }
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
});

// Handle Item Selection - Step 1
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'item_select') {
        const selectedItem = interaction.values[0];
        const item = shopItems[selectedItem];

        // Store selected item in interaction for later use
        interaction.selectedItem = item;
        interaction.selectedItemId = selectedItem;

        const embed = new EmbedBuilder()
            .setTitle(`${item.icon} ${item.name} - DrkSurvraze Shop`)
            .setColor(0xFFA500)
            .setThumbnail(item.image)
            .addFields(
                { name: `${item.icon} ${item.tokens > 0 ? 'Tokens' : 'Rank'}`, value: item.tokens > 0 ? `**${item.tokens} Tokens**` : `**${item.name}**`, inline: true },
                { name: '💰 Price', value: `${item.price} BDT`, inline: true },
                { name: '⚡ Value', value: item.tokens > 0 ? `**${item.tokens} Tokens** for ${item.price} BDT` : `${item.name} for ${item.price} BDT`, inline: false },
                { name: '📝 Description', value: item.description, inline: false }
            )
            .setFooter({ text: 'Select your payment method below' });

        const paymentSelect = new StringSelectMenuBuilder()
            .setCustomId('payment_select')
            .setPlaceholder('Choose payment method...')
            .addOptions([
                { label: 'bKash', description: 'Pay with bKash', value: 'bkash', emoji: '💳' },
                { label: 'Nagad', description: 'Pay with Nagad', value: 'nagad', emoji: '📱' }
            ]);

        const row = new ActionRowBuilder().addComponents(paymentSelect);

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    }

    // Handle Payment Method Selection - Step 2
    if (interaction.customId === 'payment_select') {
        const paymentMethod = interaction.values[0];
        const item = interaction.selectedItem;
        const itemId = interaction.selectedItemId;

        const paymentNumber = paymentMethod === 'bkash' ? item.bKash : item.nagad;
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';
        const paymentEmoji = paymentMethod === 'bkash' ? '💳' : '📱';

        const embed = new EmbedBuilder()
            .setTitle(`${paymentEmoji} ${item.icon} ${item.name} - Payment Instructions`)
            .setColor(0x0099FF)
            .setThumbnail(item.image)
            .addFields(
                { name: `${item.icon} ${item.tokens > 0 ? 'Tokens' : 'Rank'}`, value: item.tokens > 0 ? `**${item.tokens} Tokens**` : `**${item.name}**`, inline: true },
                { name: '💰 Price', value: `${item.price} BDT`, inline: true },
                { name: `📱 ${paymentName} Number`, value: `\`${paymentNumber}\``, inline: false },
                { name: '📝 Description', value: item.description, inline: false }
            )
            .setDescription(`**How to Purchase:**\n1. Send **${item.price} BDT** to ${paymentName} number: ${paymentNumber}\n2. Click the 'Purchase' button below.\n3. Enter your Minecraft name and the ${paymentName} Transaction ID.`)
            .setImage(shopImages.paymentGuide)
            .setFooter({ text: 'Make sure to use the Send Money option' });

        const purchaseButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`purchase_${itemId}_${paymentMethod}`)
                .setLabel('Purchase Now')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🛒')
        );

        await interaction.update({
            embeds: [embed],
            components: [purchaseButton]
        });
    }

    // Handle Purchase Button Click - Step 3
    if (interaction.isButton() && interaction.customId.startsWith('purchase_')) {
        const [_, itemId, paymentMethod] = interaction.customId.split('_');
        const item = shopItems[itemId];
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

        // Create Purchase Form Modal
        const modal = new ModalBuilder()
            .setCustomId(`purchase_modal_${itemId}_${paymentMethod}`)
            .setTitle(`Purchase ${item.icon} ${item.name}`);

        // Minecraft Username Input
        const minecraftInput = new TextInputBuilder()
            .setCustomId('minecraft_username')
            .setLabel('Your Minecraft Username')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your exact Minecraft username')
            .setRequired(true);

        // Transaction ID Input
        const transactionInput = new TextInputBuilder()
            .setCustomId('transaction_id')
            .setLabel(`${paymentName} Transaction ID`)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your transaction ID')
            .setRequired(true);

        // Phone Number Input
        const phoneInput = new TextInputBuilder()
            .setCustomId('phone_number')
            .setLabel('Your Phone Number')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('01XXXXXXXXX')
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(minecraftInput);
        const secondActionRow = new ActionRowBuilder().addComponents(transactionInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(phoneInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        await interaction.showModal(modal);
    }
});

// Handle Modal Submission - Final Step
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId.startsWith('purchase_modal_')) {
        const [_, __, itemId, paymentMethod] = interaction.customId.split('_');
        const item = shopItems[itemId];
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

        const minecraftUsername = interaction.fields.getTextInputValue('minecraft_username');
        const transactionId = interaction.fields.getTextInputValue('transaction_id');
        const phoneNumber = interaction.fields.getTextInputValue('phone_number');

        // Send confirmation to user
        const userEmbed = new EmbedBuilder()
            .setTitle('✅ Purchase Submitted - DrkSurvraze')
            .setColor(0x00FF00)
            .setThumbnail(shopImages.success)
            .addFields(
                { name: `${item.icon} ${item.tokens > 0 ? 'Tokens' : 'Rank'}`, value: item.tokens > 0 ? `**${item.tokens} Tokens**` : `**${item.name}**`, inline: true },
                { name: '💰 Price', value: `${item.price} BDT`, inline: true },
                { name: '📦 Package', value: `${item.icon} ${item.name}`, inline: true },
                { name: '💳 Payment Method', value: paymentName, inline: true },
                { name: '👤 Minecraft Username', value: minecraftUsername, inline: false },
                { name: '🆔 Transaction ID', value: transactionId, inline: true },
                { name: '📱 Phone Number', value: phoneNumber, inline: true }
            )
            .setDescription('We will verify your payment and deliver your item within 1-2 hours. Thank you for shopping with DrkSurvraze!')
            .setFooter({ 
                text: 'DrkSurvraze Minecraft Community', 
                iconURL: shopImages.logo 
            });

        await interaction.reply({
            embeds: [userEmbed],
            ephemeral: true
        });

        // Send notification to admin channel
        const adminChannel = client.channels.cache.get('ADMIN_CHANNEL_ID');
        if (adminChannel) {
            const adminEmbed = new EmbedBuilder()
                .setTitle('🛒 New Purchase - DrkSurvraze')
                .setColor(0xFFA500)
                .addFields(
                    { name: '👤 User', value: interaction.user.tag, inline: true },
                    { name: `${item.icon} ${item.tokens > 0 ? 'Tokens' : 'Rank'}`, value: item.tokens > 0 ? `${item.tokens} Tokens` : item.name, inline: true },
                    { name: '💰 Price', value: `${item.price} BDT`, inline: true },
                    { name: '📦 Package', value: `${item.icon} ${item.name}`, inline: true },
                    { name: '💳 Payment Method', value: paymentName, inline: true },
                    { name: '👤 Minecraft Username', value: minecraftUsername, inline: false },
                    { name: '🆔 Transaction ID', value: transactionId, inline: true },
                    { name: '📱 Phone Number', value: phoneNumber, inline: true }
                )
                .setTimestamp();

            await adminChannel.send({ embeds: [adminEmbed] });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
