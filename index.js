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
    '9600_token': {
        name: '9600 Token',
        price: 800,
        tokens: 9600,
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
    'ROYAL_rank': {
        name: 'ROYAL RANK',
        price: 100,
        tokens: 0,
        description: 'Get ROYAL Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    'LEGEND_rank': {
        name: 'LEGEND RANK',
        price: 200,
        tokens: 0,
        description: 'Get LEGEND Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    'OVERLORD_rank': {
        name: 'OVERLORD RANK',
        price: 300,
        tokens: 0,
        description: 'Get OVERLORD Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
        'GODTIER_rank': {
        name: 'GODTIER RANK',
        price: 400,
        tokens: 0,
        description: 'Get GODTIER Rank in DrkSurvraze Minecraft Server',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    // Custom Rank Item
    'custom_rank': {
        name: 'CUSTOM RANK',
        price: 500,
        tokens: 0,
        description: 'Create your own custom rank with unique prefix and color',
        bKash: '01980583573',
        nagad: '01980583573',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'custom_rank',
        requiresCustomForm: true
    }
};

// Available colors for custom rank
const availableColors = [
    { name: 'Red', value: 'RED', hex: '#FF0000', emoji: '🔴' },
    { name: 'Blue', value: 'BLUE', hex: '#0000FF', emoji: '🔵' },
    { name: 'Green', value: 'GREEN', hex: '#00FF00', emoji: '🟢' },
    { name: 'Yellow', value: 'YELLOW', hex: '#FFFF00', emoji: '🟡' },
    { name: 'Purple', value: 'PURPLE', hex: '#800080', emoji: '🟣' },
    { name: 'Pink', value: 'PINK', hex: '#FFC0CB', emoji: '🌸' },
    { name: 'Orange', value: 'ORANGE', hex: '#FFA500', emoji: '🟠' },
    { name: 'Gold', value: 'GOLD', hex: '#FFD700', emoji: '⭐' },
    { name: 'Cyan', value: 'CYAN', hex: '#00FFFF', emoji: '💎' },
    { name: 'Rainbow', value: 'RAINBOW', hex: 'GRADIENT', emoji: '🌈' },
    { name: 'Custom Color', value: 'CUSTOM_COLOR', hex: '', emoji: '🎨' }
];

// ImgBB Images for different sections
const shopImages = {
    banner: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    logo: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    success: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    paymentGuide: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    customRank: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
};

// 🔧 PRIVATE CHANNEL ID - আপনি যে চ্যানেলে SMS পাঠাতে চান
const PRIVATE_ORDERS_CHANNEL_ID = '1443293560895049792'; // আপনার দেওয়া প্রাইভেট চ্যানেল ID

// Store ephemeral messages for auto-deletion
const userEphemeralMessages = new Map();
// Store custom rank data temporarily
const customRankData = new Map();
// Store order ID counter
const orderCounter = {
    lastId: 1000,
    prefix: 'DRK'
};

// Function to generate unique Order ID
function generateOrderId() {
    orderCounter.lastId++;
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${orderCounter.prefix}-${orderCounter.lastId}-${timestamp}${random}`;
}

// Function to get current date in readable format
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    return `${date} ${time}`;
}

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
    console.log(`🤖 Bot ID: ${client.user.id}`);
    console.log(`🔒 All orders will be sent to private channel: ${PRIVATE_ORDERS_CHANNEL_ID}`);
    console.log(`🎨 Custom Rank feature enabled with custom color option`);
    console.log(`🆔 Order ID System: ${orderCounter.prefix}-XXXX format`);
    
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
            .addFields(
                {
                    name: '🎨 New! CUSTOM RANK',
                    value: 'Create your own unique rank with custom prefix and color!',
                    inline: false
                }
            )
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
                { label: '9600 Token', description: 'Price: 800 BDT', value: '9600_token' },
                { label: '12000 Token', description: 'Price: 1000 BDT', value: '12000_token' },
                { label: 'ROYAL RANK', description: 'Price: 100 BDT', value: 'ROYAL_rank' },
                { label: 'LEGEND RANK', description: 'Price: 200 BDT', value: 'LEGEND_rank' },
                { label: 'OVERLORD RANK', description: 'Price: 300 BDT', value: 'OVERLORD_rank' },
                { label: 'GODTIER RANK', description: 'Price: 400 BDT', value: 'GODTIER_rank' },
                { label: '🎨 CUSTOM RANK', description: 'Price: 500 BDT - Create your own!', value: 'custom_rank' }
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

        // CUSTOM RANK এর জন্য বিশেষ প্রসেস
        if (item.requiresCustomForm) {
            console.log(`🎨 Custom Rank selected, showing custom form for ${interaction.user.tag}`);
            
            // Custom Rank Setup Modal - একই ফর্মে Prefix এবং Color
            const customRankModal = new ModalBuilder()
                .setCustomId(`custom_rank_setup_${paymentMethod}`)
                .setTitle('🎨 Custom Rank Setup');

            // Custom Prefix Input
            const prefixInput = new TextInputBuilder()
                .setCustomId('custom_prefix')
                .setLabel('Your Custom Rank Prefix')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Example: [KING], [BOSS], [LEGEND] etc.')
                .setRequired(true)
                .setMaxLength(20);

            // Color Selection Input - Dropdown এর পরিবর্তে Short Input
            const colorInput = new TextInputBuilder()
                .setCustomId('rank_color')
                .setLabel('Rank Color (Type color name or HEX code)')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Red, Blue, #FF5733, or click "Show Colors" button')
                .setRequired(true)
                .setMaxLength(30);

            const firstActionRow = new ActionRowBuilder().addComponents(prefixInput);
            const secondActionRow = new ActionRowBuilder().addComponents(colorInput);

            customRankModal.addComponents(firstActionRow, secondActionRow);

            // Color Selection Button সহ Embed
            const colorHelpEmbed = new EmbedBuilder()
                .setTitle('🎨 Custom Rank Setup')
                .setColor(0x9B59B6)
                .setDescription(`**How to choose color:**\n\n**Option 1:** Type a color name (Red, Blue, Green, etc.)\n**Option 2:** Type a HEX code (Example: #FF5733)\n**Option 3:** Click "Show Colors" button to see available colors`)
                .addFields(
                    { 
                        name: 'Available Color Names', 
                        value: 'Red, Blue, Green, Yellow, Purple, Pink, Orange, Gold, Cyan, Rainbow', 
                        inline: false 
                    },
                    { 
                        name: 'HEX Code Format', 
                        value: 'Use # followed by 6 characters (Example: #FF0000 for red)', 
                        inline: false 
                    }
                )
                .setFooter({ text: 'Click the button below to see color examples' });

            // Color Show Button
            const colorButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`show_colors_${paymentMethod}`)
                    .setLabel('Show Available Colors')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🎨')
            );

            // First show the help embed with button
            await interaction.reply({
                embeds: [colorHelpEmbed],
                components: [colorButton],
                ephemeral: true
            });

            return;
        }

        // Normal items এর জন্য সাধারণ প্রসেস
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

// Handle Show Colors Button
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('show_colors_')) {
        console.log(`🎨 Show colors button clicked by ${interaction.user.tag}`);
        
        const paymentMethod = interaction.customId.split('_')[2];
        
        const colorsEmbed = new EmbedBuilder()
            .setTitle('🎨 Available Colors for Custom Rank')
            .setColor(0x9B59B6)
            .setThumbnail(shopImages.customRank)
            .setDescription('**Choose from these available colors:**\n\n' +
                availableColors.filter(c => c.value !== 'CUSTOM_COLOR').map(color => 
                    `${color.emoji} **${color.name}** - Use "${color.name}" in color field`
                ).join('\n') +
                '\n\n**For custom color:** Type any HEX code like #FF5733\n' +
                '**Examples:** #FF0000 (Red), #00FF00 (Green), #0000FF (Blue)')
            .addFields(
                { 
                    name: '📝 How to Enter Color', 
                    value: 'In the color field, you can type:\n1. Color name (Example: "Red")\n2. HEX code (Example: "#FF5733")\n3. Any valid HEX color code', 
                    inline: false 
                },
                { 
                    name: '💡 Tip', 
                    value: 'You can find HEX codes from online color pickers like:\n• Google Color Picker\n• HTML Color Codes website\n• ColorHexa.com', 
                    inline: false 
                }
            )
            .setFooter({ text: 'Click "Open Form" to continue with your custom rank' });

        // Open Form Button
        const formButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`open_form_${paymentMethod}`)
                .setLabel('Open Custom Rank Form')
                .setStyle(ButtonStyle.Success)
                .setEmoji('📝')
        );

        await interaction.update({
            embeds: [colorsEmbed],
            components: [formButton]
        });
    }

    // Handle Open Form Button
    if (interaction.customId.startsWith('open_form_')) {
        console.log(`📝 Open form button clicked by ${interaction.user.tag}`);
        
        const paymentMethod = interaction.customId.split('_')[2];
        
        // Custom Rank Setup Modal
        const customRankModal = new ModalBuilder()
            .setCustomId(`custom_rank_setup_${paymentMethod}`)
            .setTitle('🎨 Custom Rank Setup');

        // Custom Prefix Input
        const prefixInput = new TextInputBuilder()
            .setCustomId('custom_prefix')
            .setLabel('Your Custom Rank Prefix')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Example: [KING], [BOSS], [LEGEND] etc.')
            .setRequired(true)
            .setMaxLength(20);

        // Color Selection Input
        const colorInput = new TextInputBuilder()
            .setCustomId('rank_color')
            .setLabel('Rank Color (Type color name or HEX code)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Red, Blue, #FF5733, etc.')
            .setRequired(true)
            .setMaxLength(30);

        const firstActionRow = new ActionRowBuilder().addComponents(prefixInput);
        const secondActionRow = new ActionRowBuilder().addComponents(colorInput);

        customRankModal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(customRankModal);
    }
});

