const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages
    ]
});

// DrkSurvraze Shop Items
const shopItems = {
    '600_token': {
        name: '600 Token',
        price: 50,
        tokens: 600,
        description: '600 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
    },
    '1200_token': {
        name: '1200 Token',
        price: 100,
        tokens: 1200,
        description: '1200 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
    },
    '3000_token': {
        name: '3000 Token',
        price: 250,
        tokens: 3000,
        description: '3000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
    },
    '6000_token': {
        name: '6000 Token',
        price: 500,
        tokens: 6000,
        description: '6000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
    },
    '12000_token': {
        name: '12000 Token',
        price: 1000,
        tokens: 12000,
        description: '12000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
    },
    'vip_rank': {
        name: 'VIP RANK',
        price: 125,
        tokens: 0,
        description: 'Get VIP Rank in DrkSurvraze Minecraft Server (Ingame 400k)',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
    },
    'mvp_rank': {
        name: 'MVP RANK',
        price: 210,
        tokens: 0,
        description: 'Get MVP Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
    },
    'elite_rank': {
        name: 'ELITE RANK',
        price: 300,
        tokens: 0,
        description: 'Get ELITE Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
    }
};

// ImgBB Images for different sections
const shopImages = {
    banner: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    logo: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    success: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    paymentGuide: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
};

// Admin channel ID - Eta replace koro tomar admin channel ID diye
const ADMIN_CHANNEL_ID = '1324833964374290535';

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
    console.log(`🤖 Bot ID: ${client.user.id}`);
});

// Debug all interactions
client.on('interactionCreate', async (interaction) => {
    console.log(`🔹 Interaction received: ${interaction.type} | ${interaction.customId || 'No Custom ID'}`);
    
    if (interaction.isStringSelectMenu()) {
        console.log(`📝 Select Menu: ${interaction.customId} | Value: ${interaction.values[0]}`);
    }
    
    if (interaction.isButton()) {
        console.log(`🔘 Button Clicked: ${interaction.customId}`);
    }
    
    if (interaction.isModalSubmit()) {
        console.log(`📄 Modal Submitted: ${interaction.customId}`);
    }
});

