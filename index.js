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

// DrkSurvraze Shop Items
const shopItems = {
    '500_token': {
        name: '500 Token',
        price: 50,
        description: 'Small bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638'
    },
    '1000_token': {
        name: '1000 Token',
        price: 100,
        description: 'Medium bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638'
    },
    '2500_token': {
        name: '2500 Token',
        price: 250,
        description: 'Large bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638'
    },
    '5000_token': {
        name: '5000 Token',
        price: 500,
        description: 'Extra large bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638'
    },
    '10000_token': {
        name: '10000 Token',
        price: 1000,
        description: 'Giant bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638'
    },
    'vip_rank': {
        name: 'VIP RANK',
        price: 150,
        description: 'Get VIP Rank in DrkSurvraze Minecraft Server',
        bKash: '01777194638',
        nagad: '01777194638'
    }
};

// Admin Channel ID - আপনার Admin চ্যানেলের ID দিয়ে পরিবর্তন করুন
const ADMIN_CHANNEL_ID = '123456789012345678';

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
    console.log(`📊 Admin Channel ID: ${ADMIN_CHANNEL_ID}`);
});

// Create Shop Command
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && message.author.bot === false) {
        const embed = new EmbedBuilder()
            .setTitle('🛒 Welcome to DrkSurvraze Shop!')
            .setDescription('**Purchasing Process:**\n1. Select an item from dropdown\n2. Send money to our bKash/Nagad\n3. Click Purchase & fill details\n4. Wait for confirmation DM')
            .setColor(0x00FF00)
            .addFields(
                { name: '500 Token', value: 'Price: 50 BDT', inline: true },
                { name: '1000 Token', value: 'Price: 100 BDT', inline: true },
                { name: '2500 Token', value: 'Price: 250 BDT', inline: true },
                { name: '5000 Token', value: 'Price: 500 BDT', inline: true },
                { name: '10000 Token', value: 'Price: 1000 BDT', inline: true },
                { name: 'VIP RANK', value: 'Price: 150 BDT', inline: true }
            )
            .setFooter({ 
                text: 'DrkSurvraze Minecraft Community'
            });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('item_select')
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
            .setTitle(`🛒 ${item.name} - DrkSurvraze Shop`)
            .setColor(0xFFA500)
            .addFields(
                { name: '📦 Item', value: item.name, inline: true },
                { name: '💰 Price', value: `${item.price} BDT`, inline: true },
                { name: '📝 Description', value: item.description, inline: false }
            )
            .setFooter({ text: 'Select your payment method below' });

        // Payment Method Selection
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
            .setTitle(`${paymentEmoji} ${item.name} - Payment Instructions`)
            .setColor(0x0099FF)
            .addFields(
                { name: '📦 Item', value: item.name, inline: true },
                { name: '💰 Price', value: `${item.price} BDT`, inline: true },
                { name: `📱 ${paymentName} Number`, value: `\`${paymentNumber}\``, inline: false },
                { name: '📝 Description', value: item.description, inline: false }
            )
            .setDescription(`**How to Purchase:**\n1. Copy the ${paymentName} number: **${paymentNumber}**\n2. Send ${item.price} BDT to this number\n3. Click the 'Purchase' button below after sending money\n4. Enter your Minecraft username and Transaction ID`)
            .setFooter({ text: 'Make sure to use the Send Money option' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`copy_${paymentNumber}`)
                .setLabel('Copy Number')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('📋'),
            new ButtonBuilder()
                .setCustomId(`purchase_${itemId}_${paymentMethod}`)
                .setLabel('Purchase Now')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🛒')
        );

        await interaction.update({
            embeds: [embed],
            components: [row]
        });
    }

    // Handle Copy Number Button
    if (interaction.isButton() && interaction.customId.startsWith('copy_')) {
        const phoneNumber = interaction.customId.replace('copy_', '');
        
        await interaction.reply({
            content: `📋 **Number copied:** \`${phoneNumber}\`\nNow send the money and click Purchase button.`,
            ephemeral: true
        });
    }

    // Handle Purchase Button Click - Step 3
    if (interaction.isButton() && interaction.customId.startsWith('purchase_') && !interaction.customId.startsWith('copy_')) {
        const [_, itemId, paymentMethod] = interaction.customId.split('_');
        const item = shopItems[itemId];
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

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
            .setMaxLength(16);

        // Transaction ID Input
        const transactionInput = new TextInputBuilder()
            .setCustomId('transaction_id')
            .setLabel(`${paymentName} Transaction ID`)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder(`Enter your ${paymentName} transaction ID`)
            .setRequired(true)
            .setMaxLength(20);

        const firstActionRow = new ActionRowBuilder().addComponents(minecraftInput);
        const secondActionRow = new ActionRowBuilder().addComponents(transactionInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    }
});