// Handle Custom Rank Setup Modal Submission
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId.startsWith('custom_rank_setup_')) {
        console.log(`🎨 Custom Rank setup modal submitted by ${interaction.user.tag}`);
        
        const paymentMethod = interaction.customId.split('_')[3]; // bkash or nagad
        const customPrefix = interaction.fields.getTextInputValue('custom_prefix');
        const colorInput = interaction.fields.getTextInputValue('rank_color').trim();
        
        // Validate and process color
        let colorName = '';
        let colorHex = '';
        let colorEmoji = '🎨';
        
        // Check if it's a HEX code
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (hexRegex.test(colorInput)) {
            colorName = `Custom (${colorInput.toUpperCase()})`;
            colorHex = colorInput.toUpperCase();
        } else {
            // Check if it's a predefined color name
            const colorUpper = colorInput.toUpperCase();
            const foundColor = availableColors.find(c => c.value === colorUpper || c.name.toUpperCase() === colorUpper);
            
            if (foundColor) {
                colorName = foundColor.name;
                colorHex = foundColor.hex;
                colorEmoji = foundColor.emoji;
            } else {
                // If not found, use as custom color name
                colorName = colorInput;
                colorHex = '#FFFFFF'; // Default white
            }
        }

        // Store custom rank data temporarily
        const tempData = {
            prefix: customPrefix,
            colorName: colorName,
            colorHex: colorHex,
            colorEmoji: colorEmoji,
            colorInput: colorInput,
            paymentMethod: paymentMethod,
            timestamp: Date.now(),
            userId: interaction.user.id
        };
        
        customRankData.set(interaction.user.id, tempData);

        // Show payment instructions directly
        const item = shopItems['custom_rank'];
        const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';
        const paymentNumber = paymentMethod === 'bkash' ? item.bKash : item.nagad;
        const paymentEmoji = paymentMethod === 'bkash' ? '💳' : '📱';

        const embed = new EmbedBuilder()
            .setTitle(`🎨 ${item.name} - Payment Instructions`)
            .setColor(0x9B59B6)
            .setThumbnail(shopImages.customRank)
            .addFields(
                { 
                    name: '📦 Custom Rank Details', 
                    value: `**Price:** ${item.price} BDT\n**Type:** Custom Rank Creation`,
                    inline: false 
                },
                { 
                    name: '🎨 Your Custom Rank', 
                    value: `**Prefix:** ${customPrefix}\n**Color:** ${colorName} ${colorEmoji}`,
                    inline: false 
                },
                { 
                    name: `📱 ${paymentName} Number`, 
                    value: `**${paymentNumber}**`, 
                    inline: false 
                }
            )
            .setDescription(`**How to Purchase:**\n1. Send **${item.price} BDT** to ${paymentName} number: **${paymentNumber}**\n2. Click the 'Complete Purchase' button below.\n3. Enter your Minecraft username and payment details.`)
            .setImage(shopImages.paymentGuide)
            .setFooter({ text: 'Make sure to use the Send Money option' });

        // Complete Purchase Button
        const purchaseButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`purchase_custom_rank_${paymentMethod}`)
                .setLabel('Complete Purchase')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🛒')
        );

        await interaction.reply({
            embeds: [embed],
            components: [purchaseButton],
            ephemeral: true
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
        
        // Check if it's custom rank purchase
        if (interaction.customId === 'purchase_custom_rank_bkash' || interaction.customId === 'purchase_custom_rank_nagad') {
            console.log(`🎨 Custom Rank purchase button clicked by ${interaction.user.tag}`);
            
            const paymentMethod = interaction.customId.split('_')[2]; // bkash or nagad
            const userId = interaction.user.id;
            
            // Get stored custom rank data
            const tempData = customRankData.get(userId);
            if (!tempData) {
                await interaction.reply({
                    content: '❌ Custom rank data not found. Please start over with !shop',
                    ephemeral: true
                });
                return;
            }

            const item = shopItems['custom_rank'];
            const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

            // Create Custom Rank Purchase Form Modal
            const modal = new ModalBuilder()
                .setCustomId(`purchase_modal_custom_rank_${paymentMethod}`)
                .setTitle(`🎨 Purchase Custom Rank`);

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
                console.log(`📤 Showing custom rank modal for user: ${interaction.user.tag}`);
                await interaction.showModal(modal);
                console.log(`✅ Custom rank modal shown successfully for: ${interaction.user.tag}`);
            } catch (error) {
                console.error('❌ Error showing custom rank modal:', error);
                await interaction.reply({
                    content: '❌ Error opening form. Please try clicking the Purchase button again.',
                    ephemeral: true
                });
            }
            return;
        }

        // Normal items এর জন্য
        const customIdParts = interaction.customId.split('_');
        
        // The custom ID format is: purchase_600_token_bkash
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
        // Generate unique Order ID for every order
        const orderId = generateOrderId();
        const orderDateTime = getCurrentDateTime();
        
        // Check if it's custom rank
        if (interaction.customId.startsWith('purchase_modal_custom_rank_')) {
            console.log(`🎨 Custom Rank modal submitted: ${interaction.customId}`);
            
            const paymentMethod = interaction.customId.split('_')[3]; // bkash or nagad
            const userId = interaction.user.id;
            
            // Get stored custom rank data
            const tempData = customRankData.get(userId);
            if (!tempData) {
                await interaction.reply({
                    content: '❌ Custom rank data not found. Please contact admin.',
                    ephemeral: true
                });
                return;
            }

            const item = shopItems['custom_rank'];
            const paymentName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';

            const minecraftUsername = interaction.fields.getTextInputValue('minecraft_username');
            const paymentNumber = interaction.fields.getTextInputValue('payment_number');
            const transactionId = interaction.fields.getTextInputValue('transaction_id');

            console.log(`✅ Custom Rank order received: ${tempData.prefix} by ${minecraftUsername}`);
            console.log(`🆔 Order ID: ${orderId}`);

            // 🔥 AUTO-DELETE PREVIOUS EPHEMERAL MESSAGES
            await deleteUserEphemeralMessages(interaction.user.id, interaction.channelId);

            // Send final confirmation to user
            const userEmbed = new EmbedBuilder()
                .setTitle('✅ Custom Rank Purchase Submitted!')
                .setColor(0x9B59B6)
                .setThumbnail(shopImages.success)
                .addFields(
                    { 
                        name: '📋 Order ID', 
                        value: `**\`${orderId}\`**`,
                        inline: false 
                    },
                    { 
                        name: '🎨 Custom Rank Details', 
                        value: `**Price:** ${item.price} BDT\n**Type:** Custom Rank Creation`,
                        inline: false 
                    },
                    { 
                        name: '✨ Your Custom Rank', 
                        value: `**Prefix:** ${tempData.prefix}\n**Color:** ${tempData.colorName} ${tempData.colorEmoji}`,
                        inline: false 
                    },
                    { 
                        name: '👤 Your Information', 
                        value: `**Minecraft Username:** ${minecraftUsername}\n**Payment Method:** ${paymentName}\n**Your ${paymentName} Number:** ${paymentNumber}\n**Transaction ID:** ${transactionId}`,
                        inline: false 
                    },
                    { 
                        name: '🕒 Order Time', 
                        value: orderDateTime,
                        inline: false 
                    }
                )
                .setDescription('**✅ Your custom rank has been ordered!**\n\nWe will verify your payment and create your custom rank within 1-2 hours.\n\n**Check your DM for confirmation with Order ID!**')
                .setFooter({ 
                    text: 'DrkSurvraze Minecraft Community • Order ID will be used for tracking', 
                    iconURL: shopImages.logo 
                });

            await interaction.reply({
                embeds: [userEmbed],
                ephemeral: true
            });

            // Store this ephemeral message for auto-deletion
            storeEphemeralMessage(interaction);

            // ✅ 1. Send DM to user
            try {
                const userDMEmbed = new EmbedBuilder()
                    .setTitle('🎨 Custom Rank Order Confirmed - DrkSurvraze')
                    .setColor(0x9B59B6)
                    .setThumbnail(shopImages.customRank)
                    .addFields(
                        { 
                            name: '📋 Order ID', 
                            value: `**\`${orderId}\`**`,
                            inline: false 
                        },
                        { 
                            name: '🎨 Your Custom Rank', 
                            value: `**Prefix:** ${tempData.prefix}\n**Color:** ${tempData.colorName} ${tempData.colorEmoji}`,
                            inline: false 
                        },
                        { 
                            name: '💰 Payment Details', 
                            value: `**Price:** ${item.price} BDT\n**Payment Method:** ${paymentName}`,
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
                        },
                        { 
                            name: '🕒 Order Time', 
                            value: orderDateTime,
                            inline: false 
                        }
                    )
                    .setDescription(`**✅ Your custom rank order has been received!**\n\n**Order ID:** \`${orderId}\`\n\nWe are verifying your payment and will create your custom rank within 1-2 hours.\n\n**Custom Rank Features:**\n• Unique prefix: ${tempData.prefix}\n• ${tempData.colorName} colored name\n• Special rank permissions\n\n**Please keep this Order ID for reference:** \`${orderId}\`\n**Please make sure you are online in our Minecraft server for rank setup.**\n\n**Thank you for choosing DrkSurvraze!**`)
                    .setFooter({ 
                        text: 'DrkSurvraze Minecraft Community • Order ID: ' + orderId, 
                        iconURL: shopImages.logo 
                    })
                    .setTimestamp();

                const user = await client.users.fetch(interaction.user.id);
                await user.send({ embeds: [userDMEmbed] });
                console.log(`📩 Custom Rank DM sent to user: ${interaction.user.tag} with Order ID: ${orderId}`);
            } catch (dmError) {
                console.log(`❌ Could not send DM to ${interaction.user.tag}:`, dmError.message);
            }

            // ✅ 2. Send to PRIVATE CHANNEL (SMS/Notification)
            const privateOrdersChannel = client.channels.cache.get(PRIVATE_ORDERS_CHANNEL_ID);
            if (privateOrdersChannel) {
                try {
                    const privateEmbed = new EmbedBuilder()
                        .setTitle(`🎨 CUSTOM RANK ORDER - DrkSurvraze Shop`)
                        .setColor(0x9B59B6)
                        .setThumbnail(shopImages.customRank)
                        .addFields(
                            { 
                                name: '**📋 ORDER INFORMATION**', 
                                value: `**Order ID:** \`${orderId}\`\n**Order Time:** ${orderDateTime}`, 
                                inline: false 
                            },
                            { 
                                name: '**👤 CUSTOMER INFORMATION**', 
                                value: `**Discord User:** ${interaction.user.tag}\n**Discord ID:** ${interaction.user.id}\n**Minecraft Username:** ${minecraftUsername}`, 
                                inline: false 
                            },
                            { 
                                name: '**🎨 CUSTOM RANK DETAILS**', 
                                value: `**Custom Prefix:** ${tempData.prefix}\n**Color:** ${tempData.colorName} (${tempData.colorHex})\n**Price:** ${item.price} BDT\n**Type:** CUSTOM RANK`, 
                                inline: false 
                            },
                            { 
                                name: '**💳 PAYMENT INFORMATION**', 
                                value: `**Payment Method:** ${paymentName}\n**Customer ${paymentName} Number:** ${paymentNumber}\n**Transaction ID:** ${transactionId}`, 
                                inline: false 
                            }
                        )
                        .setFooter({ text: `DrkSurvraze Shop - Order ID: ${orderId}` })
                        .setTimestamp();

                    await privateOrdersChannel.send({ 
                        content: `@everyone\n📢 **🚨 🎨 NEW CUSTOM RANK ORDER RECEIVED! 🚨**\n**Order ID:** \`${orderId}\``,
                        embeds: [privateEmbed] 
                    });
                    console.log(`✅ Custom Rank order sent to private channel: ${PRIVATE_ORDERS_CHANNEL_ID} with Order ID: ${orderId}`);
                } catch (privateError) {
                    console.log(`❌ Could not send custom rank to private channel:`, privateError.message);
                }
            }

            // Clear temporary data
            customRankData.delete(userId);
            return;
        }

        // Normal items এর জন্য
        const customIdParts = interaction.customId.split('_');
        const itemKey = `${customIdParts[2]}_${customIdParts[3]}`;
        const paymentMethod = customIdParts[4];
        
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
        console.log(`🆔 Order ID: ${orderId}`);

        // 🔥 AUTO-DELETE PREVIOUS EPHEMERAL MESSAGES
        await deleteUserEphemeralMessages(interaction.user.id, interaction.channelId);

        // Send final confirmation to user
        const userEmbed = new EmbedBuilder()
            .setTitle('✅ Purchase Submitted Successfully!')
            .setColor(0x00FF00)
            .setThumbnail(shopImages.success)
            .addFields(
                { 
                    name: '📋 Order ID', 
                    value: `**\`${orderId}\`**`,
                    inline: false 
                },
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
                },
                { 
                    name: '🕒 Order Time', 
                    value: orderDateTime,
                    inline: false 
                }
            )
            .setDescription('**✅ Your order has been processed!**\n\nWe will verify your payment and deliver your item within 1-2 hours.\n\n**Check your DM for confirmation with Order ID!**')
            .setFooter({ 
                text: 'DrkSurvraze Minecraft Community • Order ID will be used for tracking', 
                iconURL: shopImages.logo 
            });

        await interaction.reply({
            embeds: [userEmbed],
            ephemeral: true
        });

        // Store this ephemeral message for auto-deletion
        storeEphemeralMessage(interaction);

        // ✅ 1. Send DM to user
        try {
            let dmDescription = '';
            let dmTitle = '';
            
            if (item.type === 'token') {
                dmTitle = '🎮 Token Purchase Confirmed - DrkSurvraze';
                dmDescription = `**✅ Your ${item.tokens} Tokens purchase has been received!**\n\n**Order ID:** \`${orderId}\`\n\nWe are verifying your payment and will add the tokens to your account within 1-2 hours.\n\n**Please keep this Order ID for reference:** \`${orderId}\`\n**Please make sure you are online in our Minecraft server for token delivery.**\n\n**Thank you for shopping with DrkSurvraze!**`;
            } else if (item.type === 'rank') {
                dmTitle = '👑 Rank Purchase Confirmed - DrkSurvraze';
                dmDescription = `**✅ Your ${item.name} purchase has been received!**\n\n**Order ID:** \`${orderId}\`\n\nWe are verifying your payment and will upgrade your rank within 1-2 hours.\n\n**Please keep this Order ID for reference:** \`${orderId}\`\n**Please make sure you are online in our Minecraft server for rank upgrade.**\n\n**Thank you for choosing DrkSurvraze!**`;
            } else {
                dmTitle = '🛒 Order Confirmed - DrkSurvraze Shop';
                dmDescription = `**✅ Your order has been received!**\n\n**Order ID:** \`${orderId}\`\n\nWe are verifying your payment and will deliver your item within 1-2 hours.\n\n**Please keep this Order ID for reference:** \`${orderId}\`\n**Thank you for shopping with DrkSurvraze!**`;
            }

            const userDMEmbed = new EmbedBuilder()
                .setTitle(dmTitle)
                .setColor(0x00FF00)
                .setThumbnail(shopImages.success)
                .addFields(
                    { 
                        name: '📋 Order ID', 
                        value: `**\`${orderId}\`**`,
                        inline: false 
                    },
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
                    },
                    { 
                        name: '🕒 Order Time', 
                        value: orderDateTime,
                        inline: false 
                    }
                )
                .setDescription(dmDescription)
                .setFooter({ 
                    text: 'DrkSurvraze Minecraft Community • Order ID: ' + orderId, 
                    iconURL: shopImages.logo 
                })
                .setTimestamp();

            const user = await client.users.fetch(interaction.user.id);
            await user.send({ embeds: [userDMEmbed] });
            console.log(`📩 DM sent to user: ${interaction.user.tag} (Item Type: ${item.type}) with Order ID: ${orderId}`);
        } catch (dmError) {
            console.log(`❌ Could not send DM to ${interaction.user.tag}:`, dmError.message);
        }

        // ✅ 2. Send to PRIVATE CHANNEL (SMS/Notification)
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
                            name: '**📋 ORDER INFORMATION**', 
                            value: `**Order ID:** \`${orderId}\`\n**Order Time:** ${orderDateTime}`, 
                            inline: false 
                        },
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
                        }
                    )
                    .setFooter({ text: `DrkSurvraze Shop - Order ID: ${orderId}` })
                    .setTimestamp();

                await privateOrdersChannel.send({ 
                    content: `@everyone\n📢 **🚨 NEW ${orderType} RECEIVED! 🚨**\n**Order ID:** \`${orderId}\``,
                    embeds: [privateEmbed] 
                });
                console.log(`✅ Order sent to private channel: ${PRIVATE_ORDERS_CHANNEL_ID} (Type: ${item.type}) with Order ID: ${orderId}`);
            } catch (privateError) {
                console.log(`❌ Could not send to private channel:`, privateError.message);
            }
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
    
    if (channelMessages.length >= 5) {
        channelMessages.shift();
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
}, 10 * 60 * 1000);

// Auto-cleanup old custom rank data (every 30 minutes)
setInterval(() => {
    const now = Date.now();
    const THIRTY_MINUTES = 30 * 60 * 1000;
    
    for (const [userId, data] of customRankData.entries()) {
        if (now - data.timestamp > THIRTY_MINUTES) {
            customRankData.delete(userId);
            console.log(`🧹 Cleared old custom rank data for user: ${userId}`);
        }
    }
}, 30 * 60 * 1000);

// Error handling
client.on('error', (error) => {
    console.error('❌ Client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Bot login
client.login(process.env.DISCORD_TOKEN);
