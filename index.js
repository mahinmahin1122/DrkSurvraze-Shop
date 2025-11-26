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

// DrkSurvraze Shop Items with ImgBB URLs
const shopItems = {
    '500_token': {
        name: '500 Token',
        price: 50,
        description: 'Small bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image1/500-token.png' // ImgBB URL
    },
    '1000_token': {
        name: '1000 Token',
        price: 100,
        description: 'Medium bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image2/1000-token.png' // ImgBB URL
    },
    '2500_token': {
        name: '2500 Token',
        price: 250,
        description: 'Large bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image3/2500-token.png' // ImgBB URL
    },
    '5000_token': {
        name: '5000 Token',
        price: 500,
        description: 'Extra large bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image4/5000-token.png' // ImgBB URL
    },
    '10000_token': {
        name: '10000 Token',
        price: 1000,
        description: 'Giant bag of Token.',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image5/10000-token.png' // ImgBB URL
    },
    'vip_rank': {
        name: 'VIP RANK',
        price: 150,
        description: 'Get VIP Rank in DrkSurvraze Minecraft Server',
        bKash: '01777194638',
        nagad: '01777194638',
        image: 'https://i.ibb.co/your-image6/vip-rank.png' // ImgBB URL
    }
};

// ImgBB Images for different sections
const shopImages = {
    banner: 'https://i.ibb.co/qM3TxZPK/SHOP.png',
    
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
            .setDescription('**Purchasing Process:**\n1. Select an item from dropdown\n2. Send money to our bKash/Nagad\n3. Click Purchase & fill details\n4. Wait for confirmation DM')
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
            .setThumbnail(item.image) // আইটেমের ছবি (ImgBB)
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
            .setThumbnail(item.image) // আইটেমের ছবি (ImgBB)
            .addFields(
                { name: '📦 Item', value: item.name, inline: true },
                { name: '💰 Price', value: `${item.price} BDT`, inline: true },
                { name: `📱 ${paymentName} Number`, value: `\`${paymentNumber}\``, inline: false },
                { name: '📝 Description', value: item.description, inline: false }
            )
            .setDescription(`**How to Purchase:**\n1. Send ${item.price} BDT to ${paymentName} number: ${paymentNumber}\n2. Click the 'Purchase' button below.\n3. Enter your Minecraft name and the ${paymentName} Transaction ID.`)
            .setImage(shopImages.paymentGuide) // পেমেন্ট গাইড ইমেজ (ImgBB)
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
                { name: 'Item', value: item.name, inline: true },
                { name: 'Price', value: `${item.price} BDT`, inline: true },
                { name: 'Payment Method', value: paymentName, inline: true },
                { name: 'Minecraft Username', value: minecraftUsername, inline: false },
                { name: 'Transaction ID', value: transactionId, inline: true },
                { name: 'Phone Number', value: phoneNumber, inline: true }
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
                    { name: 'User', value: interaction.user.tag, inline: true },
                    { name: 'Item', value: item.name, inline: true },
                    { name: 'Price', value: `${item.price} BDT`, inline: true },
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