// Handle Modal Submission - Final Step (Admin Channel এ সব ডাটা transfer)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId.startsWith('purchase_modal_')) {
        const [_, __, itemId, paymentMethod] = interaction.customId.split('_');
        const item = shopItems[itemId];
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

        const minecraftUsername = interaction.fields.getTextInputValue('minecraft_username');
        const transactionId = interaction.fields.getTextInputValue('transaction_id');

        // Send confirmation to user
        const userEmbed = new EmbedBuilder()
            .setTitle('✅ Purchase Submitted - DrkSurvraze')
            .setColor(0x00FF00)
            .addFields(
                { name: 'Item', value: item.name, inline: true },
                { name: 'Price', value: `${item.price} BDT`, inline: true },
                { name: 'Payment Method', value: paymentName, inline: true },
                { name: 'Minecraft Username', value: minecraftUsername, inline: false },
                { name: 'Transaction ID', value: transactionId, inline: true }
            )
            .setDescription('We will verify your payment and deliver your item within 1-2 hours. Thank you for shopping with DrkSurvraze!')
            .setFooter({ 
                text: 'DrkSurvraze Minecraft Community'
            });

        await interaction.reply({
            embeds: [userEmbed],
            ephemeral: true
        });

        // Send ALL DATA to Admin Channel
        const adminChannel = client.channels.cache.get(ADMIN_CHANNEL_ID);
        if (adminChannel) {
            // Main Order Embed
            const adminEmbed = new EmbedBuilder()
                .setTitle('🛒 NEW ORDER - DrkSurvraze Shop')
                .setColor(0xFFA500)
                .addFields(
                    { name: '👤 Customer', value: `**Name:** ${interaction.user.tag}\n**ID:** ${interaction.user.id}`, inline: false },
                    { name: '📦 Product Details', value: `**Item:** ${item.name}\n**Price:** ${item.price} BDT\n**Payment Method:** ${paymentName}`, inline: false },
                    { name: '🎮 Minecraft Info', value: `**Username:** ${minecraftUsername}`, inline: true },
                    { name: '💳 Transaction', value: `**ID:** ${transactionId}`, inline: true },
                    { name: '⏰ Order Time', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false },
                    { name: '📊 Status', value: '🟡 **Pending Verification**', inline: true }
                )
                .setTimestamp()
                .setFooter({ text: `Order ID: ${transactionId.substring(0, 8)}` });

            // Action Buttons for Admin
            const adminActions = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`verify_${interaction.user.id}_${itemId}_${transactionId}`)
                        .setLabel('Verify Payment')
                        .setStyle(ButtonStyle.Success)
                        .setEmoji('✅'),
                    new ButtonBuilder()
                        .setCustomId(`deliver_${interaction.user.id}_${itemId}_${transactionId}`)
                        .setLabel('Deliver Item')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🎁'),
                    new ButtonBuilder()
                        .setCustomId(`reject_${interaction.user.id}_${itemId}_${transactionId}`)
                        .setLabel('Reject')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('❌')
                );

            await adminChannel.send({ 
                content: '📢 **NEW ORDER RECEIVED!**',
                embeds: [adminEmbed], 
                components: [adminActions] 
            });

            // Additional Order Summary
            const orderSummary = new EmbedBuilder()
                .setTitle('📋 Order Summary')
                .setColor(0x3498db)
                .setDescription('**Order Details for Quick Reference:**')
                .addFields(
                    { name: 'Customer', value: interaction.user.tag, inline: true },
                    { name: 'Item', value: item.name, inline: true },
                    { name: 'Amount', value: `${item.price} BDT`, inline: true },
                    { name: 'Minecraft Username', value: minecraftUsername, inline: true },
                    { name: 'Transaction ID', value: transactionId, inline: true },
                    { name: 'Payment Method', value: paymentName, inline: true }
                )
                .setTimestamp();

            await adminChannel.send({ embeds: [orderSummary] });

            console.log(`📊 New order received from ${interaction.user.tag} for ${item.name}`);
        } else {
            console.log('❌ Admin channel not found! Please check ADMIN_CHANNEL_ID');
            
            // Fallback: Send to bot owner
            const owner = await client.users.fetch(process.env.OWNER_ID);
            if (owner) {
                await owner.send({
                    content: `❌ **ADMIN CHANNEL ERROR**\nNew order received but admin channel not found!\n\n**Order Details:**\n- Customer: ${interaction.user.tag}\n- Item: ${item.name}\n- Price: ${item.price} BDT\n- Minecraft: ${minecraftUsername}\n- Transaction: ${transactionId}`
                });
            }
        }
    }
});

