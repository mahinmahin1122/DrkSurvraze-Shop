const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
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
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '1200_token': {
        name: '1200 Token',
        price: 100,
        tokens: 1200,
        description: '1200 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '3000_token': {
        name: '3000 Token',
        price: 250,
        tokens: 3000,
        description: '3000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '6000_token': {
        name: '6000 Token',
        price: 500,
        tokens: 6000,
        description: '6000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '12000_token': {
        name: '12000 Token',
        price: 1000,
        tokens: 12000,
        description: '12000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    'vip_rank': {
        name: 'VIP RANK',
        price: 125,
        tokens: 0,
        description: 'Get VIP Rank in DrkSurvraze Minecraft Server (Ingame 400k)',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    'mvp_rank': {
        name: 'MVP RANK',
        price: 210,
        tokens: 0,
        description: 'Get MVP Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    'elite_rank': {
        name: 'ELITE RANK',
        price: 300,
        tokens: 0,
        description: 'Get ELITE Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    }
};

// ImgBB Images for different sections
const shopImages = {
    banner: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    logo: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    success: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    paymentGuide: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
};

// 🔧 PRIVATE CHANNEL ID - আপনি যে চ্যানেলে SMS পাঠাতে চান
const PRIVATE_ORDERS_CHANNEL_ID = '1443293560895049792'; // আপনার দেওয়া প্রাইভেট চ্যানেল ID

// Store ephemeral messages for auto-deletion
const userEphemeralMessages = new Map();

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
    console.log(`🤖 Bot ID: ${client.user.id}`);
    console.log(`🔒 All orders will be sent to private channel: ${PRIVATE_ORDERS_CHANNEL_ID}`);
    
    // Check channel permissions
    checkChannelPermissions();
});

// Check if bot has permission to send messages in private channel
async function checkChannelPermissions() {
    try {
        const privateChannel = client.channels.cache.get(PRIVATE_ORDERS_CHANNEL_ID);
        
        if (privateChannel) {
            const permissions = privateChannel.permissionsFor(client.user);
            if (!permissions.has(PermissionsBitField.Flags.SendMessages)) {
                console.log('❌ No permission to send messages in private channel');
            } else {
                console.log('✅ Has permission in private channel');
            }
        } else {
            console.log('❌ Private channel not found! Please check the channel ID');
        }
    } catch (error) {
        console.log('❌ Error checking channel permissions:', error);
    }
}

// Create Shop Command
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && message.author.bot === false) {
        console.log(`🛒 Shop command received from ${message.author.tag}`);
        
        const embed = new EmbedBuilder()
            .setTitle('🛒 Welcome to DrkSurvraze Shop!')
            .setDescription('**Select an item from the dropdown menu below to start your purchase.**\n\n**Purchasing Process:**\n1. Select an item from dropdown\n2. Send money to our bKash/Nagad\n3. Click Purchase & fill details\n4. Wait for confirmation')
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

        // Store ephemeral message info for auto-deletion
        storeEphemeralMessage(interaction);
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

        // Store item ID in a data attribute for easy retrieval
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

        // Store ephemeral message info for auto-deletion
        storeEphemeralMessage(interaction);
    }
});