// Create Shop Command
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && message.author.bot === false) {
        console.log(`🛒 Shop command received from ${message.author.tag}`);
        
        const embed = new EmbedBuilder()
            .setTitle('🛒 Welcome to DrkSurvraze Shop!')
            .setDescription('**Select an item from the dropdown menu below to start your purchase.**\n\n**Purchasing Process:**\n1. Select an item from dropdown\n2. Send money to our bKash/Nagad\n3. Click Purchase & fill details\n4. Wait for confirmation DM')
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
                { label: '600 Token', description: 'Price: 50 BDT', value: '600_token' },
                { label: '1200 Token', description: 'Price: 100 BDT', value: '1200_token' },
                { label: '3000 Token', description: 'Price: 250 BDT', value: '3000_token' },
                { label: '6000 Token', description: 'Price: 500 BDT', value: '6000_token' },
                { label: '12000 Token', description: 'Price: 1000 BDT', value: '12000_token' },
                { label: 'VIP RANK', description: 'Price: 125 BDT', value: 'vip_rank' },
                { label: 'MVP RANK', description: 'Price: 210 BDT', value: 'mvp_rank' },
                { label: 'ELITE RANK', description: 'Price: 300 BDT', value: 'elite_rank' }
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
        console.log(`📦 Item selected: ${interaction.values[0]}`);
        
        const selectedItem = interaction.values[0];
        const item = shopItems[selectedItem];

        const embed = new EmbedBuilder()
            .setTitle(`🛒 ${item.name} - DrkSurvraze Shop`)
            .setColor(0xFFA500)
            .setThumbnail(item.image)
            .addFields(
                { 
                    name: '📦 Order Details', 
                    value: item.tokens > 0 
                        ? `**Tokens:** ${item.tokens}\n**Price:** ${item.price} BDT` 
                        : `**Item:** ${item.name}\n**Price:** ${item.price} BDT`,
                    inline: false 
                },
                { 
                    name: '📝 Description', 
                    value: item.description, 
                    inline: false 
                }
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
        console.log(`💳 Payment method selected: ${interaction.values[0]}`);
        
        const paymentMethod = interaction.values[0];
        
        // Get the original message to extract item info
        const originalEmbed = interaction.message.embeds[0];
        const itemName = originalEmbed.title.split(' - ')[0].replace('🛒 ', '');
        
        // Find the item from shopItems
        let selectedItemId = '';
        let item = null;
        
        for (const [key, shopItem] of Object.entries(shopItems)) {
            if (shopItem.name === itemName) {
                selectedItemId = key;
                item = shopItem;
                break;
            }
        }

        if (!item) {
            await interaction.reply({
                content: '❌ Item not found. Please start over with !shop',
                ephemeral: true
            });
            return;
        }

        const paymentNumber = paymentMethod === 'bkash' ? item.bKash : item.nagad;
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';
        const paymentEmoji = paymentMethod === 'bkash' ? '💳' : '📱';

        const embed = new EmbedBuilder()
            .setTitle(`${paymentEmoji} ${item.name} - Payment Instructions`)
            .setColor(0x0099FF)
            .setThumbnail(item.image)
            .addFields(
                { 
                    name: '📦 Order Summary', 
                    value: item.tokens > 0 
                        ? `**Tokens:** ${item.tokens}\n**Price:** ${item.price} BDT` 
                        : `**Item:** ${item.name}\n**Price:** ${item.price} BDT`,
                    inline: false 
                },
                { 
                    name: `📱 ${paymentName} Number`, 
                    value: `**${paymentNumber}**`, 
                    inline: false 
                },
                { 
                    name: '📝 Description', 
                    value: item.description, 
                    inline: false 
                }
            )
            .setDescription(`**How to Purchase:**\n1. Send **${item.price} BDT** to ${paymentName} number: **${paymentNumber}**\n2. Click the 'Purchase' button below.\n3. Enter your payment details in the form.`)
            .setImage(shopImages.paymentGuide)
            .setFooter({ text: 'Make sure to use the Send Money option' });

        const purchaseButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`purchase_${selectedItemId}_${paymentMethod}`)
                .setLabel('Purchase Now')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🛒')
        );

        await interaction.update({
            embeds: [embed],
            components: [purchaseButton]
        });
    }
});

// Handle Purchase Button Click - Step 3 (Modal Open)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    console.log(`🔘 Button interaction detected: ${interaction.customId}`);

    if (interaction.customId.startsWith('purchase_')) {
        console.log(`🛒 Purchase button clicked: ${interaction.customId}`);
        
        // FIXED: Properly parse the customId
        const customIdParts = interaction.customId.split('_');
        const itemId = customIdParts[1]; // '600_token', 'vip_rank', etc.
        const paymentMethod = customIdParts[2]; // 'bkash' or 'nagad'
        
        console.log(`🔍 Parsed - Item ID: ${itemId}, Payment Method: ${paymentMethod}`);
        
        const item = shopItems[itemId];
        
        if (!item) {
            console.log(`❌ Item not found in shopItems: ${itemId}`);
            console.log(`📋 Available items: ${Object.keys(shopItems).join(', ')}`);
            await interaction.reply({
                content: '❌ Item not found. Please start over with !shop',
                ephemeral: true
            });
            return;
        }
        
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

        console.log(`📝 Preparing modal for: ${item.name} with ${paymentMethod}`);

        // Create Purchase Form Modal
        const modal = new ModalBuilder()
            .setCustomId(`purchase_modal_${itemId}_${paymentMethod}`)
            .setTitle(`Purchase ${item.name}`);

        // Minecraft Username Input
        const minecraftInput = new TextInputBuilder()
            .setCustomId('minecraft_username')
            .setLabel('Your Minecraft Username')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your exact Minecraft username')
            .setRequired(true)
            .setMaxLength(20);

        // Payment Number Input (User's payment number)
        const paymentNumberInput = new TextInputBuilder()
            .setCustomId('payment_number')
            .setLabel(`Your ${paymentName} Number`)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder(`01XXXXXXXXX`)
            .setRequired(true)
            .setMaxLength(11);

        // Transaction ID Input
        const transactionInput = new TextInputBuilder()
            .setCustomId('transaction_id')
            .setLabel(`${paymentName} Transaction ID`)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter transaction ID from payment')
            .setRequired(true)
            .setMaxLength(20);

        // Add inputs to modal
        const firstActionRow = new ActionRowBuilder().addComponents(minecraftInput);
        const secondActionRow = new ActionRowBuilder().addComponents(paymentNumberInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(transactionInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        try {
            console.log(`📤 Showing modal for user: ${interaction.user.tag}`);
            await interaction.showModal(modal);
            console.log(`✅ Modal shown successfully for: ${interaction.user.tag}`);
        } catch (error) {
            console.error('❌ Error showing modal:', error);
            // Try alternative response if modal fails
            await interaction.reply({
                content: '❌ Error opening form. Please try clicking the Purchase button again.',
                ephemeral: true
            });
        }
    }
});

