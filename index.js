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
    '600_token': {
        name: '600 Token',
        price: 50,
        tokens: 600,
        description: '600 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/your-image1/600-token.png'
    },
    '1200_token': {
        name: '1200 Token',
        price: 100,
        tokens: 1200,
        description: '1200 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/your-image2/1200-token.png'
    },
    '3000_token': {
        name: '3000 Token',
        price: 250,
        tokens: 3000,
        description: '3000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/your-image3/3000-token.png'
    },
    '6000_token': {
        name: '6000 Token',
        price: 500,
        tokens: 6000,
        description: '6000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/your-image4/6000-token.png'
    },
    '12000_token': {
        name: '12000 Token',
        price: 1000,
        tokens: 12000,
        description: '12000 Token package for your gameplay',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/your-image5/12000-token.png'
    },
    'vip_rank': {
        name: 'VIP RANK',
        price: 125,
        tokens: 0,
        description: 'Get VIP Rank in DrkSurvraze Minecraft Server (Ingame 400k)',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/your-image6/vip-rank.png'
    },
    'mvp_rank': {
        name: 'MVP RANK',
        price: 210,
        tokens: 0,
        description: 'Get MVP Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/your-image7/mvp-rank.png'
    },
    'elite_rank': {
        name: 'ELITE RANK',
        price: 300,
        tokens: 0,
        description: 'Get ELITE Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/your-image8/elite-rank.png'
    }
};

// ImgBB Images for different sections
const shopImages = {
    banner: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    logo: 'https://i.ibb.co/your-logo/logo.png',
    success: 'https://i.ibb.co/your-success/success-icon.png',
    paymentGuide: 'https://i.ibb.co/your-guide/payment-guide.png'
};

// Channel IDs - এখানে আপনার চ্যানেল IDs দিন
const ADMIN_SHOP_CHANNEL_ID = 'YOUR_ADMIN_SHOP_CHANNEL_ID'; // যেখানে !shop কমান্ড কাজ করবে
const ADMIN_ORDER_CHANNEL_ID = 'YOUR_ADMIN_ORDER_CHANNEL_ID'; // যেখানে অর্ডার নোটিফিকেশন যাবে

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
});

// Create Shop Command - শুধু অ্যাডমিন শপ চ্যানেলে কাজ করবে
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && message.author.bot === false) {
        // শুধু নির্দিষ্ট অ্যাডমিন শপ চ্যানেলে কাজ করবে
        if (message.channel.id !== ADMIN_SHOP_CHANNEL_ID) {
            return; // অন্য চ্যানেলে কমান্ড কাজ করবে না
        }

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
                { 
                    label: '600 Token', 
                    description: 'Price: 50 BDT', 
                    value: '600_token' 
                },
                { 
                    label: '1200 Token', 
                    description: 'Price: 100 BDT', 
                    value: '1200_token' 
                },
                { 
                    label: '3000 Token', 
                    description: 'Price: 250 BDT', 
                    value: '3000_token' 
                },
                { 
                    label: '6000 Token', 
                    description: 'Price: 500 BDT', 
                    value: '6000_token' 
                },
                { 
                    label: '12000 Token', 
                    description: 'Price: 1000 BDT', 
                    value: '12000_token' 
                },
                { 
                    label: 'VIP RANK', 
                    description: 'Price: 125 BDT', 
                    value: 'vip_rank' 
                },
                { 
                    label: 'MVP RANK', 
                    description: 'Price: 210 BDT', 
                    value: 'mvp_rank' 
                },
                { 
                    label: 'ELITE RANK', 
                    description: 'Price: 300 BDT', 
                    value: 'elite_rank' 
                }
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
            .setDescription(`**How to Purchase:**\n1. Send **${item.price} BDT** to ${paymentName} number: **${paymentNumber}**\n2. Click the 'Purchase' button below.\n3. Enter your Minecraft name and the ${paymentName} Transaction ID.`)
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
            .setTitle(`Purchase ${item.name}`);

        // Minecraft Username Input
        const minecraftInput = new TextInputBuilder()
            .setCustomId('minecraft_username')
            .setLabel('Your Minecraft Username')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your exact Minecraft username')
            .setRequired(true);

        // Payment Number Input
        const paymentNumberInput = new TextInputBuilder()
            .setCustomId('payment_number')
            .setLabel(`Your ${paymentName} Number`)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your payment number')
            .setRequired(true);

        // Transaction ID Input
        const transactionInput = new TextInputBuilder()
            .setCustomId('transaction_id')
            .setLabel(`${paymentName} Transaction ID`)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your transaction ID')
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(minecraftInput);
        const secondActionRow = new ActionRowBuilder().addComponents(paymentNumberInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(transactionInput);

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
        const paymentNumber = interaction.fields.getTextInputValue('payment_number');
        const transactionId = interaction.fields.getTextInputValue('transaction_id');

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
                    name: '👤 Customer Information', 
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

        // Send notification to admin order channel
        const adminOrderChannel = client.channels.cache.get(ADMIN_ORDER_CHANNEL_ID);
        if (adminOrderChannel) {
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

            await adminOrderChannel.send({ 
                content: '📢 **New Order Received!** <@&ADMIN_ROLE_ID>', // এখানে অ্যাডমিন রোলের ID দিন
                embeds: [adminEmbed] 
            });
        } else {
            console.log('❌ Admin order channel not found! Please check ADMIN_ORDER_CHANNEL_ID');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