// Handle Admin Actions (Verify, Deliver, Reject)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('verify_') || 
        interaction.customId.startsWith('deliver_') || 
        interaction.customId.startsWith('reject_')) {
        
        // Only allow admins to use these buttons
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return await interaction.reply({
                content: '❌ You do not have permission to use this button.',
                ephemeral: true
            });
        }

        const [action, userId, itemId, transactionId] = interaction.customId.split('_');
        const item = shopItems[itemId];
        const user = await client.users.fetch(userId);

        if (action === 'verify') {
            // Update the embed to show verified
            const verifiedEmbed = EmbedBuilder.from(interaction.message.embeds[0])
                .setColor(0x00FF00)
                .spliceFields(5, 1, { name: '📊 Status', value: '🟢 **Payment Verified**', inline: true });

            await interaction.message.edit({ 
                embeds: [verifiedEmbed],
                components: [] // Remove buttons after verification
            });

            await interaction.reply({
                content: `✅ Payment verified for ${user.tag} - ${item.name}`,
                ephemeral: true
            });

            // Notify user
            await user.send({
                content: `🎉 **Payment Verified!**\nYour payment for **${item.name}** has been verified. Your item will be delivered soon.`
            });

        } else if (action === 'deliver') {
            // Mark as delivered
            const deliveredEmbed = EmbedBuilder.from(interaction.message.embeds[0])
                .setColor(0x9B59B6)
                .spliceFields(5, 1, { name: '📊 Status', value: '🟣 **Item Delivered**', inline: true });

            await interaction.message.edit({ 
                embeds: [deliveredEmbed],
                components: []
            });

            await interaction.reply({
                content: `🎁 Item delivered to ${user.tag} - ${item.name}`,
                ephemeral: true
            });

            // Notify user
            await user.send({
                content: `🎁 **Item Delivered!**\nYour **${item.name}** has been delivered to your Minecraft account. Thank you for shopping with DrkSurvraze!`
            });

        } else if (action === 'reject') {
            // Mark as rejected
            const rejectedEmbed = EmbedBuilder.from(interaction.message.embeds[0])
                .setColor(0xFF0000)
                .spliceFields(5, 1, { name: '📊 Status', value: '🔴 **Order Rejected**', inline: true });

            await interaction.message.edit({ 
                embeds: [rejectedEmbed],
                components: []
            });

            await interaction.reply({
                content: `❌ Order rejected for ${user.tag} - ${item.name}`,
                ephemeral: true
            });

            // Notify user
            await user.send({
                content: `❌ **Order Rejected**\nYour order for **${item.name}** has been rejected. Please contact support if you think this is a mistake.`
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
