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

// Calculate tokens based on fixed BDT prices
function calculateTokens(priceBDT) {
    return priceBDT * TOKEN_RATE;
}

// DrkSurvraze Shop Items with ImgBB URLs
const shopItems = {
    '50_bdt': {
        name: '50 BDT Package',
        price: 50,
        tokens: calculateTokens(50), // 600 tokens
        description: '600 Token package',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image1/50-bdt.png'
    },
    '100_bdt': {
        name: '100 BDT Package',
        price: 100,
        tokens: calculateTokens(100), // 1200 tokens
        description: '1200 Token package',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image2/100-bdt.png'
    },
    '250_bdt': {
        name: '250 BDT Package',
        price: 250,
        tokens: calculateTokens(250), // 3000 tokens
        description: '3000 Token package',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image3/250-bdt.png'
    },
    '500_bdt': {
        name: '500 BDT Package',
        price: 500,
        tokens: calculateTokens(500), // 6000 tokens
        description: '6000 Token package',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image4/500-bdt.png'
    },
    '1000_bdt': {
        name: '1000 BDT Package',
        price: 1000,
        tokens: calculateTokens(1000), // 12000 tokens
        description: '12000 Token package',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image5/1000-bdt.png'
    },
    'custom_token': {
        name: 'Custom Token Amount',
        price: 0, // Will be calculated based on user input
        tokens: 0,
        description: 'Purchase custom amount of tokens',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image6/custom-token.png'
    },
    'vip_rank': {
        name: 'VIP RANK',
        price: 150,
        tokens: 0, // VIP rank doesn't give tokens
        description: 'Get VIP Rank in DrkSurvraze Minecraft Server',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image7/vip-rank.png'
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
                { label: '50 BDT Package', description: `${shopItems['50_bdt'].tokens} Tokens`, value: '50_bdt' },
                { label: '100 BDT Package', description: `${shopItems['100_bdt'].tokens} Tokens`, value: '100_bdt' },
                { label: '250 BDT Package', description: `${shopItems['250_bdt'].tokens} Tokens`, value: '250_bdt' },
                { label: '500 BDT Package', description: `${shopItems['500_bdt'].tokens} Tokens`, value: '500_bdt' },
                { label: '1000 BDT Package', description: `${shopItems['1000_bdt'].tokens} Tokens`, value: '1000_bdt' },
                { label: 'Custom Token Amount', description: 'Buy custom tokens', value: 'custom_token' },
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

        // For custom token, show a different interface
        if (selectedItem === 'custom_token') {
            const embed = new EmbedBuilder()
                .setTitle('🛒 Custom Token Purchase - DrkSurvraze Shop')
                .setColor(0xFFA500)
                .setThumbnail(item.image)
                .setDescription(`**Exchange Rate:** 1 BDT = ${TOKEN_RATE} Tokens\n\nPlease select your payment method to continue with custom token purchase.`)
                .addFields(
                    { name: '📦 Item', value: 'Custom Token Amount', inline: true },
                    { name: '💰 Rate', value: `1 BDT = ${TOKEN_RATE} Tokens`, inline: true },
                    { name: '📝 Description', value: 'You will be able to specify the exact token amount during purchase', inline: false }
                )
                .setFooter({ text: 'Select your payment method below' });

            const paymentSelect = new StringSelectMenuBuilder()
                .setCustomId('payment_select_custom')
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
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`🛒 ${item.name} - DrkSurvraze Shop`)
            .setColor(0xFFA500)
            .setThumbnail(item.image)
            .addFields(
                { name: '📦 Package', value: `${item.price} BDT`, inline: true },
                { name: '🎫 Tokens', value: `${item.tokens} Tokens`, inline: true },
                { name: '💰 Value', value: `${item.price} BDT = ${item.tokens} Tokens`, inline: false },
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

    // Handle Payment Method Selection for Custom Token - Special Case
    if (interaction.customId === 'payment_select_custom') {
        const paymentMethod = interaction.values[0];
        const item = shopItems['custom_token'];
        
        const paymentNumber = paymentMethod === 'bkash' ? item.bKash : item.nagad;
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';
        const paymentEmoji = paymentMethod === 'bkash' ? '💳' : '📱';

        const embed = new EmbedBuilder()
            .setTitle(`${paymentEmoji} Custom Token Purchase`)
            .setColor(0x0099FF)
            .setThumbnail(item.image)
            .addFields(
                { name: '📦 Item', value: 'Custom Token Amount', inline: true },
                { name: '💰 Rate', value: `1 BDT = ${TOKEN_RATE} Tokens`, inline: true },
                { name: `📱 ${paymentName} Number`, value: `\`${paymentNumber}\``, inline: false }
            )
            .setDescription(`**How to Purchase Custom Tokens:**\n1. Decide how many tokens you want\n2. Calculate: Tokens ÷ ${TOKEN_RATE} = BDT amount\n3. Send calculated BDT to ${paymentName}\n4. Click 'Purchase Custom' button\n5. Enter token amount and transaction details`)
            .setImage(shopImages.paymentGuide)
            .setFooter({ text: `Example: 600 tokens = 50 BDT` });

        const purchaseButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`purchase_custom_${paymentMethod}`)
                .setLabel('Purchase Custom Tokens')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🛒')
        );

        await interaction.update({
            embeds: [embed],
            components: [purchaseButton]
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
            .setThumbnail(item.image)
            .addFields(
                { name: '💰 Package', value: `${item.price} BDT`, inline: true },
                { name: '🎫 Tokens', value: `${item.tokens} Tokens`, inline: true },
                { name: `📱 ${paymentName} Number`, value: `\`${paymentNumber}\``, inline: false },
                { name: '📝 Description', value: item.description, inline: false }
            )
            .setDescription(`**How to Purchase:**\n1. Send ${item.price} BDT to ${paymentName} number: ${paymentNumber}\n2. Click the 'Purchase' button below.\n3. Enter your Minecraft name and the ${paymentName} Transaction ID.`)
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
        if (interaction.customId.startsWith('purchase_custom_')) {
            // Handle custom token purchase
            const [_, __, paymentMethod] = interaction.customId.split('_');
            const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

            // Create Custom Purchase Modal
            const modal = new ModalBuilder()
                .setCustomId(`purchase_custom_modal_${paymentMethod}`)
                .setTitle('Purchase Custom Tokens');

            // Token Amount Input
            const tokenInput = new TextInputBuilder()
                .setCustomId('token_amount')
                .setLabel(`Token Amount (1 BDT = ${TOKEN_RATE} tokens)`)
                .setStyle(TextInputStyle.Short)
                .setPlaceholder(`Enter token amount`)
                .setRequired(true);

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

            const firstActionRow = new ActionRowBuilder().addComponents(tokenInput);
            const secondActionRow = new ActionRowBuilder().addComponents(minecraftInput);
            const thirdActionRow = new ActionRowBuilder().addComponents(transactionInput);
            const fourthActionRow = new ActionRowBuilder().addComponents(phoneInput);

            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

            await interaction.showModal(modal);
        } else {
            // Handle regular purchase
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
                { name: 'Package', value: `${item.price} BDT`, inline: true },
                { name: 'Tokens', value: `${item.tokens} Tokens`, inline: true },
                { name: 'Payment Method', value: paymentName, inline: true },
                { name: 'Minecraft Username', value: minecraftUsername, inline: false },
                { name: 'Transaction ID', value: transactionId, inline: true },
                { name: 'Phone Number', value: phoneNumber, inline: true }
            )
            .setDescription('We will verify your payment and deliver your tokens within 1-2 hours. Thank you for shopping with DrkSurvraze!')
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
                    { name: 'User', value: interaction.user.tag, inline: true },
                    { name: 'Package', value: `${item.price} BDT`, inline: true },
                    { name: 'Tokens', value: `${item.tokens} Tokens`, inline: true },
                    { name: 'Payment Method', value: paymentName, inline: true },
                    { name: 'Minecraft Username', value: minecraftUsername, inline: false },
                    { name: 'Transaction ID', value: transactionId, inline: true },
                    { name: 'Phone Number', value: phoneNumber, inline: true }
                )
                .setTimestamp();

            await adminChannel.send({ embeds: [adminEmbed] });
        }
    }

    // Handle Custom Token Modal Submission
    if (interaction.customId.startsWith('purchase_custom_modal_')) {
        const [_, __, ___, paymentMethod] = interaction.customId.split('_');
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

        const tokenAmount = parseInt(interaction.fields.getTextInputValue('token_amount'));
        const minecraftUsername = interaction.fields.getTextInputValue('minecraft_username');
        const transactionId = interaction.fields.getTextInputValue('transaction_id');
        const phoneNumber = interaction.fields.getTextInputValue('phone_number');

        // Calculate price based on token amount
        const calculatedPrice = Math.ceil(tokenAmount / TOKEN_RATE);

        // Send confirmation to user
        const userEmbed = new EmbedBuilder()
            .setTitle('✅ Custom Token Purchase Submitted - DrkSurvraze')
            .setColor(0x00FF00)
            .setThumbnail(shopImages.success)
            .addFields(
                { name: 'Item', value: 'Custom Token Package', inline: true },
                { name: 'Token Amount', value: `${tokenAmount} Tokens`, inline: true },
                { name: 'Calculated Price', value: `${calculatedPrice} BDT`, inline: true },
                { name: 'Payment Method', value: paymentName, inline: true },
                { name: 'Minecraft Username', value: minecraftUsername, inline: false },
                { name: 'Transaction ID', value: transactionId, inline: true },
                { name: 'Phone Number', value: phoneNumber, inline: true }
            )
            .setDescription('We will verify your payment and deliver your tokens within 1-2 hours. Thank you for shopping with DrkSurvraze!')
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
                .setTitle('🛒 New Custom Token Purchase - DrkSurvraze')
                .setColor(0xFFA500)
                .addFields(
                    { name: 'User', value: interaction.user.tag, inline: true },
                    { name: 'Item', value: 'Custom Token Package', inline: true },
                    { name: 'Token Amount', value: `${tokenAmount} Tokens`, inline: true },
                    { name: 'Calculated Price', value: `${calculatedPrice} BDT`, inline: true },
                    { name: 'Payment Method', value: paymentName, inline: true },
                    { name: 'Minecraft Username', value: minecraftUsername, inline: false },
                    { name: 'Transaction ID', value: transactionId, inline: true },
                    { name: 'Phone Number', value: phoneNumber, inline: true }
                )
                .setTimestamp();

            await adminChannel.send({ embeds: [adminEmbed] });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