// Handle Purchase Button Click - Step 3 (Modal Open)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    console.log(`🔘 Button interaction detected: ${interaction.customId}`);

    if (interaction.customId.startsWith('purchase_')) {
        console.log(`🛒 Purchase button clicked: ${interaction.customId}`);
        
        // Better parsing for custom ID
        const customIdParts = interaction.customId.split('_');
        
        // The custom ID format is: purchase_600_token_bkash
        // So parts will be: ['purchase', '600', 'token', 'bkash']
        const itemKey = `${customIdParts[1]}_${customIdParts[2]}`; // This creates '600_token'
        const paymentMethod = customIdParts[3]; // 'bkash' or 'nagad'
        
        console.log(`🔍 Parsed - Item Key: ${itemKey}, Payment Method: ${paymentMethod}`);
        
        const item = shopItems[itemKey];
        
        if (!item) {
            console.log(`❌ Item not found for key: ${itemKey}`);
            await interaction.reply({
                content: '❌ Item not found. Please start over with !shop',
                ephemeral: true
            });
            return;
        }
        
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

        console.log(`✅ Found item: ${item.name}, Preparing modal...`);

        // Create Purchase Form Modal
        const modal = new ModalBuilder()
            .setCustomId(`purchase_modal_${itemKey}_${paymentMethod}`)
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
        // Proper parsing for modal custom ID
        const customIdParts = interaction.customId.split('_');
        
        // The custom ID format is: purchase_modal_600_token_bkash
        // So parts will be: ['purchase', 'modal', '600', 'token', 'bkash']
        const itemKey = `${customIdParts[2]}_${customIdParts[3]}`; // This creates '600_token'
        const paymentMethod = customIdParts[4]; // 'bkash' or 'nagad'
        
        console.log(`🔍 Modal Parsed - Item Key: ${itemKey}, Payment Method: ${paymentMethod}`);
        
        const item = shopItems[itemKey];
        
        if (!item) {
            console.log(`❌ Item not found in modal: ${itemKey}`);
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

        // 🔥 AUTO-DELETE PREVIOUS EPHEMERAL MESSAGES
        await deleteUserEphemeralMessages(interaction.user.id, interaction.channelId);

        // Send final confirmation to user (ephemeral - this will also auto-delete later)
        const userEmbed = new EmbedBuilder()
            .setTitle('✅ Purchase Submitted Successfully!')
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
            .setDescription('**✅ Your order has been processed!**\n\nWe will verify your payment and deliver your item within 1-2 hours.\n\n**Check your DM for confirmation!**')
            .setFooter({ 
                text: 'DrkSurvraze Minecraft Community', 
                iconURL: shopImages.logo 
            });

        await interaction.reply({
            embeds: [userEmbed],
            ephemeral: true
        });

        // Store this ephemeral message for auto-deletion
        storeEphemeralMessage(interaction);

        // ✅ 1. Send DM to user (ইউজারের টাইপ অনুযায়ী আলাদা মেসেজ)
        try {
            let dmDescription = '';
            let dmTitle = '';
            
            if (item.type === 'token') {
                dmTitle = '🎮 Token Purchase Confirmed - DrkSurvraze';
                dmDescription = `**✅ Your ${item.tokens} Tokens purchase has been received!**\n\nWe are verifying your payment and will add the tokens to your account within 1-2 hours.\n\n**Please make sure you are online in our Minecraft server for token delivery.**\n\n**Thank you for shopping with DrkSurvraze!**`;
            } else if (item.type === 'rank') {
                dmTitle = '👑 Rank Purchase Confirmed - DrkSurvraze';
                dmDescription = `**✅ Your ${item.name} purchase has been received!**\n\nWe are verifying your payment and will upgrade your rank within 1-2 hours.\n\n**Please make sure you are online in our Minecraft server for rank upgrade.**\n\n**Thank you for choosing DrkSurvraze!**`;
            } else {
                dmTitle = '🛒 Order Confirmed - DrkSurvraze Shop';
                dmDescription = `**✅ Your order has been received!**\n\nWe are verifying your payment and will deliver your item within 1-2 hours.\n\n**Thank you for shopping with DrkSurvraze!**`;
            }

            const userDMEmbed = new EmbedBuilder()
                .setTitle(dmTitle)
                .setColor(0x00FF00)
                .setThumbnail(shopImages.success)
                .addFields(
                    { 
                        name: '📦 Your Order', 
                        value: item.tokens > 0 
                            ? `**${item.name}** - ${item.tokens} Tokens\n**Price:** ${item.price} BDT` 
                            : `**${item.name}**\n**Price:** ${item.price} BDT`,
                        inline: false 
                    },
                    { 
                        name: '👤 Account Info', 
                        value: `**Minecraft:** ${minecraftUsername}\n**Payment:** ${paymentName} (${paymentNumber})`,
                        inline: false 
                    },
                    { 
                        name: '📋 Transaction ID', 
                        value: transactionId,
                        inline: false 
                    }
                )
                .setDescription(dmDescription)
                .setFooter({ 
                    text: 'DrkSurvraze Minecraft Community', 
                    iconURL: shopImages.logo 
                })
                .setTimestamp();

            const user = await client.users.fetch(interaction.user.id);
            await user.send({ embeds: [userDMEmbed] });
            console.log(`📩 DM sent to user: ${interaction.user.tag} (Item Type: ${item.type})`);
        } catch (dmError) {
            console.log(`❌ Could not send DM to ${interaction.user.tag}:`, dmError.message);
        }

        // ✅ 2. Send to PRIVATE CHANNEL (আপনার দেওয়া চ্যানেলে)
        const privateOrdersChannel = client.channels.cache.get(PRIVATE_ORDERS_CHANNEL_ID);
        if (privateOrdersChannel) {
            try {
                let orderType = '';
                if (item.type === 'token') {
                    orderType = '🪙 TOKEN ORDER';
                } else if (item.type === 'rank') {
                    orderType = '👑 RANK ORDER';
                } else {
                    orderType = '🛒 GENERAL ORDER';
                }

                const privateEmbed = new EmbedBuilder()
                    .setTitle(`🛒 ${orderType} - DrkSurvraze Shop`)
                    .setColor(item.type === 'token' ? 0x3498DB : item.type === 'rank' ? 0xF1C40F : 0x00FF00)
                    .setThumbnail(item.image)
                    .addFields(
                        { 
                            name: '**👤 CUSTOMER INFORMATION**', 
                            value: `**Discord User:** ${interaction.user.tag}\n**Discord ID:** ${interaction.user.id}\n**Minecraft Username:** ${minecraftUsername}`, 
                            inline: false 
                        },
                        { 
                            name: '**📦 ORDER INFORMATION**', 
                            value: item.tokens > 0 
                                ? `**Item:** ${item.name}\n**Tokens:** ${item.tokens}\n**Price:** ${item.price} BDT\n**Type:** ${item.type.toUpperCase()}` 
                                : `**Item:** ${item.name}\n**Price:** ${item.price} BDT\n**Type:** ${item.type.toUpperCase()}`, 
                            inline: false 
                        },
                        { 
                            name: '**💳 PAYMENT INFORMATION**', 
                            value: `**Payment Method:** ${paymentName}\n**Customer ${paymentName} Number:** ${paymentNumber}\n**Transaction ID:** ${transactionId}`, 
                            inline: false 
                        },
                        { 
                            name: '**⏰ ORDER TIME**', 
                            value: `<t:${Math.floor(Date.now() / 1000)}:F> (<t:${Math.floor(Date.now() / 1000)}:R>)`, 
                            inline: false 
                        }
                    )
                    .setFooter({ text: 'DrkSurvraze Shop - Order Management' })
                    .setTimestamp();

                await privateOrdersChannel.send({ 
                    content: `📢 **🚨 NEW ${orderType} RECEIVED! 🚨**`,
                    embeds: [privateEmbed] 
                });
                console.log(`✅ Order sent to private channel: ${PRIVATE_ORDERS_CHANNEL_ID} (Type: ${item.type})`);
            } catch (privateError) {
                console.log(`❌ Could not send to private channel:`, privateError.message);
                console.log(`💡 Please check:\n1. Channel ID: ${PRIVATE_ORDERS_CHANNEL_ID}\n2. Bot has permission to send messages\n3. Channel exists in the server`);
            }
        } else {
            console.log(`❌ Private channel not found! ID: ${PRIVATE_ORDERS_CHANNEL_ID}`);
            console.log('💡 Please check the channel ID and make sure bot has access');
        }
    }
});