// Handle Modal Submission - Final Step
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    console.log(`📄 Modal submitted: ${interaction.customId}`);

    if (interaction.customId.startsWith('purchase_modal_')) {
        // FIXED: Properly parse the modal customId
        const customIdParts = interaction.customId.split('_');
        const itemId = customIdParts[2]; // '600_token', 'vip_rank', etc.
        const paymentMethod = customIdParts[3]; // 'bkash' or 'nagad'
        
        console.log(`🔍 Modal Parsed - Item ID: ${itemId}, Payment Method: ${paymentMethod}`);
        
        const item = shopItems[itemId];
        
        if (!item) {
            console.log(`❌ Item not found in modal: ${itemId}`);
            await interaction.reply({
                content: '❌ Error: Item not found. Please contact admin.',
                ephemeral: true
            });
            return;
        }
        
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

        const minecraftUsername = interaction.fields.getTextInputValue('minecraft_username');
        const paymentNumber = interaction.fields.getTextInputValue('payment_number');
        const transactionId = interaction.fields.getTextInputValue('transaction_id');

        console.log(`✅ Order received: ${item.name} by ${minecraftUsername}`);

        // Send confirmation to user
        const userEmbed = new EmbedBuilder()
            .setTitle('✅ Purchase Submitted - DrkSurvraze')
            .setColor(0x00FF00)
            .setThumbnail(shopImages.success)
            .addFields(
                { 
                    name: '📦 Order Details', 
                    value: item.tokens > 0 
                        ? `**Tokens:** ${item.tokens}\n**Price:** ${item.price} BDT` 
                        : `**Item:** ${item.name}\n**Price:** ${item.price} BDT`,
                    inline: false 
                },
                { 
                    name: '👤 Your Information', 
                    value: `**Minecraft Username:** ${minecraftUsername}\n**Payment Method:** ${paymentName}\n**Your ${paymentName} Number:** ${paymentNumber}\n**Transaction ID:** ${transactionId}`,
                    inline: false 
                }
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
        const adminChannel = client.channels.cache.get(ADMIN_CHANNEL_ID);
        if (adminChannel) {
            const adminEmbed = new EmbedBuilder()
                .setTitle('🛒 New Purchase Order - DrkSurvraze')
                .setColor(0xFFA500)
                .setThumbnail(item.image)
                .addFields(
                    { name: '**👤 Customer Info**', value: `**Discord User:** ${interaction.user.tag}\n**Minecraft Username:** ${minecraftUsername}`, inline: false },
                    { name: '**📦 Order Info**', value: item.tokens > 0 ? `**Item:** ${item.name}\n**Tokens:** ${item.tokens}\n**Price:** ${item.price} BDT` : `**Item:** ${item.name}\n**Price:** ${item.price} BDT`, inline: false },
                    { name: '**💳 Payment Info**', value: `**Payment Method:** ${paymentName}\n**Customer ${paymentName}:** ${paymentNumber}\n**Transaction ID:** ${transactionId}`, inline: false },
                    { name: '**⏰ Order Time**', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false }
                )
                .setFooter({ text: 'Please verify the payment and deliver the item' })
                .setTimestamp();

            await adminChannel.send({ 
                content: '📢 **New Order Received!**',
                embeds: [adminEmbed] 
            });
            console.log(`📢 Notification sent to admin channel`);
        } else {
            console.log('❌ Admin channel not found!');
        }
    }
});

// Error handling
client.on('error', (error) => {
    console.error('❌ Client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

client.login(process.env.DISCORD_TOKEN);