// Function to store ephemeral messages for auto-deletion
function storeEphemeralMessage(interaction) {
    const userId = interaction.user.id;
    const channelId = interaction.channelId;
    
    if (!userEphemeralMessages.has(userId)) {
        userEphemeralMessages.set(userId, new Map());
    }
    
    const userChannels = userEphemeralMessages.get(userId);
    if (!userChannels.has(channelId)) {
        userChannels.set(channelId, []);
    }
    
    const channelMessages = userChannels.get(channelId);
    
    // Store message info (we'll track the latest interactions)
    if (channelMessages.length >= 5) {
        channelMessages.shift(); // Remove oldest message
    }
    
    channelMessages.push({
        timestamp: Date.now(),
        interactionId: interaction.id
    });
}

// Function to delete user's ephemeral messages in a specific channel
async function deleteUserEphemeralMessages(userId, channelId) {
    try {
        if (userEphemeralMessages.has(userId)) {
            const userChannels = userEphemeralMessages.get(userId);
            if (userChannels.has(channelId)) {
                const channelMessages = userChannels.get(channelId);
                
                console.log(`🗑️ Deleting ${channelMessages.length} ephemeral messages for user ${userId} in channel ${channelId}`);
                
                // Clear the stored messages
                userChannels.delete(channelId);
                
                if (userChannels.size === 0) {
                    userEphemeralMessages.delete(userId);
                }
            }
        }
    } catch (error) {
        console.log('❌ Error deleting ephemeral messages:', error);
    }
}

// Auto-cleanup old ephemeral messages (every 10 minutes)
setInterval(() => {
    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;
    
    for (const [userId, userChannels] of userEphemeralMessages.entries()) {
        for (const [channelId, messages] of userChannels.entries()) {
            const recentMessages = messages.filter(msg => now - msg.timestamp < TEN_MINUTES);
            
            if (recentMessages.length === 0) {
                userChannels.delete(channelId);
            } else {
                userChannels.set(channelId, recentMessages);
            }
        }
        
        if (userChannels.size === 0) {
            userEphemeralMessages.delete(userId);
        }
    }
}, 10 * 60 * 1000); // 10 minutes

// Error handling
client.on('error', (error) => {
    console.error('❌ Client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Bot login
client.login(process.env.DISCORD_TOKEN);
